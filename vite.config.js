import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function storeBackendPlugin() {
  return {
    name: "store-backend-plugin",
    configureServer(server) {
      // 1. Endpoint to update books or entire store in public/data/
      server.middlewares.use("/api/data/save", (req, res) => {
        if (req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk;
          });
          req.on("end", () => {
            try {
              const parsed = JSON.parse(body);
              const dataDir = path.resolve(__dirname, "public/data");
              if (!fs.existsSync(dataDir)) {
                fs.mkdirSync(dataDir, { recursive: true });
              }

              if (parsed.books) {
                fs.writeFileSync(
                  path.join(dataDir, "books.json"),
                  JSON.stringify(parsed.books, null, 2),
                  "utf-8"
                );
              }
              if (parsed.storeData) {
                fs.writeFileSync(
                  path.join(dataDir, "storeData.json"),
                  JSON.stringify(parsed.storeData, null, 2),
                  "utf-8"
                );
              }

              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ success: true, message: "Saved to JSON successfully" }));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
        } else {
          res.statusCode = 405;
          res.end("Method Not Allowed");
        }
      });

      // 2. Endpoint to upload image and save to public/images/books/
      server.middlewares.use("/api/upload-image", (req, res) => {
        if (req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk;
          });
          req.on("end", () => {
            try {
              const { dataUrl, fileName } = JSON.parse(body);
              if (!dataUrl) {
                throw new Error("No image data provided");
              }

              const uploadDir = path.resolve(__dirname, "public/images/books");
              if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
              }

              // Extract base64 data & mime type
              const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
              if (!matches || matches.length !== 3) {
                throw new Error("Invalid base64 image data");
              }

              const ext = matches[1].split("/")[1] || "png";
              const safeExt = ext.replace(/[^a-z0-9]/gi, "");
              const baseName = (fileName || `book-${Date.now()}`)
                .replace(/\.[^/.]+$/, "")
                .replace(/[^a-z0-9-_]/gi, "_");
              const savedFilename = `${baseName}-${Date.now()}.${safeExt}`;
              const filePath = path.join(uploadDir, savedFilename);

              const buffer = Buffer.from(matches[2], "base64");
              fs.writeFileSync(filePath, buffer);

              const publicUrl = `/images/books/${savedFilename}`;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ success: true, url: publicUrl, filename: savedFilename }));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
        } else {
          res.statusCode = 405;
          res.end("Method Not Allowed");
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), storeBackendPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
