import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: false,
  format: ["cjs"],
  minify: false,
  splitting: false,
  silent: true,
  outDir: "dist",
  target: ["node14"],
  esbuildOptions: (options) => {
    options.footer = {
      js: "module.exports = module.exports.default",
    };
  },
  entry: {
    commitlint: "src/commitlint/index.ts",
    cz: "src/cz/index.ts",
    "semantic-release": "src/semantic-release/index.ts",
  },
});
