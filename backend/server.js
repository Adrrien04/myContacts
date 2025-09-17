import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./route/auth.js";
import contactRoutes from "./route/contact.js";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const swaggerFile = require("./swagger-output.json");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connecté"))
  .catch((err) => console.error("Erreur:", err));

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(PORT, () => {
  console.log(`Serveur sur ${PORT}`);
});
