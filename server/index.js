import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
//import multer from "multer";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";


import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import playerRoutes from "./routes/players.js";
import { addPlayer } from "./controllers/players.js";
import verifyToken from "./middleware/verifyToken.js";
import verifyRole from "./middleware/verifyRole.js";

// Config //
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());
//app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// File Storage //
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/assets");
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });

// const upload = multer({ storage: storage });

// Routes with files //
app.use("/players/addPlayer", verifyToken, verifyRole(['admin']), addPlayer);


app.get('/favicon.ico', (req, res) => {
  const faviconPath = path.join(__dirname, 'public/assets/favicon.ico');
  res.sendFile(faviconPath, (err) => {
    if (err) {
      // Fallback to a default favicon or respond with a 404 error
      const defaultFaviconPath = path.join(__dirname, 'public/assets/favicon.ico');
      res.sendFile(defaultFaviconPath, (err) => {
        if (err) {
          res.status(404).end();
        }
      });
    }
  });
});

// Routes //
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/players", playerRoutes);

// Database Setup //
const PORT = process.env.PORT || 3000;
const CONNECTION_URL = process.env.MONGO_URL;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Connected to database.Server running on port: ${PORT}`)
    );
  })
  .catch((error) => console.log(error.message));
