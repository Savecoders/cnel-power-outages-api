import getPdfContent from "./getPdfContent.js";
import getDataFromScrape from "./getDataFromScrape.js";
import mapingTimeSector from "../controler/mapingTimeSector.js";
import getSliceCity from "./getSliceCity.js";

async function getDataOfCnel() {
  const data = await getDataFromScrape();

  // get content of pdfs
  const dataWithContent = await Promise.all(
    data.map(async ({ pdf_url, title }) => {
      const content = await getPdfContent(pdf_url);
      const power_outages = mapingTimeSector(content);
      const city = getSliceCity(title);
      return {
        pdf_url,
        city,
        power_outages,
      };
    })
  );

  return dataWithContent;
}

export default getDataOfCnel;
