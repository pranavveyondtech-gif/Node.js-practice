import http from "http";
import fs from "fs";

const contentType = "Content-Type";
const appJSON = "application/json";

let users = JSON.parse(fs.readFileSync("users.json"));

const server = http.createServer((req, res) => {
  if (req.url === "/users" && req.method === "GET") {
    res.setHeader(contentType, appJSON);
    res.end(JSON.stringify(users));
  } else if (req.url.startsWith("/users/") && req.method === "GET") {
    const id = Number(req.url.split("/")[2]);

    const user = users.find((u) => u.id === id);

    if (!user) {
      res.statusCode = 404;
      res.setHeader(contentType, appJSON);
      res.end(JSON.stringify({ error: "User not found" }));
      return;
    }

    res.setHeader(contentType, appJSON);
    res.end(JSON.stringify(user));
  } else if (req.url === "/users" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const data = JSON.parse(body);

      const maxId = users.length ? Math.max(...users.map((u) => u.id)) : 0;

      const newUser = {
        id: maxId + 1,
        name: data.name,
      };

      users.push(newUser);

      fs.writeFileSync("users.json", JSON.stringify(users));

      res.statusCode = 201;
      res.setHeader(contentType, appJSON);
      res.end(JSON.stringify(newUser));
    });
  } else if (req.url.startsWith("/users/") && req.method === "DELETE") {
    const id = Number(req.url.split("/")[2]);

    const beforeLength = users.length;

    users = users.filter((u) => u.id !== id);

    if (beforeLength === users.length) {
      res.statusCode = 404;
      res.setHeader(contentType, appJSON);
      res.end(JSON.stringify({ error: "User not found" }));
      return;
    }

    fs.writeFileSync("users.json", JSON.stringify(users));

    res.statusCode = 200;
    res.setHeader(contentType, appJSON);
    res.end(JSON.stringify({ message: "User deleted successfully" }));
  } else {
    res.statusCode = 404;
    res.setHeader(contentType, appJSON);
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

server.listen(3000, () => {
  console.log("Server running on PORT 3000");
});
