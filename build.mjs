import * as esbuild from "esbuild";
import { createServer } from "http";
import { readFileSync, existsSync } from "fs";
import { extname, join } from "path";

const isDev = process.argv.includes("--dev");

const buildOptions = {
  entryPoints: ["src/main.tsx"],
  bundle: true,
  outdir: "dist",
  format: "esm",
  target: "es2020",
  sourcemap: isDev,
  minify: !isDev,
  splitting: true,
};

if (isDev) {
  const ctx = await esbuild.context(buildOptions);
  await ctx.watch();

  const mimeTypes = {
    ".html": "text/html",
    ".js": "application/javascript",
    ".mjs": "application/javascript",
    ".css": "text/css",
    ".png": "image/png",
    ".svg": "image/svg+xml",
  };

  const server = createServer((req, res) => {
    let filePath = req.url === "/" ? "/public/index.html" : req.url;

    // Serve dist files
    const distPath = join("dist", filePath.replace(/^\/dist\//, ""));
    const publicPath = join("public", filePath.replace(/^\/public\//, ""));

    let resolvedPath;
    if (existsSync(distPath) && !filePath.startsWith("/public")) {
      resolvedPath = distPath;
    } else if (existsSync(publicPath)) {
      resolvedPath = publicPath;
    } else if (existsSync(join("public", "index.html"))) {
      resolvedPath = join("public", "index.html");
    }

    if (!resolvedPath) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    const ext = extname(resolvedPath);
    const contentType = mimeTypes[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType });
    res.end(readFileSync(resolvedPath));
  });

  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`Dev server running at http://localhost:${PORT}`);
  });
} else {
  await esbuild.build(buildOptions);
  console.log("Build complete.");
}
