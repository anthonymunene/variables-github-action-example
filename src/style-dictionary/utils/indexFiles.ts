import fs from 'fs';
import path from 'path';

import { CreateIndexConfig, IndexCreatorFn, RootIndexCreatorFn } from '../types.js';

import { toCamelCase } from './stringFormatters.js';

const createIndex = ({ outputPath, items, commentPrefix = '', importFormat, exportFormat, itemTransform = (item) => item }: CreateIndexConfig): void => {
    const imports = items.map((item) => {
        const transformedItem = itemTransform(item);
        return importFormat(transformedItem, item);
    });

    const exports = items.map((item, index, array) => {
        const transformedItem = itemTransform(item);
        return exportFormat(transformedItem, index, array);
    });

    const content = [`${commentPrefix}`, '', ...imports, '', 'export {', ...exports, '};', ''].join('\n');

    const directory = path.dirname(outputPath);
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }

    fs.writeFileSync(outputPath, content);
};

const createJSIndex: IndexCreatorFn = (brand, categories, buildPath) => {
    createIndex({
        type: 'ts',
        outputPath: path.join(buildPath, 'index.ts'),
        items: categories,
        commentPrefix: `// ${brand} tokens index`,
        importFormat: (category) => `import * as ${toCamelCase(category)}Tokens from './${category}';`,
        exportFormat: (category, index, array) => `  ${toCamelCase(category)}Tokens${index < array.length - 1 ? ',' : ''}`,
        itemTransform: toCamelCase,
    });
};

export const createIndexFiles: IndexCreatorFn = (brand, categories, buildPath) => {
    createJSIndex(brand, categories, buildPath);
};

export const createRootIndex: RootIndexCreatorFn = (brands, buildPath) => {
    const rootJsDir = path.join(buildPath);
    fs.mkdirSync(rootJsDir, { recursive: true });

    createIndex({
        type: 'ts',
        outputPath: path.join(rootJsDir, 'index.ts'),
        items: brands,
        commentPrefix: '// All brand tokens',
        importFormat: (brand) => `import * as ${toCamelCase(brand)}Tokens from '../${brand}/js/index';`,
        exportFormat: (brand, index, array) => `  ${toCamelCase(brand)}Tokens${index < array.length - 1 ? ',' : ''}`,
        itemTransform: toCamelCase,
    });
};
