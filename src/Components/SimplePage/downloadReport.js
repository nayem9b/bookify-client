import { jsPDF } from "jspdf";

/**
 * downloadReport - Generates and downloads report in PDF or XML
 * @param {Array} data - Array of objects (report data)
 * @param {string} format - "pdf" | "xml"
 * @param {string} fileName - Name of downloaded file
 */
export const downloadReport = (data, format = "pdf", fileName = "report") => {
  if (!data || data.length === 0) {
    alert("No data to export!");
    return;
  }

  if (format === "pdf") {
    const doc = new jsPDF();
    let y = 10;

    // Title
    doc.setFontSize(16);
    doc.text(`${fileName} Report`, 10, y);
    y += 10;

    // Table header
    const headers = Object.keys(data[0]);
    doc.setFontSize(12);
    doc.text(headers.join(" | "), 10, y);
    y += 8;

    // Table rows
    data.forEach((row) => {
      const values = headers.map((h) => row[h]);
      doc.text(values.join(" | "), 10, y);
      y += 8;
      if (y > 280) {
        // avoid overflow
        doc.addPage();
        y = 10;
      }
    });

    doc.save(`${fileName}.pdf`);
  }

  if (format === "xml") {
    let xml = "<?xml version='1.0' encoding='UTF-8'?>\n<report>\n";
    data.forEach((row) => {
      xml += "  <row>\n";
      Object.entries(row).forEach(([key, value]) => {
        xml += `    <${key}>${value}</${key}>\n`;
      });
      xml += "  </row>\n";
    });
    xml += "</report>";

    const blob = new Blob([xml], { type: "application/xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.xml`;
    link.click();
  }
};
