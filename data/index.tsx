// Data

import { AlertTriangle, MapPin, Shield, Zap } from "lucide-react";

export const stats = [
  { value: "2,500+", label: "Issues Resolved" },
  { value: "48hr", label: "Average Response" },
  { value: "95%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Report Anytime" },
];

export const features = [
  {
    icon: Zap,
    title: "Quick Reporting",
    description:
      "Report road issues in minutes with our simple online form. No account required.",
  },
  {
    icon: MapPin,
    title: "Location Tracking",
    description:
      "Pinpoint exact locations using GPS or manual entry for accurate issue identification.",
  },

  {
    icon: Shield,
    title: "Government Backed",
    description:
      "Official system managed by the Public Works Department for reliable service.",
  },
];

export const steps = [
  {
    number: "01",
    title: "Report the Issue",
    description:
      "Fill out our simple form with the road location and issue type. Add photos if available.",
  },
  {
    number: "02",
    title: "Verification",
    description:
      "Our team reviews and verifies the report, assessing severity and priority.",
  },
  {
    number: "03",
    title: "Assignment",
    description:
      "A field officer is assigned to inspect and address the issue.",
  },
  {
    number: "04",
    title: "Resolution",
    description: "The issue is repaired and marked as completed in our system.",
  },
];

export const roadIssue = [
  {
    icon: AlertTriangle,
    title: "Potholes",
    description: "Holes or depressions in the road surface",
  },
  {
    icon: AlertTriangle,
    title: "Cracks",
    description: "Surface cracks, splits, or fractures",
  },
  {
    icon: AlertTriangle,
    title: "Drainage",
    description: "Blocked drains or flooding issues",
  },
  {
    icon: AlertTriangle,
    title: "Signage",
    description: "Damaged, missing, or obscured signs",
  },
];
