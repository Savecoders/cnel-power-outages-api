import getPdfContent from "./getPdfContent.js";
import getDataFromScrape from "./getDataFromScrape.js";
import mapingTimeSector from "../controler/mapingTimeSector.js";
import sliceLocation from "../../utils/sliceLocation.js";
import findDate from "../../utils/findDate.js";

async function getDataOfCnel() {
  const data = await getDataFromScrape();
  // get content of pdfs

  const dataWithMap = await Promise.all(
    data.map(async ({ date, content }) => {
      date = findDate(date).trim();
      content = await Promise.all(
        content.map(async ({ pdf_url, title }) => {
          const pdfContent = await getPdfContent(pdf_url);
          //const power_outages = mapingTimeSector(pdfContent);
          const location = sliceLocation(title);
          return {
            pdf_url,
            location,
            pdfContent,
          };
        })
      );
      return {
        date,
        content,
      };
    })
  );

  return dataWithMap;
}

export default getDataOfCnel;

const data = await getDataOfCnel();
console.log(data[0]);
