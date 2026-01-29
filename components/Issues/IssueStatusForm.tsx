"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateIssueStatus } from "@/app/issues/actions";
import { useRouter } from "next/navigation";

interface IssueStatusFormProps {
  issueId: number;
  currentStatus: string;
}

export function IssueStatusForm({ issueId, currentStatus }: IssueStatusFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await updateIssueStatus(
      issueId,
      status as "Reported" | "In Progress" | "Completed"
    );
    setIsSubmitting(false);
    if (result.success) {
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 w-full">
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Reported">Reported</SelectItem>
          <SelectItem value="In Progress">In Progress</SelectItem>
          <SelectItem value="Completed">Completed</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit" size="sm" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Updating..." : "Update Status"}
      </Button>
    </form>
  );
}
