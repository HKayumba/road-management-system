"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createUser } from "@/app/users/actions";
import { CheckCircle2, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["Admin", "FieldOfficer"]),
});

type FormValues = z.infer<typeof formSchema>;

export function AddFieldWorkerForm() {
  const router = useRouter();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "FieldOfficer",
    },
  });

  const role = watch("role");

  const onSubmit = async (data: FormValues) => {
    setSubmitError(null);
    setSubmitSuccess(false);
    setIsSubmitting(true);

    const result = await createUser({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    });

    setIsSubmitting(false);

    if (result.success) {
      setSubmitSuccess(true);
      reset();
      router.refresh();
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } else {
      setSubmitError(result.error || "Failed to create user");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Add New User
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              {...register("name")}
              id="name"
              placeholder="John Doe"
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              {...register("email")}
              id="email"
              type="email"
              placeholder="user@example.com"
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">
              Password <span className="text-destructive">*</span>
            </Label>
            <Input
              {...register("password")}
              id="password"
              type="password"
              placeholder="Minimum 6 characters"
              className={errors.password ? "border-destructive" : ""}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role">
              Role <span className="text-destructive">*</span>
            </Label>
            <Select
              value={role}
              onValueChange={(value) =>
                setValue("role", value as "Admin" | "FieldOfficer")
              }
            >
              <SelectTrigger
                className={errors.role ? "border-destructive" : ""}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FieldOfficer">Field Worker</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-sm text-destructive">{errors.role.message}</p>
            )}
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 text-green-700 border border-green-200">
              <CheckCircle2 className="h-4 w-4" />
              <p className="text-sm">User created successfully!</p>
            </div>
          )}

          {/* Error Message */}
          {submitError && (
            <div className="p-3 rounded-lg bg-red-50 text-red-700 border border-red-200">
              <p className="text-sm">{submitError}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Creating..." : "Create User"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
