import { StyleDictionary } from 'style-dictionary-utils'
import { logBrokenReferenceLevels, logVerbosityLevels, logWarningLevels } from 'style-dictionary/enums'
import { BRANDS, PLATFORM } from './src/variables.js'
import { Brand } from './src/types.js'


// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED
function getStyleDictionaryConfig(brand: Brand) {
  return {
    log: {
      warnings: logWarningLevels.warn, // 'warn' | 'error' | 'disabled'
      verbosity: logVerbosityLevels.verbose, // 'default' | 'silent' | 'verbose'
      errors: {
        brokenReferences: logBrokenReferenceLevels.throw, // 'throw' | 'console'
      },
    },
    source: [
      `tokens_new/brands.*.json`,
      `tokens_new/core-*.mode1.json`,
      `tokens_new/responsive.desktop.json`,
      `tokens_new/responsive.mobile.json`,
      'tokens_new/scale.mode1.json',
      'tokens_new/.ds.mode1.json',
      'tokens_new/.thirdpartylogos.mode1.json',


    ],
    platforms: {
      js: {
        buildPath: `build/${brand}/js/`,
        transformGroup: 'js',
        files: [
          {
            destination: 'colorpalette.js',
            format: 'javascript/es6',
          },
        ],
      },
      css: {
        buildPath: `build/${brand}/css/`,
        transformGroup: 'css',
        files: [
          {
            destination: 'colors.css',
            format: 'css/advanced',
            options: {
              outputReferences: true,
            },
          },
        ],
      },
    },
  }
}


console.log('Build started...')

// PROCESS THE DESIGN TOKENS FOR THE DIFFERENT BRANDS AND PLATFORMS
try {
  BRANDS.map(function(brand) {
    PLATFORM.map(async function(platform) {
      console.log('\n==============================================')
      console.log(`\nProcessing: [${platform}] [${brand}]`)

      const myStyleDictionary = new StyleDictionary()
      const sd = await myStyleDictionary.extend(getStyleDictionaryConfig(brand))

      sd.buildPlatform(platform)
    })
  })

  console.log('\n==============================================')
  console.log('\nBuild completed!')
} catch (e) {
  console.error(e)
}
