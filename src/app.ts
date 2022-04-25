import express, { Application } from "express";

import "./config/env";

import { productRoute } from "./routes";

//DotEnv Config 

const app: Application = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", productRoute);


export default app;