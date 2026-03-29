"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { redirect } from "next/navigation";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });



export const generateAIInsights = async (industry) => {
  const prompt = `
    Analyze the current state of the ${industry} industry and provide insights 
    in ONLY the following JSON format without any additional notes or explanations:

    {
      "salaryRanges": [
        { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
      ],
      "growthRate": number,
      "demandLevel": "HIGH" | "MEDIUM" | "LOW",
      "topSkills": ["skill1", "skill2"],
      "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
      "keyTrends": ["trend1", "trend2"],
      "recommendedSkills": ["skill1", "skill2"]
    }

    Return ONLY JSON (no markdown, no extra text). 
    Include 5 roles, 5 skills, and 5 trends.
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    return JSON.parse(cleanedText);
  } catch (err) {
    console.error("❌ AI Generation Failed:", err.message);
    throw new Error("Failed to generate industry insights");
  }
};

export async function getIndustryInsights() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      industryInsights: true, // ✅ match the schema field name exactly
    },
  });

  if (!user) {
    // User doesn't exist in database, redirect to onboarding
    console.log(`User ${userId} not found in database, redirecting to onboarding`);
    return redirect("/onboarding");
  }

  // ✅ If no insights exist, generate them dynamically
  if (!user.industryInsights) {
    // Check if user has an industry, if not use a default
    let userIndustry = user.industry;
    
    if (!userIndustry) {
      console.warn(`User ${userId} has no industry set, using default "Technology"`);
      userIndustry = "Technology";
    }
    
    console.log(`Generating insights for user ${userId}, industry: ${userIndustry}`);
    
    // Check if insights already exist for this industry
    const existingInsights = await db.industryInsights.findUnique({
      where: { industry: userIndustry }
    });

    let industryInsight;
    
    if (existingInsights) {
      // Use existing insights
      industryInsight = existingInsights;
      console.log(`Using existing industry insights for ${userIndustry}`);
    } else {
      // Generate new insights
      const insights = await generateAIInsights(userIndustry);
      
      industryInsight = await db.industryInsights.create({
        data: {
          industry: userIndustry,
          ...insights,
          nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        },
      });

      console.log(`Created new industry insights for ${userIndustry}`);
    }

    // Now update user with industry (only if it was null)
    if (!user.industry) {
      await db.user.update({
        where: { clerkUserId: userId },
        data: { industry: userIndustry }
      });
      console.log(`Updated user ${userId} with industry: ${userIndustry}`);
    }
    
    return industryInsight;
  }

  return user.industryInsights;
}
