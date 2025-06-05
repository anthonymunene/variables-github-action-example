export const BRANDS = ['lloyds', 'bos'] as const;
export const PLATFORMS = [
    {
        name: 'ts',
        transformGroup: 'js',
        format: 'javascript/es6',
        fileExtension: 'ts',
        enabled: true,
    },
] as const;
export const TOKENS_DIR = 'src/tokens';
export const BUILD_DIR = 'build';
export const DESIGN_SYSTEM_NAME = 'Ascot';
export const BASE_FONT_SIZE = 16;

export const EXCLUDED_COLLECTIONS = ['content', 'System', 'comms', 'wireframe'];
export const EXCLUDED_VARIABLE_CATEGORIES = ['comms', 'system', 'ascot', 'archive', 'content'];

export const VARIABLE_COLLECTIONS = {
    core: 'global',
    theme: 'theme',
    layout: 'screen',
};
export const BRANDS_DIR = '../../../build';
