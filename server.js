import dotenv from "dotenv";

import path from "path";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors"

import { connectDB } from "./server/db/connect.js";
import routes from "./server/routes/index.js";
import errorHandler from "./server/middleware/error-handler.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./server/config/swagger.js";

dotenv.config();

const app = express();


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Mount API under /api
app.use("/api", routes);

// Production: serve Vite build for same-domain hosting
if (process.env.NODE_ENV === "production") {
  app.disable("x-powered-by");
  const dist = path.resolve(__dirname, "../dist");
  app.use(express.static(dist));
  // Fallback all non-API routes to SPA index
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next()
    return res.sendFile(path.join(dist, "index.html"));
  })
}

// Error handling
app.use(errorHandler)

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI

connectDB(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[API] listening on http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error("[API] DB connection failed", err)
    process.exit(1)
  })