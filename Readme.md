# Node.js Basics

## 1️⃣ Understand What Node.js Is
Node.js lets you run JavaScript outside the browser.

Node can:
- Access files
- Create servers
- Connect to databases
- Build APIs

---

## What is Node.js Architecture?
Node.js uses a **single-threaded**, **event-driven** architecture that is designed to handle many connections at once, efficiently and without blocking the main thread.

This makes Node.js ideal for building scalable network applications, real-time apps, and APIs.

### Node.js Architecture Overview
Here is a simple breakdown of how Node.js processes requests:

1. **Client Request Phase**
   - Clients send requests to the Node.js server.
   - Each request is added to the Event Queue.

2. **Event Loop Phase**
   - The Event Loop continuously checks the Event Queue.
   - Picks up requests one by one in a loop.

3. **Request Processing**
   - Simple (non-blocking) tasks are handled immediately by the main thread.
   - Complex/blocking tasks are offloaded to the Thread Pool.

4. **Response Phase**
   - When blocking tasks complete, their callbacks are placed in the Callback Queue.
   - Event Loop processes callbacks and sends responses.

---

## Modules in Node.js
Modules are the building blocks of Node.js applications, allowing you to organize code into logical, reusable components. This improves code maintainability and reusability. In Node.js, any file with a `.js` extension is considered a module.

### CommonJS vs ES Modules
Node.js supports two module systems: CommonJS (traditional) and ES Modules (ECMAScript modules).

In your `package.json`, you set the project type. 
You can also use a start script to run your application:
```json
{
  "type": "commonjs", 
  "scripts": {
    "start": "node app.js"
  }
}
```

#### CommonJS Syntax
By default, or if you use `"type": "commonjs"`, Node uses CommonJS syntax:
```javascript
const fs = require("fs");
```

#### ES Modules Syntax
If you change to `"type": "module"`, you can use ES Modules:
```javascript
import fs from "fs";
```

---

## Core Built-in Modules
Node.js provides several built-in modules that are compiled into the binary. Here are some of the most commonly used ones:

- `fs` - File system operations
- `http` / `https` - HTTP server and client
- `path` - File path utilities
- `os` - Operating system utilities
- `events` - Event handling
- `util` - Utility functions
- `stream` - Stream handling
- `crypto` - Cryptographic functions
- `url` - URL parsing
- `querystring` - URL query string handling

### HTTP / HTTPS Module
**Key Features:**
- Create HTTP servers to handle requests and send responses.
- Make HTTP requests to other servers.
- Handle different HTTP methods (`GET`, `POST`, `PUT`, `DELETE`, etc.).
- Work with request and response headers.

**Understanding the Code**
http.createServer() - Creates a new HTTP server instance
The callback function is executed for each request with two parameters:
req - The request object (http.IncomingMessage)
res - The response object (http.ServerResponse)
res.writeHead() - Sets the response status code and headers
res.end() - Sends the response and ends the connection
server.listen() - Starts the server on the specified port