# Node.js Basics

## 1. Node.js Basics
Node.js allows you to run JavaScript outside the browser. It is commonly used for:
- File system operations.
- Creating web servers and APIs.
- Connecting to databases.

---

## 2. Node.js Architecture
Node.js uses a **single-threaded**, **event-driven**, and **non-blocking I/O** architecture.

### How it Works (The Event Loop)
1. **Client Request:** Added to the **Event Queue**.
2. **Event Loop:** Continuously checks the queue and picks up requests.
3. **Processing:**
   - **Non-blocking (Simple) tasks:** Handled immediately by the main thread.
   - **Blocking (Complex) tasks:** Offloaded to the **Thread Pool** (Libuv).
4. **Response:** Once tasks complete, callbacks are placed in the **Callback Queue**, processed by the Event Loop, and sent back to the client.

> [!NOTE]
> Node.js manages execution using **Microtasks** and **Macrotasks** queues to prioritize operations.

---

## 3. Module System
Node supports two module formats. Configure this in `package.json` using `"type": "commonjs"` or `"type": "module"`.

| Feature | CommonJS (Default/Traditional) | ES Modules (Modern) |
| :--- | :--- | :--- |
| **Syntax** | `const fs = require("fs")` | `import fs from "fs"` |
| **File Ext** | `.js`, `.cjs` | `.js`, `.mjs` |

---

## 4. Core Built-in Modules
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

---

### HTTP / HTTPS Module
**Key Features:**
- Create HTTP servers to handle requests and send responses.
- Make HTTP requests to other servers.
- Handle different HTTP methods (`GET`, `POST`, `PUT`, `DELETE`, etc.).
- Work with request and response headers.

#### Understanding the Code:
- `http.createServer()` - Creates a new HTTP server instance.
- The callback function is executed for each request with two parameters:
  - `req` - The request object (`http.IncomingMessage`).
  - `res` - The response object (`http.ServerResponse`).
- `res.writeHead()` - Sets the response status code and headers.
- `res.end()` - Sends the response and ends the connection.
- `server.listen()` - Starts the server on the specified port.

---

### Node.js Event System (EventEmitter)
- Node.js uses event-driven architecture (code reacts when events happen).
- `EventEmitter` is the core class used to create and manage events.

#### Setup:
1. **Import EventEmitter:**
   ```javascript
   import EventEmitter from "events";
   ```
2. **Create emitter:**
   ```javascript
   const emitter = new EventEmitter();
   ```

#### Main Methods:
1. **Listen to event:** -   Runs the handler when the event occurs.
   ```javascript
   emitter.on("eventName", handlerFunction);
   ```
 
2. **Emit event:** - Triggers the event.
   ```javascript
   emitter.emit("eventName");
   ```
   
3. **Pass data with events:** - Listener receives it as parameter.
   ```javascript
   emitter.emit("login", "Pranav");
   ```
   
4. **Multiple listeners:** - One event can have multiple handlers, all will run when event is emitted.
   One event can have multiple handlers, all will run when event is emitted.

**Flow:** Register listener → Emit event → Listener executes

**Browser vs Node Comparison:**
- **Browser:** `addEventListener("click", handler)` ≈ **Node:** `emitter.on("eventName", handler)`
- **Browser:** `dispatchEvent` ≈ **Node:** `emitter.emit`

#### Mini Summary:
1. `EventEmitter` → class used to create events.
2. `on()` → register a listener.
3. `emit()` → trigger an event.
4. Events can send data.
5. One event can have multiple listeners.
6. Every `emit()` triggers the listeners again.
7. `off('event', listener)` → remove the listener when no longer needed.