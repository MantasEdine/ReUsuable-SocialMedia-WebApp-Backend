import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import { login } from "./controllers/auth.js";
dotenv.config();

// Configurations

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(helmet());

app.use(
  helmet({
    crossOriginEmbedderPolicy: { policy: "require-corp" },
  })
);
app.use(morgan(morgan.common));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// Storage Configuration

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, res, cb) {
    cb(null, file.originalfilename);
  },
});
const upload = multer({ storage });

// Rout With Files
// upload.signle is a middleware that occures before it hits that endpoint
// and our logic will start
// register = Controller
app.post("/auth/register", upload.single("picture"), register);
app.use("/auth", authRoutes);
// Mongoose Setup
const Port = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((connection) => {
    app.listen(Port, () => {
      console.log(`Connected On ${Port}`);
    });
  })
  .catch((error) => {
    console.log(`${error.message}`);
  });
