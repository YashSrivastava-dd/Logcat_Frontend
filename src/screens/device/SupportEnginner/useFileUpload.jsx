import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function useFileUpload(ticket) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [fileLocation, setFileLocation] = useState("");

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    } else {
      toast.error("No file selected");
    }
  };

  const uploadFile = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error("Please select a valid file");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/s3/update-ticket-file/${ticket}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setFileUrl(response.data.pdfUrl);
      setFileLocation(response?.data?.location);
      toast.success("File uploaded successfully");
    } catch (error) {
      console.error("File upload error:", error);
      toast.error("Error uploading file. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    selectedFile,
    fileUrl,
    fileLocation,
    handleFileSelect,
    uploadFile,
  };
}

export default useFileUpload;
