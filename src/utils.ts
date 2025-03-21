import * as path from 'path';
import * as fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { TOKENS_DIR, BRANDS } from './variables.js'

const __filename = fileURLToPath(import.meta.url);


const currentDir = dirname(__filename);

const projectRoot = path.resolve(currentDir, '..');

export function green(msg: string) {

  return `\x1b[32m${msg}\x1b[0m`
}

export function brightRed(msg: string) {
  return `\x1b[1;31m${msg}\x1b[0m`
}

export function areSetsEqual<T>(a: Set<T>, b: Set<T>) {
  return a.size === b.size && [...a].every((item) => b.has(item))
}




// Function to get all the token files
const getTokenFiles = (): string[] => {
  const tokenDir = path.resolve(projectRoot, TOKENS_DIR);
  return fs.readdirSync(tokenDir)
    .filter((file: string) => file.endsWith('.json'))
    .map((file: string) => path.join(tokenDir, file));
};

export const getTokenCategories = (): string[] => {
  const categories: Set<string> = new Set();

  getTokenFiles().forEach((filePath: string) => {
    const tokens = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    Object.keys(tokens).forEach((category: string) => {
      if (typeof tokens[category] === 'object' && !Array.isArray(tokens[category])) {
        categories.add(category);
      }
    });
  });

  return Array.from(categories);
};

export function getBrandFromFilename(filePath: string): string {
  const fileName = path.basename(filePath);
  const match = fileName.match(/^brands\.([a-zA-Z0-9]+)\.json$/);

  if (match && match[1]) {
    return match[1].toLowerCase();
  }

  // Fallback for other formats
  for (const brand of BRANDS) {
    if (fileName.toLowerCase().includes(brand)) {
      return brand;
    }
  }

  return 'default';
}

// Check if a file is a brand file (brands.brandname.json)
export function isBrandFile(filePath: string): boolean {
  const fileName = path.basename(filePath);
  return  /^theme\.(?!(wireframe|thirdparty|system)\.json$)[^.]+\.json$/.test(fileName);
}
export const getBrandFile = (brand) => {
  return fs.readdirSync(TOKENS_DIR)
    .filter(file => file.endsWith('.json') && isBrandFile(file) && file.includes(brand))
    .map(file => path.join(TOKENS_DIR, file));
}


export const  extractBrandName = (filename) => {
  // Using a regex pattern to match "theme.BRANDNAME.json"
  const regex = /(?:^|.*\/)theme\.([^.]+)\.json$/;

  // Execute the regex against the filename
  const match = regex.exec(filename);

  // If there's a match, return the captured group (the brand name)
  // Otherwise return an empty string
  return match ? match[1] : '';
}
export function getDependencyFiles(tokenDir: string): string[] {
  return fs.readdirSync(tokenDir)
    .filter(file => file.endsWith('.json') && !isBrandFile(file))
    .map(file => path.join(tokenDir, file));
}