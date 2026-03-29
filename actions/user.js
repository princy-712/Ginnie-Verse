"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma"; // ✅ Make sure you import this!
import { generateAIInsights } from "./dashboard";

export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Get user data from Clerk to get email and name
  const { firstName, lastName, primaryEmailAddress } = await auth();
  
  let user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    // User doesn't exist, create them first
    console.log(`Creating new user ${userId} from Clerk`);
    user = await db.user.create({
      data: {
        clerkUserId: userId,
        email: primaryEmailAddress?.emailAddress || `${userId}@placeholder.com`,
        name: `${firstName || ''} ${lastName || ''}`.trim() || 'User',
      },
    });
    console.log(`Created user with ID: ${user.id}`);
  }

  try {
    // ✅ Wrap the full logic inside the transaction
    const result = await db.$transaction(async (tx) => {
      // 1️⃣ Check if industry insights exist
      let industryInsights = await tx.industryInsights.findUnique({
        where: {
          industry: data.industry,
        },
      });

      // 2️⃣ If industry insights don't exist, create them
      if (!industryInsights) {
           const insights = await generateAIInsights(data.industry);
        
          industryInsights = await tx.industryInsights.create({
              data: {
                industry: data.industry,
                ...insights,
                nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              },
            });
      } else {
        console.log(`Using existing industry insights for ${data.industry}`);
      }

      // 3️⃣ Update the user
      const updatedUser = await tx.user.update({
        where: {
          id: user.id,
        },
        data: {
          industry: data.industry,
          experience: data.experience,
          bio: data.bio,
          skills: data.skills,
        },
      });

      // ✅ Return both updatedUser and industryInsights
      return { updatedUser, industryInsights };
    }, {
      timeout: 10000, // optional custom timeout
    });

    // ✅ Return the result properly
    return {success: true, ...result};
  } catch (error) {
    console.error("Error updating user and industry:", error.message);
   throw new Error(`Failed to update profile: ${error.message}`);

  }
}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: {
        industry: true,
      },
    });

    if (!user) {
      // User doesn't exist in database, need to create them
      // This can happen after database cleanup
      console.log(`User ${userId} not found in database, treating as not onboarded`);
      return {
        isOnboarded: false,
      };
    }

    return {
      isOnboarded: !!user.industry,
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status");
  }
}

