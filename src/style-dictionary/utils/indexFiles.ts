import { CreateIndexConfig, IndexCreatorFn, RootIndexCreatorFn } from '../types.js'
import path from 'path'
import fs from 'fs'
import { toCamelCase, toPascalCase } from './stringFormatters.js'

const createIndex = ({
                       outputPath, items,
                       commentPrefix = '', importFormat, exportFormat,
                       itemTransform = (item) => item,
                     }: CreateIndexConfig): void => {
  const imports = items.map(item => {
    const transformedItem = itemTransform(item)
    return importFormat(transformedItem, item)
  })

  const exports = items.map((item, index, array) => {
    const transformedItem = itemTransform(item)
    return exportFormat(transformedItem, index, array)
  })

  const content = [
    `${commentPrefix}`,
    '',
    ...imports,
    '',
    'export {',
    ...exports,
    '};',
    '',
  ].join('\n')

  const directory = path.dirname(outputPath)
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true })
  }

  fs.writeFileSync(outputPath, content)
}

const createCSSIndex: IndexCreatorFn = (brand, categories, buildPath) => {
  createIndex({
    type: 'css',
    outputPath: path.join(buildPath, brand, 'css', 'index.css'),
    items: categories,
    commentPrefix: `/* ${brand} token variables */`,
    importFormat: (category) => `@import './${category}.css';`,
    exportFormat: () => '', // CSS doesn't need exports section, we'll filter this out
  })
}

const createJSIndex: IndexCreatorFn = (brand, categories, buildPath) => {
  createIndex({
    type: 'js',
    outputPath: path.join(buildPath, brand, 'js', 'index.js'),
    items: categories,
    commentPrefix: `// ${brand} tokens index`,
    importFormat: (category) => `import * as ${toCamelCase(category)}Tokens from './${category}';`,
    exportFormat: (category, index, array) =>
      `  ${toCamelCase(category)}Tokens${index < array.length - 1 ? ',' : ''}`,
    itemTransform: toCamelCase,
  })
}

const createTSIndex: IndexCreatorFn = (brand, categories, buildPath) => {
  createIndex({
    type: 'ts',
    outputPath: path.join(buildPath, brand, 'js', 'index.d.ts'),
    items: categories,
    commentPrefix: `// ${brand} tokens type definitions`,
    importFormat: (category) => `import { ${toPascalCase(category)}Tokens } from './${category}';`,
    exportFormat: (category, index, array) =>
      `  ${toPascalCase(category)}Tokens${index < array.length - 1 ? ',' : ''}`,
    itemTransform: toPascalCase,
  })
}

export const createIndexFiles: IndexCreatorFn = (brand, categories, buildPath) => {
  createCSSIndex(brand, categories, buildPath)
  createJSIndex(brand, categories, buildPath)
  createTSIndex(brand, categories, buildPath)
}

export const createRootIndex: RootIndexCreatorFn = (brands, buildPath) => {
  const rootJsDir = path.join(buildPath, 'js')
  fs.mkdirSync(rootJsDir, { recursive: true })

  createIndex({
    type: 'js',
    outputPath: path.join(rootJsDir, 'index.js'),
    items: brands,
    commentPrefix: '// All brand tokens',
    importFormat: (brand) => `import * as ${toCamelCase(brand)}Tokens from '../${brand}/js/index';`,
    exportFormat: (brand, index, array) =>
      `  ${toCamelCase(brand)}Tokens${index < array.length - 1 ? ',' : ''}`,
    itemTransform: toCamelCase,
  })

  createIndex({
    type: 'ts',
    outputPath: path.join(rootJsDir, 'index.d.ts'),
    items: brands,
    commentPrefix: '// All brand tokens type definitions',
    importFormat: (brand) => `import * as ${toCamelCase(brand)}Tokens from '../${brand}/js/index';`,
    exportFormat: (brand) => `  ${toCamelCase(brand)}Tokens`,
    itemTransform: toCamelCase,
  })
}