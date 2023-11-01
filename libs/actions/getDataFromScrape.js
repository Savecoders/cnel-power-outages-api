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
    const getChildren = [...$table.children];
    // get pdfs and urls
    const data = getChildren.reduce((acc, item) => {
      if (item.tagName === "H4") {
        const date = item.textContent;
        const content = [];
        acc.push({ date, content });
      } else if (item.tagName === "P") {
        if (item.querySelector("A")) {
          const pdf_url = item.querySelector("a").href;
          const title = item.querySelector("a").textContent;

          acc[acc.length - 1].content.push({ title, pdf_url });
        }
      }
      return acc;
    }, []);

    return data;
  });

  await browser.close();
  return urlsPdfsPPA;
}

export default getDataFromScrape;
