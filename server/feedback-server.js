#!/usr/bin/env node

const fs = require("fs");
const http = require("http");
const path = require("path");
const { URL } = require("url");

const ROOT_DIR = path.resolve(__dirname, "..");
const DIST_DIR = path.join(ROOT_DIR, "dist");
const FEEDBACK_DIR = path.join(ROOT_DIR, "feedback-data");
const HOST = process.env.HOST || "0.0.0.0";
const PORT = Number(process.env.PORT || 4173);
const BODY_LIMIT = 1024 * 1024;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".map": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

if (!fs.existsSync(DIST_DIR)) {
  console.error("[feedback-server] dist directory not found. Run `npm run build` first.");
  process.exit(1);
}

fs.mkdirSync(FEEDBACK_DIR, { recursive: true });

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function sendJson(res, statusCode, payload) {
  setCorsHeaders(res);
  const text = JSON.stringify(payload);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(text),
  });
  res.end(text);
}

function sanitizeText(value, maxLen = 2000) {
  if (typeof value !== "string") {
    return "";
  }
  return value.replace(/\r\n/g, "\n").trim().slice(0, maxLen);
}

function receiveBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let totalLength = 0;

    req.on("data", (chunk) => {
      totalLength += chunk.length;
      if (totalLength > BODY_LIMIT) {
        reject(new Error("Payload too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });

    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", (err) => reject(err));
  });
}

async function handleFeedback(req, res) {
  if (req.method === "OPTIONS") {
    setCorsHeaders(res);
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 405, { ok: false, error: "Method not allowed" });
    return;
  }

  try {
    const rawBody = await receiveBody(req);
    const parsed = JSON.parse(rawBody || "{}");

    const message = sanitizeText(parsed.message, 6000);
    if (message.length < 8) {
      sendJson(res, 400, {
        ok: false,
        error: "Feedback message should be at least 8 characters.",
      });
      return;
    }

    const now = new Date();
    const entry = {
      id: `${now.getTime()}-${Math.random().toString(16).slice(2, 10)}`,
      createdAt: now.toISOString(),
      lang: sanitizeText(parsed.lang, 8) || "unknown",
      name: sanitizeText(parsed.name, 120),
      contact: sanitizeText(parsed.contact, 180),
      page: sanitizeText(parsed.page, 300),
      message,
      userAgent: sanitizeText(req.headers["user-agent"] || "", 400),
      ip:
        sanitizeText(req.headers["x-forwarded-for"] || "", 120) ||
        sanitizeText(req.socket.remoteAddress || "", 120),
    };

    const month = entry.createdAt.slice(0, 7);
    const filePath = path.join(FEEDBACK_DIR, `feedback-${month}.jsonl`);
    fs.appendFileSync(filePath, `${JSON.stringify(entry)}\n`, "utf8");

    sendJson(res, 201, { ok: true, id: entry.id, savedAt: entry.createdAt });
  } catch (error) {
    sendJson(res, 500, {
      ok: false,
      error: "Failed to save feedback on server.",
    });
  }
}

function safeResolveStaticPath(urlPath) {
  const decodedPath = decodeURIComponent(urlPath).replace(/\0/g, "");
  const normalizedPath = decodedPath === "/" ? "/index.html" : decodedPath;
  const resolvedPath = path.resolve(DIST_DIR, `.${normalizedPath}`);
  if (!resolvedPath.startsWith(DIST_DIR)) {
    return null;
  }
  return resolvedPath;
}

function serveStatic(req, res, pathname) {
  const resolvedPath = safeResolveStaticPath(pathname);
  if (!resolvedPath) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  let filePath = resolvedPath;
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    if (!path.extname(pathname)) {
      filePath = path.join(DIST_DIR, "index.html");
    } else {
      res.writeHead(404);
      res.end("Not Found");
      return;
    }
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";
  res.writeHead(200, { "Content-Type": contentType });
  fs.createReadStream(filePath).pipe(res);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  if (url.pathname === "/api/feedback") {
    await handleFeedback(req, res);
    return;
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405);
    res.end("Method Not Allowed");
    return;
  }

  serveStatic(req, res, url.pathname);
});

server.listen(PORT, HOST, () => {
  console.log(
    `[feedback-server] Running on http://${HOST}:${PORT} (feedback saved to ${FEEDBACK_DIR})`
  );
});
