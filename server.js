import { connectDB } from "./db/connection.js";

async function startServer() {
  const client = await connectDB();

  //later use

  console.log("Server ready...");
}

startServer();
