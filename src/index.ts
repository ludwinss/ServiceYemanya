import express, { application, Express } from "express";
import router from "./routes";

const app: Express = express();

app.listen(9092, () => {
    console.log("server cargado csm")
    console.log('soy muy gozu gaa')

})

app.use("/", router);
