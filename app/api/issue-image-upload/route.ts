import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const ext = file.name.split(".").pop() || "jpg";
    const filePath = `issues/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${ext}`;

    const { data, error } = await supabase.storage
      .from("issue-photos")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error || !data) {
      console.error("Supabase upload error:", error?.message);
      let errorMessage = "Failed to upload image";
      
      if (error?.message?.includes("Bucket not found")) {
        errorMessage = "Storage bucket 'issue-photos' not found. Please create it in Supabase Storage.";
      } else if (error?.message?.includes("row-level security policy")) {
        errorMessage = "Storage policies not configured. Please run the SQL policies from scripts/setup-storage-policies.sql in your Supabase SQL Editor.";
      } else {
        errorMessage = error?.message || "Failed to upload image";
      }
      
      return NextResponse.json(
        { error: errorMessage },
        { status: 500 },
      );
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("issue-photos").getPublicUrl(data.path);

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Unexpected error while uploading image" },
      { status: 500 },
    );
  }
}