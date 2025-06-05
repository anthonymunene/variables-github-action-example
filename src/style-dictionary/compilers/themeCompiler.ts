import * as fs from 'fs';
import * as path from 'path';
import { StyleDictionary } from 'style-dictionary-utils';
import { fileURLToPath } from 'url';

import { green } from '../../figma/utils';
import { getFilesFromDirectory } from '../../shared/utils';
import { BRANDS, BRANDS_DIR, TOKENS_DIR } from '../../variables';
import { createConfig } from '../config/createConfig';
import { getDependencyFiles, getThemeFromFileName, isThemeFile } from '../utils/file';
import { createIndexFiles } from '../utils/indexFiles';
import { getCategoriesFromTokenFile, removeExcludedCategories } from '../utils/token';
import { compileScreenTokens, getScreenTokenCategories } from './screenTokenCompiler';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);
const compileThemeAssets = async (theme: string, themeFilePath: string, dependencies: string[], buildPath: string): Promise<void> => {
    // eslint-disable-next-line no-console
    console.log(`Processing ${theme} from ${themeFilePath}`);

    // Get all categories from token file
    const categories = removeExcludedCategories(getCategoriesFromTokenFile(themeFilePath));
    //eslint-disable-next-line no-console
    console.log(`Found categories: ${categories.join(', ')}`);

    const themeJsDir = path.join(buildPath);

    fs.mkdirSync(themeJsDir, { recursive: true });

    const nonContentCategories = categories.filter((cat) => cat !== 'content');
    for (const category of nonContentCategories) {
        await compileCategory(theme, category, themeFilePath, dependencies, buildPath);
    }
    
    // Compile screen tokens separately - include theme file as dependency so screen tokens can reference theme tokens
    const screenDependencies = [...dependencies, themeFilePath];
    await compileScreenTokens(theme, screenDependencies, buildPath);
    
    // Add screen token categories to the index
    const allCategories = [...nonContentCategories, ...getScreenTokenCategories()];
    createIndexFiles(theme, allCategories, buildPath);
};

const compileCategory = async (theme: string, category: string, themeFilePath: string, dependencies: string[], buildPath: string): Promise<void> => {
    const config = createConfig(theme, category, themeFilePath, dependencies, buildPath);
    const sd = new StyleDictionary(config);
    await sd.hasInitialized;
    await sd.buildAllPlatforms();
    // eslint-disable-next-line no-console
    console.log(green(`✅ Generated ${category} outputs for ${theme}`));
};

export const compileAllThemeAssets = async (tokenDir: string): Promise<void> => {
    const themeFiles = getFilesFromDirectory(tokenDir).filter((file) => isThemeFile(file));
    const enabledThemes = themeFiles.filter((themeFile) => {
        const theme = getThemeFromFileName(themeFile);
        return BRANDS.includes(theme as (typeof BRANDS)[number]);
    });
    const processedThemes: string[] = [];

    await Promise.all(
        enabledThemes.map(async (themeFile) => {
            const theme = getThemeFromFileName(themeFile);
            const dependencies = getDependencyFiles();
            //eslint-disable-next-line no-console
            console.log(`Found ${dependencies.length} dependency files for ${theme}`);
            const brandsDir = path.resolve(currentDir, BRANDS_DIR);
            const brandsTokenpath = path.join(brandsDir, theme, 'token');
            fs.mkdirSync(brandsTokenpath, { recursive: true });
            await compileThemeAssets(theme, themeFile, dependencies, brandsTokenpath);
            if (!processedThemes.includes(theme)) {
                processedThemes.push(theme);
            }
        }),
    );

    // eslint-disable-next-line no-console
    console.log(`Processed ${processedThemes.length} themes: ${processedThemes.join(', ')}`);
};

export const startTokenCompilation = async (): Promise<void> => {
    const tokenDir = path.resolve(TOKENS_DIR);
    return compileAllThemeAssets(tokenDir);
};
