import { generateThemeFiles } from "./theme-generator";

const root = process.cwd();
const outputDir = "static/css";

generateThemeFiles(root, outputDir);
