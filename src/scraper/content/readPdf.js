import pdfjsLib from "pdfjs-dist";

async function readPdf(urlPdf) {
  const loadingTask = pdfjsLib.getDocument(urlPdf);
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;
  let content = "";

  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageContent = textContent.items.map((item) => item.str).join("");
    content += pageContent;
  }

  return content;
}

export default readPdf;
