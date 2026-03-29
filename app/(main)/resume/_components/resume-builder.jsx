"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  Download,
  Edit,
  Loader2,
  Monitor,
  Save,
} from "lucide-react";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { saveResume } from "@/actions/resume";
import { EntryForm } from "./entry-form";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/nextjs";
import { entriesToMarkdown } from "@/app/lib/helper";
import { resumeSchema } from "@/app/lib/schema";


export default function ResumeBuilder({ initialContent }) {
  const [activeTab, setActiveTab] = useState("edit");
  const [previewContent, setPreviewContent] = useState(initialContent);
  const { user } = useUser();
  const [resumeMode, setResumeMode] = useState("preview");

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: {},
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
    },
  });

  const {
    loading: isSaving,
    fn: saveResumeFn,
    data: saveResult,
    error: saveError,
  } = useFetch(saveResume);

  // Watch form fields for preview updates
  const formValues = watch();

  useEffect(() => {
    if (initialContent) setActiveTab("preview");
  }, [initialContent]);

  // Update preview content when form values change
  useEffect(() => {
    if (activeTab === "edit") {
      const newContent = getCombinedContent();
      setPreviewContent(newContent ? newContent : initialContent);
    }
  }, [formValues, activeTab]);

  // Handle save result
  useEffect(() => {
    if (saveResult && !isSaving) {
      toast.success("Resume saved successfully!");
    }
    if (saveError) {
      toast.error(saveError.message || "Failed to save resume");
    }
  }, [saveResult, saveError, isSaving]);

  const getContactMarkdown = () => {
    const { contactInfo } = formValues;
    const parts = [];
    if (contactInfo.email) parts.push(`📧 ${contactInfo.email}`);
    if (contactInfo.mobile) parts.push(`📱 ${contactInfo.mobile}`);
    if (contactInfo.linkedin)
      parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
    if (contactInfo.twitter) parts.push(`🐦 [Twitter](${contactInfo.twitter})`);
    if (contactInfo.github) parts.push(`💻 [GitHub](${contactInfo.github})`);


    return parts.length > 0
      ? `## <div align="center">${user.fullName}</div>
        \n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
      : "";
  };

  const getCombinedContent = () => {
    const { summary, skills, experience, education, projects } = formValues;
    return [
      getContactMarkdown(),
      summary && `## Professional Summary\n\n${summary}`,
      skills && `## Skills\n\n${skills}`,
      entriesToMarkdown(experience, "Work Experience"),
      entriesToMarkdown(education, "Education"),
      entriesToMarkdown(projects, "Projects"),
    ]
      .filter(Boolean)
      .join("\n\n");
  };

  const [isGenerating, setIsGenerating] = useState(false);

 const generatePDF = async () => {
  setIsGenerating(true);
  try {
    console.log("Starting PDF generation...");
    
    // Method 1: Try print to PDF (most reliable)
    const markdownContent = previewContent || "";
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Resume</title>
        <style>
          @page {
            margin: 15mm;
            size: A4;
          }
          body {
            font-family: 'Arial', 'Helvetica', sans-serif;
            line-height: 1.6;
            color: #000000;
            background: #ffffff;
            padding: 20px;
            margin: 0;
            font-size: 12pt;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          h1 { font-size: 18pt; font-weight: bold; margin-bottom: 10pt; color: #000000; }
          h2 { font-size: 16pt; font-weight: bold; margin-bottom: 8pt; color: #000000; }
          h3 { font-size: 14pt; font-weight: bold; margin-bottom: 6pt; color: #000000; }
          p { margin: 6pt 0; color: #000000; }
          strong, b { font-weight: bold; color: #000000; }
          em, i { font-style: italic; color: #000000; }
          a { color: #0000EE; text-decoration: underline; }
          ul, ol { margin: 6pt 0; padding-left: 20pt; color: #000000; }
          li { margin: 3pt 0; color: #000000; }
          hr { border: 1px solid #ccc; margin: 10pt 0; }
          blockquote { 
            border-left: 3px solid #ccc; 
            padding-left: 10pt; 
            margin: 10pt 0; 
            font-style: italic;
            color: #666666;
          }
          code { 
            font-family: 'Courier New', monospace; 
            background: #f5f5f5; 
            padding: 2pt 4pt; 
            color: #000000;
          }
          .contact-info {
            text-align: center;
            margin-bottom: 20pt;
            border-bottom: 2px solid #000;
            padding-bottom: 10pt;
          }
        </style>
      </head>
      <body>
        ${markdownToHTML(markdownContent)}
      </body>
      </html>
    `;
    
    // Create blob and open print dialog
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const printWindow = window.open(url, '_blank', 'width=800,height=600');
    
    if (!printWindow) {
      throw new Error("Popup blocked. Please allow popups for this site and try again.");
    }
    
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        // Don't close immediately, let user handle print dialog
        setTimeout(() => {
          printWindow.close();
          URL.revokeObjectURL(url);
        }, 1000);
      }, 500);
    };
    
    toast.success("PDF generation initiated. Use your browser's print dialog to save as PDF.");
    
  } catch (error) {
    console.error("Primary PDF method failed:", error);
    
    // Method 2: Try html2pdf with simplified settings
    try {
      console.log("Trying html2pdf fallback...");
      
      const element = document.getElementById("resume-pdf");
      if (!element) {
        throw new Error("Resume element not found");
      }
      
      // Create a simple text-only version
      const textContent = element.innerText || previewContent || "";
      const simpleHTML = `
        <div style="font-family: Arial; color: black; background: white; padding: 20px; line-height: 1.6;">
          <h1 style="color: black;">Resume</h1>
          <div style="color: black; white-space: pre-wrap;">${textContent}</div>
        </div>
      `;
      
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = simpleHTML;
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      document.body.appendChild(tempDiv);
      
      const html2pdf = (await import("html2pdf.js")).default;
      const opt = {
        margin: [10, 10],
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.8 },
        html2canvas: { 
          scale: 1,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };
      
      await html2pdf().set(opt).from(tempDiv).save();
      document.body.removeChild(tempDiv);
      toast.success("PDF generated successfully!");
      
    } catch (fallbackError) {
      console.error("All PDF methods failed:", fallbackError);
      
      // Method 3: Direct download as HTML file (user can print to PDF)
      try {
        const htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>Resume</title>
            <style>
              body { font-family: Arial; line-height: 1.6; color: black; background: white; padding: 20px; }
              h1, h2, h3 { color: black; }
              p { color: black; }
            </style>
          </head>
          <body>
            ${markdownToHTML(previewContent || "")}
          </body>
          </html>
        `;
        
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        toast.warning("PDF generation failed. Downloaded as HTML file. You can print it to PDF from your browser.");
        
      } catch (finalError) {
        // Last resort: text file
        const textContent = previewContent || "Resume content not available";
        const blob = new Blob([textContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        toast.error("All PDF methods failed. Downloaded as text file. Please check browser settings and try again.");
      }
    }
  } finally {
    setIsGenerating(false);
  }
};

// Simple markdown to HTML converter
const markdownToHTML = (markdown) => {
  if (!markdown) return "";
  
  return markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    // Lists (basic)
    .replace(/^\* (.+)/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    // Wrap in paragraphs
    .replace(/^(?!<[h|u|l])/gim, '<p>')
    .replace(/(?<!>)$/gim, '</p>')
    // Contact info centering
    .replace(/<div align="center">/g, '<div class="contact-info">')
    .replace(/<\/div>/g, '</div>');
};


  const onSubmit = async (data) => {
    try {
      const formattedContent = previewContent
        .replace(/\n/g, "\n") // Normalize newlines
        .replace(/\n\s*\n/g, "\n\n") // Normalize multiple newlines to double newlines
        .trim();

      console.log(previewContent, formattedContent);
      await saveResumeFn(previewContent);
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  return (
    <div data-color-mode="light" className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <h1 className="font-bold gradient-title text-5xl md:text-6xl">
          Resume Builder
        </h1>
        <div className="space-x-2">
          <Button
            variant="destructive"
            onClick={handleSubmit(onSubmit)}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save
              </>
            )}
          </Button>
          <Button onClick={generatePDF} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Download PDF
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="edit">Form</TabsTrigger>
          <TabsTrigger value="preview">Markdown</TabsTrigger>
        </TabsList>

        <TabsContent value="edit">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Contact Information */}
            <div className="space-y-4">
  <h3 className="text-lg font-medium">Contact Information</h3>
  
  {/* Email & Mobile */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/50">
    <div className="space-y-2">
      <label className="text-sm font-medium">Email</label>
      <Input
        {...register("contactInfo.email")}
        type="email"
        placeholder="your@email.com"
      />
      {errors.contactInfo?.email && (
        <p className="text-sm text-red-500">
          {errors.contactInfo.email.message}
        </p>
      )}
    </div>

    <div className="space-y-2">
      <label className="text-sm font-medium">Mobile Number</label>
      <Input
        {...register("contactInfo.mobile")}
        type="tel"
        placeholder="+1 234 567 8900"
      />
      {errors.contactInfo?.mobile && (
        <p className="text-sm text-red-500">
          {errors.contactInfo.mobile.message}
        </p>
      )}
    </div>
  </div>

  {/* LinkedIn, Twitter, GitHub */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-muted/50">
    <div className="space-y-2">
      <label className="text-sm font-medium">LinkedIn URL</label>
      <Input
        {...register("contactInfo.linkedin")}
        type="url"
        placeholder="https://linkedin.com/in/your-profile"
      />
      {errors.contactInfo?.linkedin && (
        <p className="text-sm text-red-500">
          {errors.contactInfo.linkedin.message}
        </p>
      )}
    </div>

    <div className="space-y-2">
      <label className="text-sm font-medium">Twitter/X Profile</label>
      <Input
        {...register("contactInfo.twitter")}
        type="url"
        placeholder="https://twitter.com/your-handle"
      />
      {errors.contactInfo?.twitter && (
        <p className="text-sm text-red-500">
          {errors.contactInfo.twitter.message}
        </p>
      )}
    </div>

    <div className="space-y-2">
      <label className="text-sm font-medium">GitHub URL</label>
      <Input
        {...register("contactInfo.github")}
        type="url"
        placeholder="https://github.com/your-username"
      />
      {errors.contactInfo?.github && (
        <p className="text-sm text-red-500">
          {errors.contactInfo.github.message}
        </p>
      )}
    </div>
  </div>
</div>


            {/* Summary */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Professional Summary</h3>
              <Controller
                name="summary"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    className="h-32"
                    placeholder="Write a compelling professional summary..."
                    error={errors.summary}
                  />
                )}
              />
              {errors.summary && (
                <p className="text-sm text-red-500">{errors.summary.message}</p>
              )}
            </div>

            {/* Skills */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Skills</h3>
              <Controller
                name="skills"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    className="h-32"
                    placeholder="List your key skills..."
                    error={errors.skills}
                  />
                )}
              />
              {errors.skills && (
                <p className="text-sm text-red-500">{errors.skills.message}</p>
              )}
            </div>

            {/* Experience */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Work Experience</h3>
              <Controller
                name="experience"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="Experience"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.experience && (
                <p className="text-sm text-red-500">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* Education */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Education</h3>
              <Controller
                name="education"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="Education"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.education && (
                <p className="text-sm text-red-500">
                  {errors.education.message}
                </p>
              )}
            </div>

            {/* Projects */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Projects</h3>
              <Controller
                name="projects"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="Project"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.projects && (
                <p className="text-sm text-red-500">
                  {errors.projects.message}
                </p>
              )}
            </div>
          </form>
        </TabsContent>

        <TabsContent value="preview">
          {activeTab === "preview" && (
            <Button
              variant="link"
              type="button"
              className="mb-2"
              onClick={() =>
                setResumeMode(resumeMode === "preview" ? "edit" : "preview")
              }
            >
              {resumeMode === "preview" ? (
                <>
                  <Edit className="h-4 w-4" />
                  Edit Resume
                </>
              ) : (
                <>
                  <Monitor className="h-4 w-4" />
                  Show Preview
                </>
              )}
            </Button>
          )}

          {activeTab === "preview" && resumeMode !== "preview" && (
            <div className="flex p-3 gap-2 items-center border-2 border-yellow-600 text-yellow-600 rounded mb-2">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-sm">
                You will lose editied markdown if you update the form data.
              </span>
            </div>
          )}
          <div className="border rounded-lg">
            <MDEditor
              value={previewContent}
              onChange={setPreviewContent}
              height={800}
              preview={resumeMode}
            />
          </div>
          <div className="hidden">
            <div id="resume-pdf" style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              backgroundColor: 'white',
              color: '#1a1a1a',
              padding: '20px',
              lineHeight: '1.6'
            }}>
              <MDEditor.Markdown
                source={previewContent}
                style={{
                  background: "white",
                  color: "#1a1a1a",
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}