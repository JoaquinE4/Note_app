import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
export default async function connectDB() {
  try {
    const connect = await mongoose.connect(
      process.env.MONGODB_URL,
      {
        dbName: "Notas",
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Reduce el tiempo de espera para la selección del servidor
      }
    );
    console.log("DB Conectada");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}
