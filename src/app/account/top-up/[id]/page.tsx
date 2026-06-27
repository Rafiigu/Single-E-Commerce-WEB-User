"use client";

import { getTopUp } from "@/actions/top-up/get-top-up";
import { uploadTransferProof } from "@/actions/top-up/upload-transfer-proof";
import { ArrowBackButton } from "@/components/top-up-history/arrow-back-button";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { TopUp } from "@/types";
import { transferTopUpProof } from "@/actions/top-up/transfer-top-up-proof";

export default function UploadTransferProofPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [topUp, setTopUp] = useState<TopUp | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const loadParams = async () => {
      const { id } = await params;
      setId(id);
    };
    loadParams();
  }, [params]);

  useEffect(() => {
    const fetchTopUp = async () => {
      if (!id) return;
      const { data, error } = await getTopUp({ id });
      if (error) {
        toast.error("Failed to fetch top-up details");
        setLoading(false);
        return;
      }
      setTopUp(data);
      setLoading(false);
    };

    fetchTopUp();
  }, [id]);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error("Please select an image first");
      return;
    }

    if (!id) {
      toast.error("Top-up ID not found");
      return;
    }

    setSubmitting(true);

    const formData = new FormData();
    formData.append("files", selectedFile);

    const { data, errorFields, error } = await uploadTransferProof({
      formData,
    });

    console.log("test", data, errorFields, error);

    if (error) {
      toast.error("Upload failed");
      setSubmitting(false);
      return;
    }

    if (!data || data.length === 0) {
      toast.error("No files were uploaded");
      setSubmitting(false);
      return;
    }

    const { error: transferError } = await transferTopUpProof({
      id,
      transferProofFileName: data[0].filename,
    });

    if (transferError) {
      toast.error("Failed to submit transfer proof");
      setSubmitting(false);
      return;
    }
    toast.success("Transfer proof uploaded successfully!");
    setSubmitting(false);

    router.replace(`/account/top-up-history/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center w-full min-h-screen bg-gray-100">
        <div className="flex items-center justify-center p-5 min-w-107 h-[700px] bg-white">
          <p className="text-neutral-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!topUp) {
    return (
      <div className="flex justify-center w-full min-h-screen bg-gray-100">
        <div className="flex items-center justify-center p-5 min-w-107 h-[700px] bg-white">
          <p className="text-neutral-600">Top-up not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full min-h-screen bg-gray-100">
      <div className="flex flex-col items-start p-5 min-w-107 bg-white shadow-md rounded-lg">
        <div className="w-full flex items-center mb-6">
          <ArrowBackButton />
          <h3 className="text-lg font-medium text-neutral-900">
            Upload Transfer Proof
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-4">
          {/* Current Preview Section */}
          <div className="flex flex-col gap-y-2">
            <label className="text-sm font-medium text-neutral-900">
              Current Transfer Proof
            </label>
            {preview ? (
              <div className="relative w-full h-64 rounded-lg border-2 border-gray-300 overflow-hidden">
                <img
                  src={preview}
                  alt="Selected transfer proof"
                  className="w-full h-full object-contain bg-gray-100"
                />
              </div>
            ) : (
              <div className="w-full h-64 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                <p className="text-neutral-500">No image selected</p>
              </div>
            )}
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />

          {/* File Picker Button */}
          <Button
            type="button"
            onClick={handleOpenFilePicker}
            variant="outline"
            className="w-full"
          >
            {preview ? "Change Image" : "Select Image"}
          </Button>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!selectedFile || submitting}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {submitting ? "Uploading..." : "Upload Transfer Proof"}
          </Button>
        </form>
      </div>
    </div>
  );
}
