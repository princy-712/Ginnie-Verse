"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma"; // ✅ Make sure you import this!
import { generateAIInsights } from "./dashboard";

export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    // ✅ Wrap the full logic inside the transaction
    const result = await db.$transaction(async (tx) => {
      // 1️⃣ Check if industry exists
      let industryInsights = await tx.industryInsights.findUnique({
        where: {
          industry: data.industry,
        },
      });

      // 2️⃣ If industry doesn't exist, create it with default values
      if (!industryInsights) {
           const insights = await generateAIInsights(data.industry);
        
          industryInsights = await db.industryInsights.create({
              data: {
                industry: data.industry,
                ...insights,
                nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              },
            });
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

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: {
        industry: true,
      },
    });

    return {
      isOnboarded: !!user?.industry,
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status");
  }
}

