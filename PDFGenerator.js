import React from "react";
import { PDFDocument, PageSizes } from "pdf-lib";

const PDFGenerator = () => {
  const pdfRef = React.useRef(null);
  const generatePDF = async () => {
    console.log("before pdfDoc!!!!");
    const pdfDoc = await PDFDocument.create();
    console.log("after pdfDoc!!!!");
    const page = pdfDoc.addPage(PageSizes.A4);
    const { width, height } = page.getSize();
    const textContent = "Hello, World!";

    page.drawText(textContent, {
      x: 50,
      y: height - 50,
      size: 30,
    });

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    pdfRef.current.src = url;
  };

  return (
    <div>
      <h2>PDF Generator</h2>
      <button onClick={generatePDF}>Generate PDF</button>
      <iframe
        ref={pdfRef}
        title="PDF Viewer"
        width="100%"
        height="500px"
        style={{ border: "none" }}
      />
    </div>
  );
};

export default PDFGenerator;
