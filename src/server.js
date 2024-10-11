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
app.get("/health", (req, res) => res.json({
  "Server Status": "Running",
  "Server Time": new Date().toLocaleString(),
  "Server Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
  "Server Port": port,
  "Server Hostname": req.hostname,
  "Server IP": req.ip,
  "Server Method": req.method,
  "Server Path": req.path,
  "Server Query": req.query,
  "Server Headers": req.headers

}));

app.use("/", routes);

app.listen(port, () =>
  connectDb().then(() => {
    console.log(`Server is running on http://localhost:${port}`);
  })
);
