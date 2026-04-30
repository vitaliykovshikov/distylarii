const fs = require("fs");
const path = require("path");

const root = __dirname;
const distDir = path.join(root, "dist");
const sourceHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const js = fs.readFileSync(path.join(root, "app.js"), "utf8");

const bundled = sourceHtml
  .replace(/<link rel="stylesheet" href="\.\/styles\.css(?:\?[^"]*)?">/, `<style>\n${css}</style>`)
  .replace(/<script src="\.\/app\.js(?:\?[^"]*)?"><\/script>/, `<script>\n${js}</script>`);

fs.mkdirSync(distDir, { recursive: true });
fs.writeFileSync(path.join(distDir, "index.html"), bundled);

console.log("Built dist/index.html");
