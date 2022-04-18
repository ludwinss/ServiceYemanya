import express, { Application } from "express";

import "./config/env";

import "./models/index"
import router from "./routes";

//DotEnv Config 

const app: Application = express();

app.use("/", router);


export default app;