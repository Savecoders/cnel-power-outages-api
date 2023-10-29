import getDataOfCnel from "../../libs/actions/getFilterOfCnel.js";

export default class CnelPoweroutagesService {
  constructor() {
    this.data = [];
  }

  async getData() {
    this.data = await getDataOfCnel();
    return this.data;
  }
}

const cnelPoweroutagesService = new CnelPoweroutagesService();
const data = await cnelPoweroutagesService.getData();

console.log(data);
