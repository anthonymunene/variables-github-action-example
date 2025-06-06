import fs from 'fs';
import path from 'path';

export const ensureDirectoryExists = (directory: string): void => {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
};

export const sanitizeFilename = (filename: string) => {
    //replaces spaces with hyphens and converts to lowercase
    return filename.replace(/\s+/g, '').replace(/\//g, '-').toLowerCase();
};

export const getFilesFromDirectory = (directoryPath: string): string[] => {
    try {
        const files = fs.readdirSync(directoryPath);

        const fileArray = files.map((file) => {
            const resolvedPath = path.resolve(directoryPath, file);
            const normalisedPath = path.normalize(resolvedPath);
            const filePath = normalisedPath.replace(/\\/g, '/');
            const stats = fs.statSync(filePath);

            if (stats.isDirectory()) {
                return getFilesFromDirectory(filePath);
            } else {
                return filePath;
            }
        });

        return fileArray.flat();
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Error reading directory: ${error instanceof Error ? error.message : 'Unknown error'}`);
        return [];
    }
};
