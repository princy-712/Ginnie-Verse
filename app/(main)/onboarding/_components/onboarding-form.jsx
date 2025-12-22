"use client";

import { updateUser } from "@/actions/user";
import { onboardingSchema } from "@/app/lib/schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/use-fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const OnboardingForm = ({ industries }) => {
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const router = useRouter();

const {
    loading: updateLoading,
    fn: updateUserFn,
    data: updateResult,
  } = useFetch(updateUser)


  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  const onSubmit = async (values) => {
    try {
      const formattedIndustry = `${values.industry}-${values.subIndustry
        .toLowerCase()
        .replace(/ /g, "-")}`;

      await updateUserFn({
        ...values,
        industry: formattedIndustry,
      });
    } catch (error) {
      console.error("Onboarding error:", error);
    }
  };

   useEffect(() => {
    if (updateResult?.success && !updateLoading) {
      toast.success("Profile completed successfully!");
      router.push("/dashboard");
      router.refresh();
    }
  }, [updateResult, updateLoading]);

  const watchIndustry = watch("industry");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a001a] via-[#12002e] to-[#1a1038] px-4 py-12">
      {/* soft gradient glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(124,58,237,0.18),transparent_60%)] blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(56,189,248,0.15),transparent_60%)] blur-3xl pointer-events-none" />

      <Card className="w-full max-w-2xl relative z-10 border border-white/10 bg-[#0f011e]/70 backdrop-blur-xl shadow-[0_0_25px_rgba(147,51,234,0.2)] rounded-2xl p-4">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-fuchsia-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
            Complete Your Profile
          </CardTitle>
          <CardDescription className="text-gray-400 mt-1">
            Let Genie-Verse personalize your AI-driven career insights.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 text-gray-200"
          >
            {/* Industry */}
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select
                onValueChange={(value) => {
                  setValue("industry", value);
                  setSelectedIndustry(
                    industries.find((ind) => ind.id === value)
                  );
                  setValue("subIndustry", "");
                }}
              >
                <SelectTrigger
                  id="industry"
                  className="bg-[#1c0b33]/80 border border-violet-600/30 text-white hover:border-violet-400 transition focus:ring-2 focus:ring-violet-500"
                >
                  <SelectValue placeholder="Select an Industry" />
                </SelectTrigger>
                <SelectContent className="bg-[#140124]/90 text-white border border-violet-700">
                  {industries.map((ind) => (
                    <SelectItem key={ind.id} value={ind.id}>
                      {ind.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.industry && (
                <p className="text-sm text-pink-400">
                  {errors.industry.message}
                </p>
              )}
            </div>

            {/* Sub Industry */}
            {watchIndustry && (
              <div className="space-y-2">
                <Label htmlFor="subIndustry">Specialization</Label>
                <Select
                  onValueChange={(value) => setValue("subIndustry", value)}
                >
                  <SelectTrigger
                    id="subIndustry"
                    className="bg-[#1c0b33]/80 border border-violet-600/30 text-white hover:border-violet-400 transition focus:ring-2 focus:ring-violet-500"
                  >
                    <SelectValue placeholder="Select your specialization" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#140124]/90 text-white border border-violet-700">
                    <SelectGroup>
                      <SelectLabel>Specializations</SelectLabel>
                      {selectedIndustry?.subIndustries.map((ind) => (
                        <SelectItem key={ind} value={ind}>
                          {ind}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.subIndustry && (
                  <p className="text-sm text-pink-400">
                    {errors.subIndustry.message}
                  </p>
                )}
              </div>
            )}

            {/* Experience */}
            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                min="0"
                max="50"
                placeholder="Enter years of experience"
                className="bg-[#1c0b33]/80 border border-violet-600/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-500"
                {...register("experience")}
              />
              {errors.experience && (
                <p className="text-sm text-pink-400">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                placeholder="e.g., React, Python, Data Analysis"
                className="bg-[#1c0b33]/80 border border-violet-600/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-500"
                {...register("skills")}
              />
              <p className="text-sm text-gray-400">
                Separate multiple skills with commas
              </p>
              {errors.skills && (
                <p className="text-sm text-pink-400">{errors.skills.message}</p>
              )}
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about your professional background..."
                className="h-32 bg-[#1c0b33]/80 border border-violet-600/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-500"
                {...register("bio")}
              />
              {errors.bio && (
                <p className="text-sm text-pink-400">{errors.bio.message}</p>
              )}
            </div>

            {/* Button */}
           <Button type="submit" className="w-full" disabled={updateLoading}>
              {updateLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Complete Profile"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;
