import express, { type Application } from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";
import endPointsConstant from "./constant/endPoints.constant.js";
import { defaultRouter } from "./router/default.router.js";
export const app: Application = express();

//  * Default Middlewares
app.use(express.json());
app.set("trust proxy", 1);
app.disable("x-powered-by");
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("../public"));
// * Custom Middlewares
app.use(endPointsConstant.DEFAULT_ENDPOINT, defaultRouter);
// * Error handling Middleware
app.use(notFoundHandler);
app.use(errorHandler);
