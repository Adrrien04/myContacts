import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./route/auth.js";

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

app.listen(PORT, () => {
  console.log(`Serveur sur ${PORT}`);
});
