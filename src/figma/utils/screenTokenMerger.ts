/**
 * @deprecated This file is no longer used. Screen token merging is now handled by
 * screenTokenCompiler.ts in the Style Dictionary compilation process.
 * 
 * Keeping this file for reference only. The new implementation:
 * - Creates temporary merged files during compilation
 * - Fixes broken references automatically
 * - Integrates directly with Style Dictionary
 * 
 * See: src/style-dictionary/compilers/screenTokenCompiler.ts
 */

import * as fs from 'fs';
import * as path from 'path';

import { TokensFile } from '../types.js';

/**
 * Merges mobile and desktop screen tokens into a single file with platform prefixes
 * @param tokensDir - The directory containing the token files
 * @deprecated Use screenTokenCompiler.ts instead
 */
export function mergeScreenTokens(tokensDir: string): void {
    const screenDir = path.join(tokensDir, 'screen');
    const mobileTokensPath = path.join(screenDir, 'screensize.mobile.json');
    const desktopTokensPath = path.join(screenDir, 'screensize.desktop.json');
    const mergedTokensPath = path.join(screenDir, 'screensize.json');

    // Check if both files exist
    if (!fs.existsSync(mobileTokensPath) || !fs.existsSync(desktopTokensPath)) {
        console.warn('Screen token files not found, skipping merge');
        return;
    }

    // Read both token files
    const mobileTokens: TokensFile = JSON.parse(fs.readFileSync(mobileTokensPath, 'utf-8'));
    const desktopTokens: TokensFile = JSON.parse(fs.readFileSync(desktopTokensPath, 'utf-8'));

    // Update internal references to include platform prefix
    const updatedMobileTokens = updateInternalReferences(mobileTokens, 'mobile');
    const updatedDesktopTokens = updateInternalReferences(desktopTokens, 'desktop');

    // Create merged structure
    const mergedTokens: TokensFile = {
        mobile: updatedMobileTokens,
        desktop: updatedDesktopTokens,
    };

    // Write merged file
    fs.writeFileSync(mergedTokensPath, JSON.stringify(mergedTokens, null, 2));
    console.log(`✅ Merged screen tokens saved to: ${mergedTokensPath}`);

    // Remove original files to avoid confusion
    fs.unlinkSync(mobileTokensPath);
    fs.unlinkSync(desktopTokensPath);
    console.log('✅ Original screen token files removed');
}


/**
 * Updates internal references within screen tokens to include platform prefix
 * @param tokens - The token structure to update
 * @param platform - The platform prefix (mobile or desktop)
 */
function updateInternalReferences(tokens: any, platform: 'mobile' | 'desktop'): any {
    if (typeof tokens !== 'object' || tokens === null) {
        return tokens;
    }

    const updated: any = {};

    for (const [key, value] of Object.entries(tokens)) {
        if (typeof value === 'object' && value !== null) {
            if ('$value' in value && typeof value.$value === 'string') {
                // This is a token with a potential reference
                const refValue = value.$value;
                if (refValue.startsWith('{') && refValue.endsWith('}')) {
                    const reference = refValue.slice(1, -1);
                    
                    // Check if this is an internal screen token reference
                    if (reference.startsWith('layout.') || 
                        reference.startsWith('display.') || 
                        reference.startsWith('controls.') || 
                        reference.startsWith('space.') || 
                        reference.startsWith('size.') || 
                        reference.startsWith('type.')) {
                        // Update to include platform prefix
                        updated[key] = {
                            ...value,
                            $value: `{${platform}.${reference}}`
                        };
                    } else {
                        // Keep external references as-is
                        updated[key] = value;
                    }
                } else {
                    updated[key] = value;
                }
            } else {
                // Recursively process nested objects
                updated[key] = updateInternalReferences(value, platform);
            }
        } else {
            updated[key] = value;
        }
    }

    return updated;
}