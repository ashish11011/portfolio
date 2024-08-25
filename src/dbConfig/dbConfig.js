const mongoose = require("mongoose");

export async function connect() {
  // Replace '<YourConnectionString>' with your actual MongoDB connection string
  const uri = process.env.MONGODB_URL;

  // Connect to MongoDB
  mongoose.connect(uri);

  // Get the default connection
  const connection = mongoose.connection;

  // Listen for the 'connected' event
  connection.on("connected", () => {
    console.log("MongoDB connected");
  });

  // Optionally, listen for other events like 'error' and 'disconnected'
  connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
  });
}
