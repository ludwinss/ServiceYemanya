import express, { Application } from "express";

//DotEnv Config 
import "./config/env";

import { productPhotoRoute, productRoute } from "./routes";

const app: Application = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", productRoute);
app.use("/photo", productPhotoRoute);


export default app;