import { Router } from "express";
import CnelPowerOutagesRouter from "../routes/cnelPowerOutages.routes.js";
function routerApi(app) {
  const mainRouter = Router();

  // specify the version of the API in the URL
  app.use("/api/v1", mainRouter);

  // replace de app by router
  mainRouter.use("/cnel_poweroutages", CnelPowerOutagesRouter);
}

export default routerApi;
