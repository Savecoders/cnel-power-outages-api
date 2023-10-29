import getPdfContent from "./actions/getPdfContent.js";
import getDataFromScrape from "./actions/dataFromScrape.js";

const data = await getDataFromScrape();

const dataWithContent = await Promise.all(
  data.map(async (item) => {
    const content = await getPdfContent(item.pdfUrl);
    const dateAndZone = {};
    const data = content.match(/\d{2}:\d{2}\s+a\d{2}:\d{2}/g);
    const data2 = content.split(",");

    return {
      ...item,
      data,
      data2,
    };
  })
);

console.log(dataWithContent);
