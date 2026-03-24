import DB from "./db/connection.js";
import http from "http";
const type = "Content-Type";
const json = "application/json";

async function testDB() {
  try {
    const [rows] = await DB.execute("SELECT 1 + 1 AS result");
    console.log("✅ DB Connected, Test Result:", rows[0].result);
  } catch (err) {
    console.error("❌ DB Connection Failed:", err);
  }
}

const server = http.createServer(async (req, res) => {
  //cors
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  //GET: all USERS
  if (req.url === "/users" && req.method === "GET") {
    try {
      const [users] = await DB.execute("SELECT * FROM users");
      res.statusCode = 200;
      res.setHeader(type, json);
      return res.end(JSON.stringify(users));
    } catch (err) {
      res.writeHead(500, { [type]: json });
      return res.end(
        JSON.stringify({
          error: "Server Error for GET all",
          message: err.message,
        }),
      );
    }
  }

  //GET: single user
  if (req.url.startsWith("/users/") && req.method === "GET") {
    try {
      const id = Number(req.url.split("/")[2]);

      // 🛡️ Validate id
      if (!id || isNaN(id)) {
        res.writeHead(400, { [type]: json });
        return res.end(JSON.stringify({ error: "Invalid user ID" }));
      }

      const [rows] = await DB.execute("SELECT * FROM users WHERE id = ?", [id]);

      // 🛡️ Handle not found
      if (rows.length === 0) {
        res.writeHead(404, { [type]: json });
        return res.end(JSON.stringify({ error: "User not found" }));
      }

      res.statusCode = 200;
      res.setHeader(type, json);
      return res.end(JSON.stringify(rows[0]));
    } catch (err) {
      res.writeHead(500, { [type]: json });
      return res.end(
        JSON.stringify({
          error: "Server Error on GET specific",
          message: err.message,
        }),
      );
    }
  }

  //POST: Add user
  if (req.url === "/users" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk; // collect data
    });

    req.on("end", async () => {
      try {
        const data = JSON.parse(body);
        const { name, email, age } = data;

        // 🛡️ Validate required fields
        if (!name || !email || !age) {
          res.writeHead(400, { [type]: json });
          return res.end(
            JSON.stringify({ error: "name, email, and age are required" }),
          );
        }

        const query = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";
        const [result] = await DB.execute(query, [name, email, age]);

        res.statusCode = 201;
        res.setHeader(type, json);
        return res.end(
          JSON.stringify({
            message: "User added",
            newUser: {
              id: result.insertId,
              name,
              email,
              age,
            },
          }),
        );
      } catch (err) {
        res.writeHead(500, { [type]: json });
        return res.end(
          JSON.stringify({
            error: "Server Error on POST",
            message: err.message,
          }),
        );
      }
    });
    return; // ✅ prevent fall-through to 404
  }

  //DELETE: delete a user
  if (req.url.startsWith("/users/") && req.method === "DELETE") {
    try {
      const id = Number(req.url.split("/")[2]);

      // 🛡️ Validate id
      if (!id || isNaN(id)) {
        res.writeHead(400, { [type]: json });
        return res.end(JSON.stringify({ error: "Invalid user ID" }));
      }

      const [result] = await DB.execute("DELETE FROM users WHERE id = ?", [id]);
      if (result.affectedRows === 0) {
        res.statusCode = 404;
        res.setHeader(type, json);
        return res.end(JSON.stringify({ error: "User not found" }));
      }
      res.statusCode = 200;
      res.setHeader(type, json);
      return res.end(JSON.stringify({ message: "User deleted" }));
    } catch (err) {
      res.writeHead(500, { [type]: json });
      return res.end(
        JSON.stringify({
          error: "Server Error on DELETE",
          message: err.message,
        }),
      );
    }
  }

  // 👉 Route not found
  res.writeHead(404, { [type]: json });
  res.end(JSON.stringify({ error: "Route Not Found" }));
});

server.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});


testDB();
