import getDataOfCnel from "../../libs/actions/getFilterOfCnel.js";

export default class CnelPoweroutagesService {
  data = [];

  constructor() {
    this.data = [];
  }

  async setScrapeData() {
    this.data = await getDataOfCnel();
  }

  get data() {
    return this.data;
  }

  findLocation(location) {
    return this.data.find((item) => {
      return item.location === location.toLowerCase();
    });
  }

  findData(location, sector) {
    const { power_outages, pdf_url } = this.findLocation(location);
    const power_outage = power_outages.find(({ sectors }) => {
      return sectors.includes(sector.toLowerCase());
    });

    if (power_outage.length === 0) return;

    const { time } = power_outage;

    return {
      pdf_url,
      location,
      time,
      sector,
    };
  }

  filterLocationTime(location, timeRange = "12-14") {
    let { power_outages, pdf_url } = this.findLocation(location);

    power_outages = power_outages.filter(({ time }) => {
      const startTime = time.substring(0, 2);
      const endTime = time.substring(7, 9);
      const timeRangeStart = timeRange.substring(0, 2);
      const timeRangeEnd = timeRange.substring(3, 5);
      return +startTime >= +timeRangeStart && +endTime <= +timeRangeEnd;
    });

    return {
      pdf_url,
      location,
      power_outages,
    };
  }
}
