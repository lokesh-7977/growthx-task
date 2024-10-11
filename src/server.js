import express from "express";
import bodyParser from "body-parser";
import { config } from "./config/index.js";
import connectDb from "./config/db.js";
import routes from "./routes/index.js";

const app = express();
const port = config.port;

app.use(bodyParser.json());

app.use("/", routes);

app.listen(port, () =>
  connectDb().then(() => {
    console.log(`Server is running on http://localhost:${port}`);
  })
);
