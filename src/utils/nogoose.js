import mongoose from "mongoose";

export default async function connectDB() {
  try {
    const connect = await mongoose.connect(
      "mongodb+srv://jbackend0:bPXZtSA9yybO5LmR@cluster0.l0nnjep.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
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
