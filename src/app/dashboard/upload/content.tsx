"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  FileUp,
  FileText,
  X,
  AlertCircle,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadTender } from "@/lib/tenders/client";
import { useRouter } from "next/navigation";

interface UploadTenderPageProps {
  userId: string;
}

export default function UploadTenderContent({ userId }: UploadTenderPageProps) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setError(null);
      if (!title) {
        setTitle(acceptedFiles[0].name.replace(/\.[^/.]+$/, ""));
      }
    }
  }, [title]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
  });

  const handleUpload = async () => {
    if (!file || !title) return;

    setUploading(true);
    setError(null);
    setProgress(10); // Start progress

    try {
      // Fake progress increment
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      const tender = await uploadTender(file, userId, title);

      clearInterval(interval);
      setProgress(100);
      setSuccess(true);

      setTimeout(() => {
        router.push(`/dashboard/tenders/${tender.id}`);
      }, 1500);

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to upload tender.";
      setError(errorMessage);
      setUploading(false);
      setProgress(0);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="bg-green-100 p-6 rounded-full">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="text-2xl font-semibold">Upload Successful!</h2>
        <p className="text-slate-500">Redirecting to tender details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Upload Tender</h1>
        <p className="text-muted-foreground">
          Upload a PDF tender document to begin analysis.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Tender Title</Label>
            <Input
              id="title"
              placeholder="e.g., City Infrastructure Upgrade 2024"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={uploading}
            />
          </div>

          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-indigo-600 bg-indigo-50/50" : "border-slate-200 hover:border-slate-300"
            } ${file ? "bg-slate-50/50 border-indigo-200" : ""}`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center space-y-4">
              <div className={`p-4 rounded-full ${file ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-400"}`}>
                {file ? <FileText className="h-8 w-8" /> : <FileUp className="h-8 w-8" />}
              </div>
              {file ? (
                <div className="space-y-1">
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-sm font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">Only PDF files are supported</p>
                </div>
              )}
            </div>
          </div>

          {file && !uploading && (
            <Button variant="ghost" size="sm" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => setFile(null)}>
              <X className="h-4 w-4 mr-2" /> Remove File
            </Button>
          )}

          {error && (
            <div className="p-3 text-sm font-medium text-red-600 bg-red-50 border border-red-100 rounded-md flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" /> {error}
            </div>
          )}

          {uploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="flex items-center">
                  <Loader2 className="h-3 w-3 animate-spin mr-1" /> Uploading...
                </span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <Button
            className="w-full bg-indigo-600 hover:bg-indigo-700"
            disabled={!file || !title || uploading}
            onClick={handleUpload}
          >
            {uploading ? "Processing..." : "Start Analysis"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
