import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "./config/index.js";
import connectDb from "./config/db.js";
import routes from "./routes/index.js";

const app = express();
const port = config.port;

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.get("/", (req, res) => res.send("Hello!! GrowthX Task Server!"));
app.get("/health", (req, res) => res.send("Server is up and running!"));

app.use("/", routes);

app.listen(port, () =>
  connectDb().then(() => {
    console.log(`Server is running on http://localhost:${port}`);
  })
);
