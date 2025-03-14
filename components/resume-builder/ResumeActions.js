import React from 'react';
import { FiDownload, FiEye } from 'react-icons/fi';

const ResumeActions = ({ templateNumber, onSelect, onPreview }) => {
  const handlePreview = (e) => {
    e.stopPropagation();
    onPreview(templateNumber);
  };

  const handleSelect = (e) => {
    e.stopPropagation();
    onSelect(templateNumber);
  };

  return (
    <div className="resume-actions">
      <button onClick={handlePreview}>
        <FiEye /> Preview
      </button>
      <button onClick={handleSelect}>
        <FiDownload /> Use Template
      </button>
    </div>
  );
};

export default ResumeActions;