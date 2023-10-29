import { Router } from "express";
import CnelPoweroutagesService from "../services/CnelPowerOutages.service.js";

// schemas

// validation handlers

// services

const router = Router();
const cnelPoweroutagesService = new CnelPoweroutagesService();

await cnelPoweroutagesService.setScrapeData();

// return all data using json format

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

export default router;
