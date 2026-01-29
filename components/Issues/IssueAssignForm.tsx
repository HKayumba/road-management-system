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
import { assignIssue } from "@/app/issues/actions";
import { useRouter } from "next/navigation";

interface IssueAssignFormProps {
  issueId: number;
  currentAssignee?: number;
  workers: { id: number; name: string }[];
}

export function IssueAssignForm({
  issueId,
  currentAssignee,
  workers,
}: IssueAssignFormProps) {
  const router = useRouter();
  const [workerId, setWorkerId] = useState(
    currentAssignee?.toString() || ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workerId) return;
    setIsSubmitting(true);
    const result = await assignIssue(issueId, parseInt(workerId));
    setIsSubmitting(false);
    if (result.success) {
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 w-full">
      <Select value={workerId} onValueChange={setWorkerId}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Assign to..." />
        </SelectTrigger>
        <SelectContent>
          {workers.map((worker) => (
            <SelectItem key={worker.id} value={worker.id.toString()}>
              {worker.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        type="submit"
        size="sm"
        variant="outline"
        className="w-full"
        disabled={isSubmitting || !workerId}
      >
        {isSubmitting ? "Assigning..." : "Assign Worker"}
      </Button>
    </form>
  );
}
