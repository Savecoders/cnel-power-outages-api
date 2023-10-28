import puppeteer from "puppeteer";
import readPdf from "./content/readPdf.js";
async function getDataFromWebPage() {
  const browser = await puppeteer.launch({
    headless: true,
    PUPPETEER_DISABLE_HEADLESS_WARNING: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--PUPPETEER_DISABLE_HEADLESS_WARNING",
    ],
  });
  const page = await browser.newPage();
  await page.goto("https://www.cnelep.gob.ec/desconexiones-de-energia/");
  // in case of dynamic content
  // and is data from navigatior object
  // pdfs of power outages list in the province
  const urlsPdfsPPA = await page.evaluate(() => {
    const $ = document.querySelector.bind(document);
    const $table = $(".entry-content");
    const $rows = $table.querySelectorAll("a");
    const data = [];
    $rows.forEach(($row) => {
      data.push({
        urlPdf: $row.href,
        title: $row.textContent,
      });
    });
    return data;
  });

  // pdfs of power outages list in the province
  console.log(urlsPdfsPPA);

  urlsPdfsPPA.forEach(async ({ urlPdf }) => {
    const data = await readPdf(urlPdf);
    console.log(data);
  });

  await browser.close();
}

getDataFromWebPage();
