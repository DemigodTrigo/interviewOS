import { UploadCloud, FileText, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { GlassCard } from "./GlassCard";
import { supabase } from "@/lib/supabase";

export function ResumeUpload() {
  const [file, setFile] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [drag, setDrag] = useState(false);

  const uploadResume = async (selectedFile: File) => {
    setUploading(true);
  
    const fileName = `${Date.now()}-${selectedFile.name}`;
  
    const { error } = await supabase.storage
      .from("resumes")
      .upload(fileName, selectedFile);
  
    setUploading(false);
  
    if (error) {
      alert(error.message);
    } else {
      setFile(selectedFile.name);
      alert("Resume uploaded successfully");
    }
  };

  return (
    <GlassCard title="Resume Upload" subtitle="PDF or DOCX — analyzed in seconds">
      <label
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          const f = e.dataTransfer.files?.[0];
          if (f) uploadResume(f);
        }}
        className={
          "relative block rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition " +
          (drag
            ? "border-[oklch(0.78_0.2_285)] bg-[oklch(0.68_0.22_285/10%)]"
            : "border-white/15 hover:border-white/30 hover:bg-white/5")
        }
      >
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={(e) => {
            const selectedFile = e.target.files?.[0];
            if (selectedFile) {
              uploadResume(selectedFile);
            }
          }}
        />
        <div className="size-14 mx-auto rounded-2xl gradient-brand grid place-items-center ring-glow mb-3">
          <UploadCloud className="size-7 text-white" />
        </div>
        <div className="font-medium">Drop your resume here</div>
        <div className="text-xs text-muted-foreground mt-1">or click to browse · max 10MB</div>
        {uploading && (
          <div className="mt-3 text-sm text-[oklch(0.78_0.18_270)]">
            Uploading resume...
          </div>
        )}
      </label>

      {file && (
        <div className="mt-4 flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3 animate-[fade-in_0.3s]">
          <FileText className="size-5 text-[oklch(0.78_0.18_270)]" />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{file}</div>
            <div className="text-xs text-muted-foreground">Uploaded · ready for analysis</div>
          </div>
          <CheckCircle2 className="size-5 text-[oklch(0.82_0.17_155)]" />
        </div>
      )}
    </GlassCard>
  );
}
