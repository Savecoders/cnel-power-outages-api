import { Router } from "express";
import CnelPoweroutagesService from "../services/CnelPowerOutages.service.js";

// schemas

// validation handlers

// services
const router = Router();
const cnelPoweroutagesService = new CnelPoweroutagesService();

await cnelPoweroutagesService.setScrapeData();

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
router.get("/:location", async (req, res, next) => {
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
});

// return data filtered by location and sector
router.get("/:location/:sector", async (req, res, next) => {
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
});

// return data filtered by location and time
router.get("/:location/time/:time", async (req, res, next) => {
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
});

export default router;
