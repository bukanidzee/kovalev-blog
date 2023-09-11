import express from "express";
import config from "config";
import mongoose from "mongoose";
import routers from "./routers/index.js";
import fileUpload from "express-fileupload";
import cors from "cors";

const app = express();

const PORT = config.get("port") || 5000;

const corsOptions = {
  origin: config.get("corsOrigin") || "http://localhost:3000",
};

app.use(express.json());
app.use(express.static("static"));
app.use(fileUpload());
app.use(cors(corsOptions));

for (let router of routers) {
  app.use("/api", router);
}

async function start() {
  try {
    await mongoose.connect(config.get("mongoUrl"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Db is connected");
    app.listen(PORT, () => console.log(`App is running on ${PORT}`));
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
}

start();
