"use client";

import React, { useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertTriangle, MapPin, Upload, CheckCircle2 } from "lucide-react";
import { createIssue } from "@/app/issues/actions";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Form validation
const formSchema = z.object({
  roadName: z.string().min(3, "Road name must be at least 3 characters"),
  location: z.string().min(5, "Please provide more specific location details"),

  issueType: z.enum(["pothole", "cracks", "drainage", "signage", "other"], {
    message: "Please select an issue type",
  }),

  severity: z.enum(["Low", "Medium", "High"]),
  description: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export type IssueFormValues = z.infer<typeof formSchema>;

interface ReportFormProps {
  isFieldWorker?: boolean;
  assignedTo?: number;
}

function ReportForm({ isFieldWorker = false, assignedTo }: ReportFormProps) {
  const router = useRouter();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IssueFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      severity: "Low",
    },
  });

  const latitude = useWatch({ control, name: "latitude" });
  const longitude = useWatch({ control, name: "longitude" });

  // Requirement 6: GPS/location capture
  const handleGeolocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setValue("latitude", position.coords.latitude);
        setValue("longitude", position.coords.longitude);
      });
    }
  };

  const onSubmit = async (data: IssueFormValues) => {
    setSubmitError(null);
    setSubmitSuccess(false);

    let photoUrl: string | undefined;

    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const res = await fetch("/api/issue-image-upload", {
          method: "POST",
          body: formData,
        });

        const json = await res.json();
        if (!res.ok || !json.url) {
          throw new Error(json.error || "Failed to upload image");
        }
        photoUrl = json.url as string;
      }
    } catch (error: any) {
      console.error("Image upload failed", error);
      setSubmitError(error.message || "Failed to upload image");
      return;
    }

    const result = await createIssue({
      roadName: data.roadName,
      locationDetails: data.location,
      issueType: data.issueType,
      severity: data.severity,
      latitude: data.latitude,
      longitude: data.longitude,
      assignedTo: assignedTo || undefined,
      photoUrl,
    });

    if (result.success) {
      setSubmitSuccess(true);
      reset();
      if (!isFieldWorker) {
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } else {
      setSubmitError(result.error || "Failed to submit report");
    }
  };

  return (
    <>
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Issue Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Road Name [cite: 14] */}
            <div className="space-y-2">
              <Label htmlFor="roadName">
                Road Name / Street <span className="text-destructive">*</span>
              </Label>
              <Input
                {...register("roadName")}
                id="roadName"
                placeholder="e.g., Independence Ave"
                className={errors.roadName ? "border-destructive" : ""}
              />
              {errors.roadName && (
                <p className="text-sm text-destructive">
                  {errors.roadName.message}
                </p>
              )}
            </div>

            {/* Location [cite: 14] */}
            <div className="space-y-2">
              <Label htmlFor="location">
                Location Details <span className="text-destructive">*</span>
              </Label>
              <Input
                {...register("location")}
                id="location"
                placeholder="Near City Hall"
                className={errors.location ? "border-destructive" : ""}
              />
              {errors.location && (
                <p className="text-sm text-destructive">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* GPS Capture  */}
            <div className="space-y-2">
              <Label>GPS Location (Optional)</Label>
              <Button
                type="button"
                variant="outline"
                onClick={handleGeolocation}
                className={`w-full justify-start gap-2 bg-transparent ${latitude ? "text-green-600 border-green-600" : "text-muted-foreground"}`}
              >
                <MapPin className="h-4 w-4" />
                {latitude && longitude
                  ? `Location Captured: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
                  : "Use Current Location"}
              </Button>
            </div>

            {/* Issue Type [cite: 15] */}
            <div className="space-y-2">
              <Label>
                Issue Type <span className="text-destructive">*</span>
              </Label>
              <Controller
                name="issueType"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger
                      className={
                        errors.issueType ? "border-destructive" : "w-full"
                      }
                    >
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pothole">Pothole</SelectItem>
                      <SelectItem value="cracks">Cracks</SelectItem>
                      <SelectItem value="drainage">Drainage</SelectItem>
                      <SelectItem value="signage">Signage</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.issueType && (
                <p className="text-sm text-destructive">
                  {errors.issueType.message}
                </p>
              )}
            </div>

            {/* Photo Upload with Preview */}
            <div className="space-y-2">
              <Label>Photo (Optional)</Label>
              <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-border bg-muted/30 p-4">
                {previewUrl ? (
                  <div className="flex flex-col items-center gap-2">
                    <img
                      src={previewUrl}
                      alt="Issue preview"
                      className="max-h-48 rounded-md object-cover"
                    />
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedFile(null);
                          setPreviewUrl(null);
                        }}
                      >
                        Remove
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          document.getElementById("photo-upload")?.click()
                        }
                      >
                        Replace
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-sm">
                    <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                    <p>Click to browse or drag and drop</p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() =>
                        document.getElementById("photo-upload")?.click()
                      }
                    >
                      Choose File
                    </Button>
                  </div>
                )}
                <input
                  type="file"
                  className="hidden"
                  id="photo-upload"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    if (file) {
                      setSelectedFile(file);
                      const url = URL.createObjectURL(file);
                      setPreviewUrl(url);
                    } else {
                      setSelectedFile(null);
                      setPreviewUrl(null);
                    }
                  }}
                />
              </div>
            </div>

            {/* Submit  */}
            <div className="w-full pt-4 space-y-2">
              {submitSuccess && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 text-green-700 border border-green-200">
                  <CheckCircle2 className="h-4 w-4" />
                  <p className="text-sm">
                    {isFieldWorker
                      ? "Issue reported successfully!"
                      : "Report submitted successfully! Thank you for your contribution."}
                  </p>
                </div>
              )}
              {submitError && (
                <div className="p-3 rounded-lg bg-red-50 text-red-700 border border-red-200">
                  <p className="text-sm">{submitError}</p>
                </div>
              )}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full hover:cursor-pointer"
              >
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default ReportForm;
