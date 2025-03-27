import fs from 'fs'
import { TOKENS_DIR } from '../../variables.js'
import path from 'path'
import { toCamelCase, toPascalCase } from './stringFormatters.js'
import { getFilesFromDirectory } from '../../shared/utils/index.js'

const createCoreFileRegex = (theme: string) => {
  // Escape any special regex characters in the brand name
  const escapedBrandName = theme.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  return new RegExp(`src\\\/([a-z]+)\\\/core\\\/((core${escapedBrandName}+|global)\\.mode1\\.json)$`, '')
}

const createResponsiveFileRegex = () => new RegExp('(^|/)responsive\\.(desktop|mobile)\\.json$')

const createThemeFileRegex = () => new RegExp('theme\.([a-zA-Z0-9]+)\.json$')

export function getThemeFromFileName(filePath: string): string {
  const fileName = path.basename(filePath)
  const themeRegex = createThemeFileRegex()
  const match = fileName.match(themeRegex)

  if (match && match[1]) {
    return match[1].toLowerCase()
  }

  return 'no match'
}

export function getDependencyFiles(theme: string): string[] {
  const isCore = (file: string) => createCoreFileRegex(theme).test(file)
  const isResponsive = (file: string) => createResponsiveFileRegex().test(file)
  return getFilesFromDirectory(TOKENS_DIR)
    .filter(file => file.endsWith('.json') && (isCore(file)) || isResponsive(file))
}


// Check if a file is a brand file (brands.brandname.json)
export function isThemeFile(filePath: string): boolean {
  const fileName = path.basename(filePath)
  return /^theme\.(?!(wireframe|thirdparty|system)\.json$)[^.]+\.json$/.test(fileName)
}

export const getBrandFile = (brand: string) => {
  return fs.readdirSync(TOKENS_DIR)
    .filter(file => file.endsWith('.json') && isThemeFile(file) && file.includes(brand))
    .map(file => path.join(TOKENS_DIR, file))
}


export const extractBrandName = (filename: string) => {
  // Using a regex pattern to match "theme.BRANDNAME.json"
  const regex = /(?:^|.*\/)theme\.([^.]+)\.json$/

  // Execute the regex against the filename
  const match = regex.exec(filename)

  // If there's a match, return the captured group (the brand name)
  // Otherwise return an empty string
  return match ? match[1] : ''
}

// Create index files to easily import all categories
export const createIndexFiles = (brand: string, categories: string[], buildPath: string) => {
  // Create CSS index file
  const cssIndexContent = [
    `/* ${brand} token variables */`,
    '',
    ...categories.map(category => `@import './${category}.css';`),
    '',
  ].join('\n')

  fs.writeFileSync(
    path.join(buildPath, brand, 'css', 'index.css'),
    cssIndexContent,
  )

  // Create JS index file
  const jsImports = categories.map(
    category => `import { ${toCamelCase(category)}Tokens } from './${category}';`,
  )

  const jsExports = categories.map(
    category => `  ${toCamelCase(category)}Tokens`,
  )

  const jsIndexContent = [
    `// ${brand} tokens index`,
    '',
    ...jsImports,
    '',
    'export {',
    ...jsExports,
    '};',
    '',
  ].join('\n')

  fs.writeFileSync(
    path.join(buildPath, brand, 'js', 'index.js'),
    jsIndexContent,
  )

  // Create TypeScript definition index file
  const tsImports = categories.map(
    category => `import { ${toPascalCase(category)}Tokens } from './${category}';`,
  )

  const tsExports = categories.map(
    category => `  ${toPascalCase(category)}Tokens`,
  )

  const tsIndexContent = [
    `// ${brand} tokens type definitions`,
    '',
    ...tsImports,
    '',
    'export {',
    ...tsExports,
    '};',
    '',
  ].join('\n')

  fs.writeFileSync(
    path.join(buildPath, brand, 'js', 'index.d.ts'),
    tsIndexContent,
  )
}

// Create a root index that imports from all brands
export const createRootIndex = (brands: string[], buildPath: string) => {
  const rootJsDir = path.join(buildPath, 'js')
  fs.mkdirSync(rootJsDir, { recursive: true })

  const jsImports = brands.map(
    brand => `import * as ${toCamelCase(brand)}Tokens from '../${brand}/js/index';`,
  )

  const jsExports = brands.map(
    brand => `  ${toCamelCase(brand)}Tokens`,
  )

  const jsIndexContent = [
    '// All brand tokens',
    '',
    ...jsImports,
    '',
    'export {',
    ...jsExports,
    '};',
    '',
  ].join('\n')

  fs.writeFileSync(
    path.join(rootJsDir, 'index.js'),
    jsIndexContent,
  )

  // Create TypeScript definition for root index
  const tsImports = brands.map(
    brand => `import * as ${toCamelCase(brand)}Tokens from '../${brand}/js/index';`,
  )

  const tsExports = brands.map(
    brand => `  ${toCamelCase(brand)}Tokens`,
  )

  const tsIndexContent = [
    '// All brand tokens type definitions',
    '',
    ...tsImports,
    '',
    'export {',
    ...tsExports,
    '};',
    '',
  ].join('\n')

  fs.writeFileSync(
    path.join(rootJsDir, 'index.d.ts'),
    tsIndexContent,
  )
}