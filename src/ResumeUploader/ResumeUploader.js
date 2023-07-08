import React, { useState } from "react";
import "./ResumeUploader.css";

const ResumeUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("resume", selectedFile);
      // Call your upload endpoint with the formData
      // axios.post('/upload', formData, ...)
      // .then(() => {
      //    Handle success
      // })
      // .catch(() => {
      //    Handle error
      // });
    }
  };

  const handleDelete = () => {
    setSelectedFile(null);
  };

  return (
    <div className="resume-uploader">
      <h2>Resume Uploader</h2>
      <div className="file-input">
        <label htmlFor="resume">Select a Resume</label>
        <input
          type="file"
          id="resume"
          onChange={handleFileChange}
          accept=".doc, .docx, application/msword"
        />
        {selectedFile && (
          <div className="file-info">
            <div className="file-input-label">{selectedFile.name}</div>
            <button className="delete-button" onClick={handleDelete}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        )}
      </div>
      <button className="upload-button" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};

export default ResumeUploader;
