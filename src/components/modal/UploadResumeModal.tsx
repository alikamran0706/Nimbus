import { useRef, useState } from "react";
import { Button } from "../ui/Button";
import Modal from ".";

interface AUploadResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadResumeModal = ({ isOpen, onClose }: AUploadResumeModalProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
  };

  const customFooter = () => {
    return (
      <div className="flex gap-2">
        <Button label="Close" onClick={onClose} variant="white" />
        <Button label="Save" onClick={onClose} variant="primary" disabled={!selectedFile} />
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Upload Resume"
      size="xl"
      customFooter={customFooter}
    >
      <div className="px-4 pb-4">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-10 rounded-lg text-center">
          <img src="/svg/black-file-upload.svg" alt="upload" className="w-6 h-6 mb-3 opacity-70" />
          <p className="text-sm text-gray-700 font-medium mb-2">Drag and drop your resume file</p>
          <p className="text-xs text-gray-500 mb-4">PDF, DOCX, TXT and CSV formats supported</p>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.txt,.csv"
            className="hidden"
          />

          <Button
            className="text-xsplus px-4 py-2 rounded-lg"
            label="Browse Files"
            onClick={handleBrowse}
          />

          {/* Display selected file */}
          {selectedFile && (
            <p className="text-xs text-gray-700 mt-3 font-medium">
              Selected file: <span className="text-blue-600">{selectedFile.name}</span>
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default UploadResumeModal;
