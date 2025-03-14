import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Template1 from './templates/Template1';
import Template1PDF from './templates/Template1PDF';

const ResumePreviewModal = ({ data, templateNumber, onClose }) => {
  return (
    <div className="resume-preview-modal">
      <div className="preview-content">
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="resume-content">
          <Template1 data={data} />
        </div>

        <div className="preview-actions">
          <PDFDownloadLink
            document={<Template1PDF data={data} />}
            fileName={`${data.firstName}_${data.lastName}_Resume.pdf`}
          >
            {({ loading }) => (
              <button className="download-button" disabled={loading}>
                {loading ? 'Generating PDF...' : 'Download PDF'}
              </button>
            )}
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
};

export default ResumePreviewModal;