import "fs";
import axios from "axios";
import pdfjs from "pdfjs-dist";

// download and analyze the PDF
async function getPdfContent(pdfUrl) {
  try {
    // Download the PDF from the URL using axios
    const response = await axios.get(pdfUrl, {
      responseType: "arraybuffer",
    });
    const data = new Uint8Array(response.data);
    const loadingTask = pdfjs.getDocument(data);
    // Get the PDF document
    const pdfDocument = await loadingTask.promise;

    let content = "";

    for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
      const page = await pdfDocument.getPage(pageNum);
      const pageText = await page.getTextContent();
      content += pageText.items.reduce((acc, item) => acc + item.str, content);
    }

    return content;
  } catch (error) {
    return new Error("Error al descargar o analizar el PDF:", error);
  }
}

export default getPdfContent;
