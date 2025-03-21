// style-dictionary-config.ts
import StyleDictionary, { Config } from 'style-dictionary';
import path,{ basename, resolve, join } from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import { TOKENS_DIR } from './src/variables.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Utility functions for string case conversion
function toCamelCase(str: string): string {
  return str
    .replace(/[-_.](.)/g, (_, char) => char.toUpperCase())
    .replace(/^(.)/, (_, char) => char.toLowerCase());
}

function toPascalCase(str: string): string {
  return str
    .replace(/[-_.](.)/g, (_, char) => char.toUpperCase())
    .replace(/^(.)/, (_, char) => char.toUpperCase());
}

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
    .replace(/[-_\s]+/g, '-')
    .toLowerCase();
}

// Define the known brand names (can be extended)
const KNOWN_BRANDS = ['halifax', 'bos', 'lloyds', 'moja'];

// Function to extract brand name from filename
function extractBrandName(filename: string): string {
  // Expected format: brands.brandName.json
  const parts = basename(filename, '.json').split('.');

  if (parts.length >= 2) {
    return parts[1].toLowerCase(); // The brand name is the second part
  }

  // Fallback if filename doesn't match expected pattern
  for (const brand of KNOWN_BRANDS) {
    if (filename.toLowerCase().includes(brand)) {
      return brand;
    }
  }

  return 'default'; // Default brand name if none found
}

// Define custom filter to exclude content category
StyleDictionary.registerFilter({
  name: 'excludeContent',
  filter: (token) => {
    return token.path[0] !== 'content';
  }
});

// Filter to include only tokens of a specific category
StyleDictionary.registerFilter({
  name: 'byCategory',
  filter: function(token, options) {
    return token.path[0] === options.category;
  }
});

// Register a format for TypeScript declarations for a specific category
StyleDictionary.registerFormat({
  name: 'typescript/declarations-by-category',
  format: function({ dictionary, file, options }) {
    const category = options.category;
    const categoryPascal = toPascalCase(category);

    const output: string[] = [
      `// Generated TypeScript definitions for ${category} category`,
      ''
    ];

    // Get all tokens for this category
    const tokens = dictionary.allTokens;

    // Group tokens by their second path element (type)
    const tokensByType = tokens.reduce((acc, token) => {
      // If path has at least 2 elements, use the second element as type
      // Otherwise use 'default' as type
      const type = token.path.length > 1 ? token.path[1] : 'default';

      if (!acc[type]) {
        acc[type] = [];
      }

      acc[type].push(token);
      return acc;
    }, {} as Record<string, any[]>);

    // Create interface for each type
    Object.entries(tokensByType).forEach(([type, typeTokens]) => {
      const typePascal = toPascalCase(type);
      const interfaceName = `${categoryPascal}${typePascal}Tokens`;

      output.push(`interface ${interfaceName} {`);

      // Add properties to the interface
      typeTokens.forEach(token => {
        // Create property name from parts after type
        const propParts = token.path.length > 2
          ? token.path.slice(2)
          : token.path.slice(1);

        const propName = toCamelCase(propParts.join('-'));

        output.push(`  ${propName}: string;`);
      });

      output.push(`}`);
      output.push('');
    });

    // Create main category interface
    output.push(`interface ${categoryPascal}Tokens {`);

    // If multiple types, add nested interfaces
    if (Object.keys(tokensByType).length > 1) {
      Object.keys(tokensByType).forEach(type => {
        const typePascal = toPascalCase(type);
        const propName = toCamelCase(type);

        output.push(`  ${propName}: ${categoryPascal}${typePascal}Tokens;`);
      });
    } else {
      // If only one type, flatten properties
      const type = Object.keys(tokensByType)[0];
      const tokens = tokensByType[type];

      tokens.forEach(token => {
        const propParts = token.path.length > 2
          ? token.path.slice(2)
          : token.path.slice(1);

        const propName = toCamelCase(propParts.join('-'));

        output.push(`  ${propName}: string;`);
      });
    }

    output.push(`}`);
    output.push('');

    // Export statement
    output.push(`export { ${categoryPascal}Tokens };`);

    return output.join('\n');
  }
});

// Register a format for JavaScript ES6 module for a specific category
StyleDictionary.registerFormat({
  name: 'javascript/es6-by-category',
  format: function({ dictionary, file, options }) {
    const category = options.category;

    const output: string[] = [
      `// Generated JavaScript ES6 module for ${category} category`,
      ''
    ];

    // Get all tokens for this category
    const tokens = dictionary.allTokens;

    // Group tokens by their second path element (type)
    const tokensByType = tokens.reduce((acc, token) => {
      // If path has at least 2 elements, use the second element as type
      // Otherwise use 'default' as type
      const type = token.path.length > 1 ? token.path[1] : 'default';

      if (!acc[type]) {
        acc[type] = [];
      }

      acc[type].push(token);
      return acc;
    }, {} as Record<string, any[]>);

    // Create export for this category
    output.push(`export const ${toCamelCase(category)}Tokens = {`);

    // If there are multiple types, create nested objects
    if (Object.keys(tokensByType).length > 1) {
      Object.entries(tokensByType).forEach(([type, typeTokens]) => {
        output.push(`  ${toCamelCase(type)}: {`);

        typeTokens.forEach(token => {
          // Create property name from parts after type
          const propParts = token.path.length > 2
            ? token.path.slice(2)
            : [token.name];

          const propName = toCamelCase(propParts.join('-'));

          output.push(`    ${propName}: '${token.value}',`);
        });

        output.push(`  },`);
      });
    } else {
      // If only one type, flatten properties
      tokens.forEach(token => {
        // Create property name from parts after category
        const propParts = token.path.slice(1);
        const propName = toCamelCase(propParts.join('-'));

        output.push(`  ${propName}: '${token.value}',`);
      });
    }

    output.push(`};`);
    output.push('');

    return output.join('\n');
  }
});

// Register a format for CSS variables for a specific category
StyleDictionary.registerFormat({
  name: 'css/variables-by-category',
  format: function({ dictionary, file, options }) {
    const category = options.category;

    const output: string[] = [
      `/* Generated CSS variables for ${category} category */`,
      ''
    ];

    // Get all tokens for this category
    const tokens = dictionary.allTokens;

    // Create CSS variables for this category
    output.push(`:root {`);

    tokens.forEach(token => {
      // Create CSS variable name using the full path
      const varName = `--${token.path.join('-')}`;
      output.push(`  ${varName}: ${token.value};`);
    });

    output.push(`}`);
    output.push('');

    return output.join('\n');
  }
});

// Apply Style Dictionary transformers
StyleDictionary.registerTransform({
  name: 'size/px',
  type: 'value',
  filter: (token) => {
    return (
      token.type === 'dimension' ||
      token.type === 'number' ||
      token.path[0] === 'size'
    ) && typeof token.original.value === 'number';
  },
  transform: (token) => {
    // Add px to numbers unless they're 0
    return token.original.value === 0 ? '0' : `${token.original.value}px`;
  }
});

// Function to get all categories from a token file
function getCategoriesFromTokenFile(tokenFilePath: string): string[] {
  try {
    const tokenData = JSON.parse(fs.readFileSync(tokenFilePath, 'utf8'));

    // Extract top-level keys, excluding 'content'
    return Object.keys(tokenData).filter(key => key !== 'content');
  } catch (error) {
    console.error(`Error reading token file: ${error}`);
    return [];
  }
}


// We should create a filter factory function that returns a new filter for each category:
function createCategoryFilter(category: string): string {
  const filterName = `category-${category}`;

  // Register a filter specifically for this category
  StyleDictionary.registerFilter({
    name: filterName,
    filter: function(token) {
      return token.path[0] === category;
    }
  });

  return filterName;
}
// Function to create a Style Dictionary configuration for a brand and category
function createBrandCategoryConfig(
  tokenFilePath: string,
  outputDir: string,
  brand: string,
  category: string
): Config {
  // Create a filter specifically for this category
  const categoryFilter = createCategoryFilter(category);

  return {
    source: [tokenFilePath],
    platforms: {
      css: {
        transforms: ['size/px', 'name/cti/kebab'],
        buildPath: `${outputDir}/${brand}/css/`,
        files: [{
          destination: `${category}.css`,
          format: 'css/variables-by-category',
          filter: categoryFilter,
          options: {
            category: category
          }
        }]
      },
      js: {
        transforms: ['size/px', 'name/cti/camel'],
        buildPath: `${outputDir}/${brand}/js/`,
        files: [{
          destination: `${category}.js`,
          format: 'javascript/es6-by-category',
          filter: categoryFilter,
          options: {
            category: category
          }
        }]
      },
      ts: {
        transforms: ['size/px', 'name/cti/camel'],
        buildPath: `${outputDir}/${brand}/js/`, // Put typings with JS
        files: [{
          destination: `${category}.d.ts`,
          format: 'typescript/declarations-by-category',
          filter: categoryFilter,
          options: {
            category: category
          }
        }]
      }
    }
  };
}

// Process a token file for a specific brand
function processTokenFile(tokenFilePath: string, outputDir: string): void {
  try {
    // Extract brand name from filename
    const brand = extractBrandName(tokenFilePath);

    // Get categories from token file
    const categories = getCategoriesFromTokenFile(tokenFilePath);

    console.log(`Processing ${brand} brand with categories: ${categories.join(', ')}`);

    // Create output directories
    const brandCssDir = join(outputDir, brand, 'css');
    const brandJsDir = join(outputDir, brand, 'js');

    if (!fs.existsSync(brandCssDir)) {
      fs.mkdirSync(brandCssDir, { recursive: true });
    }

    if (!fs.existsSync(brandJsDir)) {
      fs.mkdirSync(brandJsDir, { recursive: true });
    }

    // Process each category separately
    categories.forEach(category => {
      // Create config for this brand and category
      const config = createBrandCategoryConfig(tokenFilePath, outputDir, brand, category);

      // Build using Style Dictionary
      const sd = new StyleDictionary(config);
      sd.buildAllPlatforms();

      console.log(`  - Generated ${category} outputs for ${brand} brand`);
    });

    // Create an index.js file that imports and re-exports all categories
    const jsIndexContent = `// Index file for ${brand} tokens\n\n` +
      categories.map(category =>
        `import { ${toCamelCase(category)}Tokens } from './${category}';`
      ).join('\n') +
      '\n\nexport {\n  ' +
      categories.map(category => `${toCamelCase(category)}Tokens`).join(',\n  ') +
      '\n};\n';

    fs.writeFileSync(join(brandJsDir, 'index.js'), jsIndexContent);

    // Create an index.d.ts file that imports and re-exports all categories
    const tsIndexContent = `// Type definitions for ${brand} tokens\n\n` +
      categories.map(category =>
        `import { ${toPascalCase(category)}Tokens } from './${category}';`
      ).join('\n') +
      '\n\nexport {\n  ' +
      categories.map(category => `${toPascalCase(category)}Tokens`).join(',\n  ') +
      '\n};\n';

    fs.writeFileSync(join(brandJsDir, 'index.d.ts'), tsIndexContent);

    // Create a single CSS file that imports all category CSS files
    const cssIndexContent = `/* Main CSS file for ${brand} tokens */\n\n` +
      categories.map(category =>
        `@import './${category}.css';`
      ).join('\n') +
      '\n';

    fs.writeFileSync(join(brandCssDir, 'index.css'), cssIndexContent);

    console.log(`Successfully generated all outputs for ${brand} brand`);
  } catch (error) {
    console.error(`Error processing token file: ${error}`);
  }
}

// Process all token files in a directory
function processAllTokenFiles(tokenDir: string, outputDir: string): void {
  try {
    // Get all JSON files in the token directory
    const files = fs.readdirSync(tokenDir).filter(file => file.endsWith('.json'));

    // Group files by brand
    const brandFiles: Record<string, string[]> = {};

    files.forEach(file => {
      const brand = extractBrandName(file);

      if (!brandFiles[brand]) {
        brandFiles[brand] = [];
      }

      brandFiles[brand].push(join(tokenDir, file));
    });

    // Process each brand
    Object.entries(brandFiles).forEach(([brand, files]) => {
      // Use the first file for each brand (assuming one file per brand)
      if (files.length > 0) {
        processTokenFile(files[0], outputDir);
      }
    });

    // Create a root index.js that imports from all brands
    const brands = Object.keys(brandFiles);
    const rootJsDir = join(outputDir, 'js');

    if (!fs.existsSync(rootJsDir)) {
      fs.mkdirSync(rootJsDir, { recursive: true });
    }

    const rootIndexContent = `// Root index file for all brand tokens\n\n` +
      brands.map(brand =>
        `import * as ${toCamelCase(brand)}Tokens from '../${brand}/js/index';`
      ).join('\n') +
      '\n\nexport {\n  ' +
      brands.map(brand => `${toCamelCase(brand)}Tokens`).join(',\n  ') +
      '\n};\n';

    fs.writeFileSync(join(rootJsDir, 'index.js'), rootIndexContent);

    console.log('Successfully processed all token files');
  } catch (error) {
    console.error(`Error processing token directory: ${error}`);
  }
}

// Main function to run the token processor
function main() {
  const tokenDir = resolve(__dirname, TOKENS_DIR);
  const outputDir = resolve(__dirname, './build');

  processAllTokenFiles(tokenDir, outputDir);
}

// Run the main function if this file is executed directly
try {
main();

} catch (e) {
  console.error(e)
}

// export {
//   processTokenFile,
//   processAllTokenFiles
// };