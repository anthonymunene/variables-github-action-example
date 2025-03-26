import * as fs from 'fs';
import * as path from 'path';
import { TOKENS_DIR } from '../variables.js'

/**
 * Gets all filenames from a directory recursively
 * @param directoryPath - The path to the directory
 * @returns Array of file paths
 */
function getFilesFromDirectory(directoryPath: string): string[] {
  try {
    // Get all files from the directory
    const files = fs.readdirSync(directoryPath);

    const fileArray = files
      .map(file => {
        const filePath = path.join(directoryPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
          // If it's a subdirectory, recursively get files
          return getFilesFromDirectory(filePath);
        } else {
          // If it's a file, return the path
          return filePath;
        }
      });

    // Flatten the array in case of nested directories
    return fileArray.flat();
  } catch (error) {
    console.error(`Error reading directory: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return [];
  }
}


// Get all filenames
const tokenFiles: string[] = getFilesFromDirectory(TOKENS_DIR).filter(tokenFile => tokenFile.includes('.json'));

// Export the array
export default tokenFiles;