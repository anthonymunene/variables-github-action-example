import { transformTypes } from 'style-dictionary/enums';
import { PlatformConfig, TransformedToken } from 'style-dictionary/types';
import fs from 'fs';
import path from 'path';
import { TOKENS_DIR } from '../../variables.js';

// Cache for screen tokens to avoid reading files multiple times
let screenTokenCache: Record<string, any> = {};

// Load screen tokens into cache
function loadScreenTokens() {
    if (Object.keys(screenTokenCache).length === 0) {
        const screenDir = path.join(TOKENS_DIR, 'screen');
        const mobileFile = path.join(screenDir, 'screensize.mobile.json');
        const desktopFile = path.join(screenDir, 'screensize.desktop.json');
        
        try {
            if (fs.existsSync(mobileFile)) {
                screenTokenCache.mobile = JSON.parse(fs.readFileSync(mobileFile, 'utf-8'));
            }
            if (fs.existsSync(desktopFile)) {
                screenTokenCache.desktop = JSON.parse(fs.readFileSync(desktopFile, 'utf-8'));
            }
        } catch (error) {
            console.error('Error loading screen tokens:', error);
        }
    }
    return screenTokenCache;
}

// Extract value from nested token structure
function getTokenValue(obj: any, path: string[]): any {
    let current = obj;
    for (const key of path) {
        if (current && typeof current === 'object' && key in current) {
            current = current[key];
        } else {
            return undefined;
        }
    }
    // If we have a token object with $value, return that
    if (current && typeof current === 'object' && '$value' in current) {
        return current.$value;
    }
    return current;
}

// Check if a reference points to a screen token
function isScreenTokenReference(value: string): boolean {
    if (typeof value !== 'string' || !value.startsWith('{') || !value.endsWith('}')) {
        return false;
    }
    
    const refPath = value.slice(1, -1); // Remove { and }
    const parts = refPath.split('.');
    
    // Screen tokens start with: display, layout, controls, space, size, radius, type
    // Or they might be prefixed with 'screen.mobile.' or 'screen.desktop.'
    const screenCategories = ['display', 'layout', 'controls', 'space', 'size', 'radius', 'type'];
    
    if (parts[0] === 'screen' && (parts[1] === 'mobile' || parts[1] === 'desktop')) {
        // Reference like {screen.mobile.display.screen-width}
        return true;
    }
    
    return screenCategories.includes(parts[0]);
}

// Resolve screen token reference based on platform
function resolveScreenToken(reference: string, platform?: string): any {
    const screenTokens = loadScreenTokens();
    
    // Extract the reference path (remove { and })
    const refPath = reference.slice(1, -1);
    const parts = refPath.split('.');
    
    // Check if the reference already includes platform prefix
    let actualParts = parts;
    let targetPlatform = platform === 'desktop' ? 'desktop' : 'mobile';
    
    if (parts[0] === 'screen' && (parts[1] === 'mobile' || parts[1] === 'desktop')) {
        // Reference like {screen.mobile.display.screen-width}
        targetPlatform = parts[1];
        actualParts = parts.slice(2); // Remove 'screen' and platform prefix
    }
    
    // Try to find the value in the appropriate screen token file
    const tokens = screenTokens[targetPlatform];
    if (!tokens) {
        console.warn(`No screen tokens found for ${targetPlatform}`);
        return reference;
    }
    
    const value = getTokenValue(tokens, actualParts);
    if (value !== undefined) {
        return value;
    }
    
    // If not found in platform-specific, try the other platform as fallback
    const fallbackSize = targetPlatform === 'mobile' ? 'desktop' : 'mobile';
    const fallbackTokens = screenTokens[fallbackSize];
    if (fallbackTokens) {
        const fallbackValue = getTokenValue(fallbackTokens, actualParts);
        if (fallbackValue !== undefined) {
            console.warn(`Screen token ${reference} not found in ${targetPlatform}, using ${fallbackSize} value`);
            return fallbackValue;
        }
    }
    
    console.warn(`Screen token reference ${reference} could not be resolved`);
    return reference;
}

export const screenTokenResolver = {
    name: 'screen-token-resolver',
    type: transformTypes.value,
    transitive: true,
    filter: (token: TransformedToken) => {
        // Check if the token value contains a screen token reference
        const value = token.$value || token.value;
        return typeof value === 'string' && isScreenTokenReference(value);
    },
    transform: (token: TransformedToken, config: PlatformConfig) => {
        const value = token.$value || token.value;
        
        // Get platform from config
        const platform = config.options?.platform || 'mobile';
        
        // Resolve the screen token reference
        return resolveScreenToken(value, platform);
    },
};