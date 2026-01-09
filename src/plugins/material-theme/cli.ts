import { generateThemeFiles } from "./theme-generator";

const root = process.cwd();
const outputDir = "static/assets/styles";

generateThemeFiles(root, outputDir);
