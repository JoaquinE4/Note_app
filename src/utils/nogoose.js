import mongoose from "mongoose";

export async function connectDB() {
  try {
  const connect=  await mongoose.connect(
"mongodb+srv://jbackend0:bPXZtSA9yybO5LmR@cluster0.l0nnjep.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",      {
        dbName: "Notas",
      }
    );
    console.log("DB Conectada");
  } catch (error) {
    console.log({ error: error });
  }
}
