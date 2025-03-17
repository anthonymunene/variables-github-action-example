import * as path from 'path';
import * as fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { TOKENS_DIR } from './variables.js'

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


const isBrandFile = (filename: string, brandName: string): boolean => {
  // Escape special regex characters in the brand name
  const escapedBrandName = brandName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Create a regex pattern that matches "brands.{exactBrandName}.json"
  const pattern = new RegExp(`^brands\\.${escapedBrandName}\\.json$`);

  // Test if the filename matches the pattern
  return pattern.test(filename);
};

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
