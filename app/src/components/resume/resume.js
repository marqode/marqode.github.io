import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import resume from "./resume.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Resume = () => (
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-8">
        <Document file={resume}>
          <Page pageNumber={1} />
          <Page pageNumber={2} />
        </Document>
      </div>
    </div>
  </div>
);

export default Resume;
