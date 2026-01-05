import React from "react";
import useFileUpload from "./useFileUpload"; // Adjust the import path accordingly

function FileUploadComponent({ ticket }) {
  const {
    isLoading,
    handleFileSelect,
    uploadFile,
  } = useFileUpload(ticket);

  return (
    <div>
      <label htmlFor="toolsProvided" className="flex text-start block mb-2 text-sm font-medium text-gray-900">
        Attachment
      </label>
      <div  className="text-sm w-full flex justify-start " style={{gap:'6px'}}>
        <input
          type="file"
          onChange={handleFileSelect}
          style={{ border: '0.5px solid grey' ,width:'500px'}}
        />
        <button
          className="upload-button"
          onClick={uploadFile}
          disabled={isLoading}
          style={{ backgroundColor: 'black', color: 'white', padding: '8px', width: '9rem', borderRadius: '8px' }}
        >
          {isLoading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
}

export default FileUploadComponent;
