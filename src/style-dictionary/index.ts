import { Config } from 'style-dictionary'
import { StyleDictionary } from 'style-dictionary-utils'
import * as fs from 'fs'
import * as path from 'path'
import { BASE_FONT_SIZE, BUILD_DIR, TOKENS_DIR } from '../variables.js'
import { getDependencyFiles, getThemeFromFileName, isThemeFile } from './utils/file.js'
import { createIndexFiles, createRootIndex } from './utils/indexFiles.js'
import { getCategoriesFromTokenFile, removeExcludedCategories } from './utils/token.js'
import {
  formatCSSVariablesByCategory,
  formatJSVariablesByCategory,
} from './formatters/index.js'
import { logBrokenReferenceLevels, logVerbosityLevels, logWarningLevels } from 'style-dictionary/enums'
import { sizeToRem } from './transformers/index.js'
import { getFilesFromDirectory } from '../shared/utils/index.js'


// Register custom formats for Style Dictionary
StyleDictionary.registerFormat(formatCSSVariablesByCategory)

StyleDictionary.registerFormat(formatJSVariablesByCategory)

StyleDictionary.registerTransform(sizeToRem)


async function processThemeTokens(theme: string, themeFilePath: string, dependencies: string[], buildPath: string): Promise<void> {
  console.log(`Processing ${theme} from ${themeFilePath}`)

  // Get all categories from token file
  const categories = removeExcludedCategories(getCategoriesFromTokenFile(themeFilePath))
  console.log(`Found categories: ${categories.join(', ')}`)

  // Create directories for this theme
  const themeCssDir = path.join(buildPath, theme, 'css')
  const themeJsDir = path.join(buildPath, theme, 'js')

  fs.mkdirSync(themeCssDir, { recursive: true })
  fs.mkdirSync(themeJsDir, { recursive: true })

  const nonContentCategories = categories.filter(cat => cat !== 'content')

  for (const category of nonContentCategories) {
    const config: Config = {
      log: {
        warnings: logWarningLevels.warn,
        verbosity: logVerbosityLevels.verbose,
        errors: {
          brokenReferences: logBrokenReferenceLevels.throw,
        },
      },
      source: [themeFilePath],
      include: dependencies,
      platforms: {
        css: {
          transformGroup: 'css',
          transforms: ['sizeToRem'],
          basePxFontSize: BASE_FONT_SIZE,
          buildPath: `${buildPath}/${theme}/css/`,
          files: [{
            destination: `${category}.css`,
            format: 'css/variables-by-category',
            options: {
              outputReferences: true,
            },
          }],
          options: {
            category: category,
            theme,
          },
        },
        js: {
          transformGroup: 'js',
          transforms: ['sizeToRem', 'attribute/cti'],
          buildPath: `${buildPath}/${theme}/js/`,
          basePxFontSize: BASE_FONT_SIZE,
          files: [{
            destination: `${category}.js`,
            format: 'javascript/module-by-category',
          }],
          options: {
            category: category,
            theme,
          },
        },
      },
    }

    // Run Style Dictionary for this category
    const sd = new StyleDictionary(config)
    await sd.hasInitialized
    await sd.buildAllPlatforms()
    console.log(`Generated ${category} outputs for ${theme}`)
  }

  // Create index files for CSS and JS
  createIndexFiles(theme, nonContentCategories, buildPath)
}


// Process all token files
async function processAllTokens(tokenDir: string, buildPath: string): Promise<void> {


  const themeFiles = getFilesFromDirectory(tokenDir)
    .filter(file => isThemeFile(file))
  const processedThemes: string[] = []

  await Promise.all(
    themeFiles.map(async themeFile => {
      const theme = getThemeFromFileName(themeFile)
      const dependencies = getDependencyFiles()
      console.log(`Found ${dependencies.length} dependency files for ${theme}`)
      await processThemeTokens(theme, themeFile, dependencies, buildPath)
      if (!processedThemes.includes(theme)) {
        processedThemes.push(theme)
      }
    }))

  createRootIndex(processedThemes, buildPath)

  console.log(`Processed ${processedThemes.length} themes: ${processedThemes.join(', ')}`)
}

async function main() {
  const tokenDir = path.resolve(TOKENS_DIR)
  const buildPath = path.resolve(BUILD_DIR)

  processAllTokens(tokenDir, buildPath)
}

main()
