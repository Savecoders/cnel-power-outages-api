import puppeteer from "puppeteer";
import dotenv from "dotenv";

dotenv.config();

async function getDataFromScrape() {
  const browser = await puppeteer.launch({
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
    headless: true,
    PUPPETEER_DISABLE_HEADLESS_WARNING: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--PUPPETEER_DISABLE_HEADLESS_WARNING",
      "--no-zygote",
      "--single-process",
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
        pdf_url: $row.href,
        title: $row.textContent,
      });
    });
    return data;
  });

  await browser.close();
  return urlsPdfsPPA;
}

export default getDataFromScrape;
