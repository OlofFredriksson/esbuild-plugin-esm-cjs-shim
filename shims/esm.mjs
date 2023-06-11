import { fileURLToPath } from "url";
import path from "path";
import { createRequire } from "node:module";

const getFilename = () => fileURLToPath(import.meta.url);
const getDirname = () => path.dirname(getFilename());
const getRequire = () => createRequire(import.meta.url);

export const __dirname = /* @__PURE__ */ getDirname();
export const __filename = /* @__PURE__ */ getFilename();
export const shimRequire = /* @__PURE__ */ getRequire();
