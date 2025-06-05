import * as fs from 'fs';
import * as path from 'path';
import { StyleDictionary } from 'style-dictionary-utils';

import { green } from '../../figma/utils';
import { TOKENS_DIR } from '../../variables';
import { createConfig } from '../config/createConfig';

// Process screen tokens for a specific brand
export const compileScreenTokens = async (theme: string, dependencies: string[], buildPath: string): Promise<void> => {
    const screenDir = path.join(TOKENS_DIR, 'screen');
    const mobileFile = path.join(screenDir, 'screensize.mobile.json');
    const desktopFile = path.join(screenDir, 'screensize.desktop.json');
    
    // Check if screen token files exist
    if (!fs.existsSync(mobileFile) || !fs.existsSync(desktopFile)) {
        console.warn(`Screen token files not found for ${theme}`);
        return;
    }
    
    console.log(`\n🖥️  Processing screen tokens for ${theme}`);
    
    // Read and merge screen tokens
    const mobileTokens = JSON.parse(fs.readFileSync(mobileFile, 'utf-8'));
    const desktopTokens = JSON.parse(fs.readFileSync(desktopFile, 'utf-8'));
    
    // Fix broken references in desktop tokens before merging
    const fixBrokenReferences = (tokens: any): any => {
        const fixed = JSON.parse(JSON.stringify(tokens)); // Deep clone
        
        // Remove known broken references - these seem to be placeholders
        if (fixed.type?.title?.large?.size?.$value === '{type.styles.title.fixed.large.size}') {
            // Set a default value instead of broken reference
            fixed.type.title.large.size.$value = 24; // Default large title size
        }
        if (fixed.type?.title?.large?.['line-height']?.$value === '{type.styles.title.fixed.large.line-height}') {
            // Set a default value instead of broken reference  
            fixed.type.title.large['line-height'].$value = 32; // Default large title line height
        }
        
        return fixed;
    };
    
    // Create a merged screen token structure
    const mergedScreenTokens = {
        screen: {
            mobile: mobileTokens,
            desktop: fixBrokenReferences(desktopTokens)
        }
    };
    
    // Write merged tokens to a temporary file
    const tempDir = path.join(TOKENS_DIR, '.temp');
    fs.mkdirSync(tempDir, { recursive: true });
    const tempScreenFile = path.join(tempDir, `screen.${theme}.json`);
    fs.writeFileSync(tempScreenFile, JSON.stringify(mergedScreenTokens, null, 2));
    
    console.log(`📝 Created temporary screen token file: ${tempScreenFile}`);
    
    try {
        // Compile screen tokens as a category
        const config = createConfig(theme, 'screen', tempScreenFile, dependencies, buildPath);
        const sd = new StyleDictionary(config);
        await sd.hasInitialized;
        await sd.buildAllPlatforms();
        
        console.log(green(`✅ Generated screen outputs for ${theme}`));
    } finally {
        // Clean up temporary file
        if (fs.existsSync(tempScreenFile)) {
            fs.unlinkSync(tempScreenFile);
        }
        // Remove temp directory if empty
        const tempDirContents = fs.readdirSync(tempDir);
        if (tempDirContents.length === 0) {
            fs.rmdirSync(tempDir);
        }
    }
};

// Get categories from screen tokens (for index file generation)
export const getScreenTokenCategories = (): string[] => {
    return ['screen'];
};