import { StyleDictionary } from 'style-dictionary-utils'
import { logBrokenReferenceLevels, logVerbosityLevels, logWarningLevels, formats } from 'style-dictionary/enums'
import { BRANDS, PLATFORMS } from './src/variables.js'
import { Brand, Platform } from './src/types.js'
import * as path from 'path';
import { fileURLToPath } from 'url';
import tokenFiles from './src/get_token_files.js'
import { getTokenCategories } from './src/utils.js'


// const getTokenFiles = (): string[] => {
//   const tokenDir = path.resolve(__dirname, 'tokens_new');
//   return fs.readdirSync(tokenDir)
//     .filter((file: string) => file.endsWith('.json'))
//     .map((file: string) => path.join(tokenDir, file));
// };


// Get all categories
const tokenCategories: string[] = getTokenCategories();

function getFiles(platform, brand) {
  return tokenCategories.map((tokenSet) => ({
    destination: `${tokenSet}.${platform.format}`,
    format: `${platform.format}`,
    filter: function(token){
      console.log(token)
    },
  }))
}

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED
function getStyleDictionaryConfig(platform: Platform, brand: Brand) {
  return {
    log: {
      warnings: logWarningLevels.warn, // 'warn' | 'error' | 'disabled'
      verbosity: logVerbosityLevels.verbose, // 'default' | 'silent' | 'verbose'
      errors: {
        brokenReferences: logBrokenReferenceLevels.throw, // 'throw' | 'console'
      },
    },
    source: tokenFiles,
    platforms: {
      // js: {
      //   buildPath: `build/${brand}/js/`,
      //   transformGroup: 'js',
      //   files: [
      //     {
      //       destination: 'colors.js',
      //       format: 'javascript/es6',
      //     },
      //   ],
      // },
      [platform.name]: {
        buildPath: `build/${brand}/${platform.fileExtension}/`,
        transformGroup: `css`,
        files: [          {
          destination: 'content.css',
          format: 'css/variables',
          filter: 'removeContent'
        },]
      },
    },
  }
}

StyleDictionary.registerParser({
  name: 'test',
  pattern: /\.json$/,
  parser: ({ filePath, contents }) => {
    const path = filePath
    const fileContents = contents
   // return JSON.parse(contents);
  },
});

StyleDictionary.registerFilter({
  name: 'removeContent',
  filter: (token, options): boolean => {

    return token.$type !== "content";
  }
});
console.log('Build started...')

// PROCESS THE DESIGN TOKENS FOR THE DIFFERENT BRANDS AND PLATFORMS
try {
  BRANDS.map(function(brand) {
    PLATFORMS.map(async function(platform) {
      console.log('\n==============================================')
      console.log(`\nProcessing: [${platform.name}] [${brand}]`)

      const myStyleDictionary = new StyleDictionary()
      const sd = await myStyleDictionary.extend(getStyleDictionaryConfig(platform, brand))

      sd.buildPlatform(platform.name)
    })
  })

  console.log('\n==============================================')
  console.log('\nBuild completed!')
} catch (e) {
  console.error(e)
}

// import StyleDictionary from 'style-dictionary';
// import * as path from 'path';
// import * as fs from 'fs';
// import { fileURLToPath } from 'url';
//
// // Get current directory in ESM
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
//
// // Types for Style Dictionary
// interface Property {
//   path: string[];
//   name: string;
//   value: any;
//   [key: string]: any;
// }
//
// interface Dictionary {
//   allProperties: Property[];
//   [key: string]: any;
// }
//
// interface FormatterArgs {
//   dictionary: Dictionary;
//   options?: any;
//   file?: { destination: string };
// }
//
// interface FilterArgs {
//   [key: string]: any;
// }
//
// // Function to get all the token files
// const getTokenFiles = (): string[] => {
//   const tokenDir = path.resolve(__dirname, 'tokens_new');
//   return fs.readdirSync(tokenDir)
//     .filter((file: string) => file.endsWith('.json'))
//     .map((file: string) => path.join(tokenDir, file));
// };
//
// // Function to get categories from token files
// const getCategories = (): string[] => {
//   const categories: Set<string> = new Set();
//
//   getTokenFiles().forEach((filePath: string) => {
//     const tokens = JSON.parse(fs.readFileSync(filePath, 'utf8'));
//     Object.keys(tokens).forEach((category: string) => {
//       if (typeof tokens[category] === 'object' && !Array.isArray(tokens[category])) {
//         categories.add(category);
//       }
//     });
//   });
//
//   return Array.from(categories);
// };
//
// // Get all categories
// const categories: string[] = getCategories();
//
// // Create a custom format for CSS variables
// StyleDictionary.registerFormat({
//   name: 'css/variables',
//   format: ({ dictionary, options }): string => {
//     const category = options?.category || '';
//     return `/**
//  * ${category} design tokens
//  * Generated with Style Dictionary
//  */
// :root {
// ${dictionary.allTokens
//       .filter(prop => prop.path[0] === category)
//       .map(prop => `  --${prop.name}: ${prop.value};`)
//       .join('\n')}
// }`;
//   }
// });
//
// // Create a filter to only include tokens from a specific category
// StyleDictionary.registerFilter({
//   name: 'isCategoryToken',
//   filter: (prop, options): boolean => {
//     return prop.path[0] === options.category;
//   }
// });
//
// // Create a config for each category
// const config: any = {
//   source: getTokenFiles(),
//   platforms: {}
// };
//
// // Add a platform configuration for each category
// categories.forEach((category: string) => {
//   config.platforms[category] = {
//     transformGroup: 'css',
//     buildPath: 'dist/css/',
//     files: [
//       {
//         destination: `${category}.css`,
//         format: 'css/variables',
//         filter: 'isCategoryToken',
//         options: {
//           category
//         }
//       }
//     ]
//   };
//   config.log = {
//     warnings: logWarningLevels.warn, // 'warn' | 'error' | 'disabled'
//     verbosity: logVerbosityLevels.verbose, // 'default' | 'silent' | 'verbose'
//     errors: {
//       brokenReferences: logBrokenReferenceLevels.throw, // 'throw' | 'console'
//     },
//   }
// });
//
// // // Build all platforms
// // const myStyleDictionary = new StyleDictionary()
// // const styleDictionary = await myStyleDictionary.extend(config);
// // styleDictionary.buildAllPlatforms();
// //
//
//
// // PROCESS THE DESIGN TOKENS FOR THE DIFFERENT BRANDS AND PLATFORMS
// try {
//   BRANDS.map(function(brand) {
//     PLATFORM.map(async function(platform) {
//       console.log('\n==============================================')
//       console.log(`\nProcessing: [[${brand}]`)
//
//       const myStyleDictionary = new StyleDictionary()
//       const sd = await myStyleDictionary.extend(config)
//
//       sd.buildPlatform(platform)
//     })
//   })
//
//   console.log('\n==============================================')
//   console.log('\nBuild completed!')
// } catch (e) {
//   console.error(e)
// }
// console.log('✓ Style Dictionary build completed!');