import { MongoClient } from "mongodb";

// const url = "mongodb+srv://API_practice:Pran@v1811@pranav.d9jvdrj.mongodb.net//mydb"; //due to @
const url = "mongodb+srv://API_practice:Pran%40v1811@pranav.d9jvdrj.mongodb.net/mydb";

const client = new MongoClient(url);

export async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
    return client;
  } catch (err) {
    console.log("❌ Error:", err);
  }
}
