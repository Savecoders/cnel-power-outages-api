// valid data using joi
import joi from "joi";

// schema for the product
const dataLocationSchema = joi.string().min(3).max(50);
const dataSectorSchema = joi.string().min(3).max(80);
const dataRangeTime = joi.string().min(5).max(5);

// getters and filters
const getDataLocationSchema = joi.object({
  location: dataLocationSchema.required(),
});
const findLocationSectorSchema = joi.object({
  location: dataLocationSchema.required(),
  sector: dataSectorSchema.required(),
});

const filterLRangeTimeSchema = joi.object({
  location: dataLocationSchema.required(),
  time: dataRangeTime,
});

// note: please use the equals method to compare the values of the schemas
export {
  findLocationSectorSchema,
  filterLRangeTimeSchema,
  getDataLocationSchema,
};
