import getPdfContent from "./getPdfContent.js";
import getDataFromScrape from "./getDataFromScrape.js";
import mapingTimeSector from "../controler/mapingTimeSector.js";
import getSliceLocation from "./getSliceLocation.js";

async function getDataOfCnel() {
  const data = await getDataFromScrape();

  // get content of pdfs
  const dataWithContent = await Promise.all(
    data.map(async ({ pdf_url, title }) => {
      const content = await getPdfContent(pdf_url);
      const power_outages = mapingTimeSector(content);
      const location = getSliceLocation(title);
      return {
        pdf_url,
        location,
        power_outages,
      };
    })
  );

  return dataWithContent;
}

export default getDataOfCnel;
