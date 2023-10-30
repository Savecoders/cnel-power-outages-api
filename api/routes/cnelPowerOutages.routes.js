import { Router } from "express";
import CnelPoweroutagesService from "../services/CnelPowerOutages.service.js";

// schemas
import {
  findLocationSectorSchema,
  filterLRangeTimeSchema,
  getDataLocationSchema,
} from "../schemas/CnelPowerOutages.schemas.js";

// validation handlers
import { validatorHandler } from "../middleware/validator.handler.js";

const router = Router();

// cron job
import cron from "node-cron";

// services
const cnelPoweroutagesService = new CnelPoweroutagesService();
await cnelPoweroutagesService.setScrapeData();

cron.schedule("* 12 * * *", async () => {
  await cnelPoweroutagesService.setScrapeData();
});

// endpoints
// return all data
router.get("/", async (req, res, next) => {
  try {
    // get data from service
    const data = cnelPoweroutagesService.data;
    res.status(200).json({
      data: data,
      message: "data listed",
    });
  } catch (error) {
    next(error);
  }
});

// return data filtered by location
router.get(
  "/:location",
  validatorHandler(getDataLocationSchema, "params"),
  async (req, res, next) => {
    const { location } = req.params;
    try {
      // get data from service
      const data = cnelPoweroutagesService.findLocation(location);
      res.status(200).json({
        data: data,
        message: "data listed",
      });
    } catch (error) {
      next(error);
    }
  }
);

// return data filtered by location and sector
router.get(
  "/:location/:sector",
  validatorHandler(findLocationSectorSchema, "params"),
  async (req, res, next) => {
    const { location, sector } = req.params;
    try {
      // get data from service
      const data = cnelPoweroutagesService.findData(location, sector);
      res.status(200).json({
        data: data,
        message: "data listed",
      });
    } catch (error) {
      next(error);
    }
  }
);

// return data filtered by location and time
router.get(
  "/:location/time/:time",
  validatorHandler(filterLRangeTimeSchema, "params"),
  async (req, res, next) => {
    const { location, time } = req.params;
    try {
      // get data from service
      const data = cnelPoweroutagesService.filterLocationTime(location, time);
      res.status(200).json({
        data: data,
        message: "data listed",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
