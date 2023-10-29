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
}
