
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UploadCloud, FileSpreadsheet, AlertCircle, CheckCircle2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";

interface FileUploadProps {
  onFileUploaded: (filePath: string) => void;
}

const FileUpload = ({ onFileUploaded }: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const { toast } = useToast();

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFile(file);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFile(file);
    }
  };

  const handleFile = async (file: File) => {
    // Check file type
    const fileType = file.type;
    const validTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ];

    if (!validTypes.includes(fileType)) {
      toast({
        title: "Invalid file type",
        description: "Please upload an Excel (.xls, .xlsx) or CSV file",
        variant: "destructive"
      });
      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 10MB",
        variant: "destructive"
      });
      return;
    }

    setSelectedFile(file);
    setIsUploading(true);
    setUploadSuccess(false);

    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('lr_files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('lr_files')
        .insert({
          file_name: file.name,
          file_path: filePath,
          content_type: file.type,
          size: file.size,
        });

      if (dbError) throw dbError;

      onFileUploaded(filePath);
      setUploadSuccess(true);
      toast({
        title: "Success",
        description: "File uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload file. Please try again.",
        variant: "destructive"
      });
      setSelectedFile(null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-center w-full">
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center w-full h-48 transition-all duration-300 border-2 border-dashed rounded-xl 
            ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 bg-gray-50'} 
            ${isUploading ? 'opacity-50' : 'hover:bg-gray-100'}`}
        >
          <AnimatePresence mode="wait">
            {selectedFile ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center justify-center space-y-2"
              >
                <FileSpreadsheet className="w-12 h-12 text-primary" />
                <p className="text-sm font-medium text-gray-700">{selectedFile.name}</p>
                {isUploading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm text-gray-500">Uploading...</span>
                  </div>
                ) : uploadSuccess ? (
                  <div className="flex items-center space-x-2 text-green-500">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm">Upload complete</span>
                  </div>
                ) : null}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center justify-center space-y-2 p-6"
              >
                <UploadCloud className={`w-12 h-12 ${isDragging ? 'text-primary' : 'text-gray-500'}`} />
                <div className="flex flex-col items-center text-center space-y-1">
                  <p className="text-sm font-medium text-gray-700">
                    <span className="text-primary">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">Excel or CSV files (max 10MB)</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <input
            id="file-upload"
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
