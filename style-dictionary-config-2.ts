// style-dictionary-config.ts
import StyleDictionary, {Config} from 'style-dictionary';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))


// Define known brands (can be extended)
const KNOWN_BRANDS = ['halifax', 'bos', 'lloyds', 'moja'];

// Utility functions for string manipulation
function toCamelCase(str: string): string {
  return str
    .replace(/[-_\.](.)/g, (_, char) => char.toUpperCase())
    .replace(/^(.)/, (_, char) => char.toLowerCase());
}

function toPascalCase(str: string): string {
  return str
    .replace(/[-_\.](.)/g, (_, char) => char.toUpperCase())
    .replace(/^(.)/, (_, char) => char.toUpperCase());
}

function toKebabCase(str) {
  // Handle null or undefined input
  if (!str) return '';

  // Step 1: Convert the entire string to lowercase
  let result = str.toLowerCase();

  // Step 2: Replace any special characters (except hyphens) with spaces
  result = result.replace(/[^\w\s-]/g, ' ');

  // Step 3: Replace underscores with spaces
  result = result.replace(/_/g, ' ');

  // Step 4: Replace all spaces with hyphens
  result = result.replace(/\s+/g, '-');

  // Step 5: Trim any leading/trailing hyphens
  result = result.replace(/^-+|-+$/g, '');

  // Step 6: Replace any instances of multiple consecutive hyphens with a single hyphen
  result = result.replace(/-{2,}/g, '-');

  return result;
}


// Check if a file is a brand file (brands.brandname.json)
function isBrandFile(filePath: string): boolean {
  const fileName = path.basename(filePath);
  return /^brands\.[a-zA-Z0-9]+\.json$/.test(fileName);
}

// Extract brand name from filename (brands.brandname.json)
function getBrandFromFilename(filePath: string): string {
  const fileName = path.basename(filePath);
  const match = fileName.match(/^brands\.([a-zA-Z0-9]+)\.json$/);

  if (match && match[1]) {
    return match[1].toLowerCase();
  }

  // Fallback for other formats
  for (const brand of KNOWN_BRANDS) {
    if (fileName.toLowerCase().includes(brand)) {
      return brand;
    }
  }

  return 'default';
}

// Extract all categories from token file
function getCategoriesFromTokenFile(filePath: string): string[] {
  try {
    const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return Object.keys(fileContent);
  } catch (err) {
    console.error(`Error reading file ${filePath}:`, err);
    return [];
  }
}

// Process content category into a separate JSON file
function processContentTokens(dictionary: any, brand: string, buildPath: string) {
  // Filter tokens to only include 'content' category
  const contentTokens = dictionary.allTokens.filter(
    (token: any) => token.path[0] === 'content'
  );

  if (contentTokens.length === 0) return;

  // Transform tokens into a nested structure with kebab-case keys
  const contentOutput: Record<string, any> = {};

  contentTokens.forEach((token: any) => {
    let current = contentOutput;
    const pathParts = token.path.slice(1); // Skip 'content'

    // Build the nested structure (all parts except the last one)
    for (let i = 0; i < pathParts.length - 1; i++) {
      const part = toKebabCase(pathParts[i]);
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part];
    }

    // Set the final value with kebab-case key
    const finalKey = toKebabCase(pathParts[pathParts.length - 1]);
    current[finalKey] = token.value;
  });

  // Ensure directory exists
  const contentDir = path.join(buildPath, brand, 'content');
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  // Write the content JSON file
  fs.writeFileSync(
    path.join(contentDir, 'content.json'),
    JSON.stringify(contentOutput, null, 2)
  );

  console.log(`Generated content.json for ${brand}`);
}

// Register custom formats for Style Dictionary
StyleDictionary.registerFormat({
  name: 'css/variables-by-category',
  format: function ({ dictionary, options }) {
    const tokens = dictionary.allTokens;

    return [
      `/* ${options.category} variables for ${options.brand} */`,
      ':root {',
      ...tokens.map(token => {
        // Create a CSS variable with the full path for uniqueness
        const fullVariableName = token.path.join('-')
        if(token.path[0] === "type") {
          const named = fullVariableName
        }
        const name = `--${toKebabCase(fullVariableName)}`;
        const value = token.$value;
        return `  ${name}: ${value};`;
      }),
      '}'
    ].join('\n');
  }
});

StyleDictionary.registerFormat({
  name: 'javascript/module-by-category',
  format: function ({ dictionary, options }) {
    const category = options.category;
    const tokens = dictionary.allTokens;

    // Group tokens by type (second level in path)
    const tokensByType: Record<string, any[]> = {};
    tokens.forEach(token => {
      const type = token.path.length > 1 ? token.path[1] : 'default';
      if (!tokensByType[type]) {
        tokensByType[type] = [];
      }
      tokensByType[type].push(token);
    });

    let output = [
      `// ${category} tokens for ${options.brand}`,
      ''
    ];

    output.push(`export const ${toCamelCase(category)} = {`);

    // Process each type
    Object.entries(tokensByType).forEach(([type, typeTokens]) => {
      // Skip 'content' type - handled separately
      if (type === 'content') return;

      // Check if the tokens in this type have further nesting
      const hasNestedItems = typeTokens.some(token => token.path.length > 2);

      if (hasNestedItems) {
        // Create a nested object for this type
        output.push(`  ${toCamelCase(type)}: {`);

        typeTokens.forEach(token => {
          // For tokens with explicit item names
          if (token.path.length > 2) {
            const propParts = token.path.slice(2);
            const propName = toCamelCase(propParts.join('-'));
            output.push(`    ${propName}: '${token.$value}',`);
          } else {
            // For tokens without item names - add directly to type object
            const propName = token.name ? toCamelCase(token.name) : 'default';
            output.push(`    ${propName}: '${token.$value}',`);
          }
        });

        output.push('  },');
      } else {
        // No nested structure - add tokens directly to the main object
        typeTokens.forEach(token => {
          // Use type + name for the property
          const propName = toCamelCase(type + (token.name ? `-${token.name}` : ''));
          output.push(`  ${propName}: '${token.$value}',`);
        });
      }
    });

    output.push('};');
    return output.join('\n');
  }
});

StyleDictionary.registerFormat({
  name: 'typescript/declarations-by-category',
  format: function ({ dictionary, options }) {
    const category = options.category;
    const tokens = dictionary.allTokens;

    // Group tokens by type (second level in path)
    const tokensByType: Record<string, any[]> = {};
    tokens.forEach(token => {
      const type = token.path.length > 1 ? token.path[1] : 'default';
      if (!tokensByType[type]) {
        tokensByType[type] = [];
      }
      tokensByType[type].push(token);
    });

    let output = [
      `// ${category} token types for ${options.brand}`,
      ''
    ];

    // Create interfaces for each type
    Object.entries(tokensByType).forEach(([type, typeTokens]) => {
      // Skip 'content' type - handled separately
      if (type === 'content') return;

      if (Object.keys(tokensByType).length > 1) {
        const typePascal = toPascalCase(type);
        const interfaceName = `${toPascalCase(category)}${typePascal}Tokens`;

        output.push(`interface ${interfaceName} {`);

        typeTokens.forEach(token => {
          // Create property names by joining parts after type
          const propParts = token.path.slice(2);
          const propName = toCamelCase(propParts.join('-'));
          output.push(`  ${propName}: string;`);
        });

        output.push(`}`);
        output.push('');
      }
    });

    // Create main interface for the category
    output.push(`interface ${toPascalCase(category)}Tokens {`);

    if (Object.keys(tokensByType).length > 1) {
      // Add nested interfaces as properties if multiple types
      Object.keys(tokensByType).forEach(type => {
        // Skip 'content' type - handled separately
        if (type === 'content') return;

        const typePascal = toPascalCase(type);
        const propName = toCamelCase(type);
        output.push(`  ${propName}: ${toPascalCase(category)}${typePascal}Tokens;`);
      });
    } else {
      // Flatten properties if only one type (and not content)
      const typeKey = Object.keys(tokensByType)[0];
      if (typeKey !== 'content') {
        const typeTokens = tokensByType[typeKey];
        typeTokens.forEach(token => {
          const propParts = token.path.slice(1);
          const propName = toCamelCase(propParts.join('-'));
          output.push(`  ${propName}: string;`);
        });
      }
    }

    output.push(`}`);
    output.push('');

    // Export statement
    output.push(`export { ${toPascalCase(category)}Tokens };`);

    return output.join('\n');
  }
});

// Add custom transforms if needed
StyleDictionary.registerTransform({
  name: 'size/px',
  type: 'value',
  filter: function(token) {
    return (
      token.$type === 'dimension' ||
      token.path[0] === 'size' ||
      token.path[0] === 'spacing'
    ) && typeof token.original.$value === 'number';
  },
  transform: function(token) {
    return `${token.original.$value}px`;
  }
});

// Get all non-brand JSON files to use as dependencies
function getDependencyFiles(tokenDir: string): string[] {
  return fs.readdirSync(tokenDir)
    .filter(file => file.endsWith('.json') && !isBrandFile(file))
    .map(file => path.join(tokenDir, file));
}

// Process a single brand's token file
async function processBrandTokens(brandFilePath: string, dependencies: string[], buildPath: string): void {
  const brand = getBrandFromFilename(brandFilePath);
  console.log(`Processing ${brand} brand from ${brandFilePath}`);

  // Get all categories from token file
  const categories = getCategoriesFromTokenFile(brandFilePath);
  console.log(`Found categories: ${categories.join(', ')}`);

  // Create directories for this brand
  const brandCssDir = path.join(buildPath, brand, 'css');
  const brandJsDir = path.join(buildPath, brand, 'js');

  fs.mkdirSync(brandCssDir, { recursive: true });
  fs.mkdirSync(brandJsDir, { recursive: true });

  // Filter out 'content' category, handle separately
  const nonContentCategories = categories.filter(cat => cat !== 'content');
  // Process each non-content category
  for (const category of nonContentCategories) {
    const config: Config = {
      source: [brandFilePath],
      include: dependencies,
      platforms: {
        css: {
          transformGroup: 'css',
          transforms: ['size/px'],
          buildPath: `${buildPath}/${brand}/css/`,
          files: [{
            destination: `${category}.css`,
            format: 'css/variables-by-category',
            filter: token => token.path[0] === category,
            options: {
              category: category,
              brand: brand
            }
          }]
        },
        js: {
          transformGroup: 'js',
          transforms: ['size/px', 'name/camel'],
          buildPath: `${buildPath}/${brand}/js/`,
          files: [{
            destination: `${category}.js`,
            format: 'javascript/module-by-category',
            filter: token => token.path[0] === category,
            options: {
              category: category,
              brand: brand
            }
          }]
        },
        ts: {
          transformGroup: 'js',
          transforms: ['size/px', 'name/camel'],
          buildPath: `${buildPath}/${brand}/js/`,
          files: [{
            destination: `${category}.d.ts`,
            format: 'typescript/declarations-by-category',
            filter: token => token.path[0] === category,
            options: {
              category: category,
              brand: brand
            }
          }]
        }
      }
    };

    // Run Style Dictionary for this category
    const sd = new StyleDictionary(config);
    await sd.hasInitialized;
    await sd.buildAllPlatforms();
    console.log(`Generated ${category} outputs for ${brand}`);
  }

  // Process content separately if it exists
  if (categories.includes('content')) {
    // const contentConfig = {
    //   source: [brandFilePath],
    //   include: dependencies,
    //   platforms: {
    //     js: {
    //       transformGroup: 'js',
    //       buildPath: `${buildPath}/`,
    //       files: []
    //     }
    //   }
    // };
    //
    // const contentSD = new StyleDictionary(contentConfig);
    // processContentTokens(contentSD, brand, buildPath);
  }

  // Create index files for CSS and JS
  createIndexFiles(brand, nonContentCategories, buildPath);
}

// Create index files to easily import all categories
function createIndexFiles(brand: string, categories: string[], buildPath: string): void {
  // Create CSS index file
  const cssIndexContent = [
    `/* ${brand} token variables */`,
    '',
    ...categories.map(category => `@import './${category}.css';`),
    ''
  ].join('\n');

  fs.writeFileSync(
    path.join(buildPath, brand, 'css', 'index.css'),
    cssIndexContent
  );

  // Create JS index file
  const jsImports = categories.map(
    category => `import { ${toCamelCase(category)}Tokens } from './${category}';`
  );

  const jsExports = categories.map(
    category => `  ${toCamelCase(category)}Tokens`
  );

  const jsIndexContent = [
    `// ${brand} tokens index`,
    '',
    ...jsImports,
    '',
    'export {',
    ...jsExports,
    '};',
    ''
  ].join('\n');

  fs.writeFileSync(
    path.join(buildPath, brand, 'js', 'index.js'),
    jsIndexContent
  );

  // Create TypeScript definition index file
  const tsImports = categories.map(
    category => `import { ${toPascalCase(category)}Tokens } from './${category}';`
  );

  const tsExports = categories.map(
    category => `  ${toPascalCase(category)}Tokens`
  );

  const tsIndexContent = [
    `// ${brand} tokens type definitions`,
    '',
    ...tsImports,
    '',
    'export {',
    ...tsExports,
    '};',
    ''
  ].join('\n');

  fs.writeFileSync(
    path.join(buildPath, brand, 'js', 'index.d.ts'),
    tsIndexContent
  );
}

// Create a root index that imports from all brands
function createRootIndex(brands: string[], buildPath: string): void {
  const rootJsDir = path.join(buildPath, 'js');
  fs.mkdirSync(rootJsDir, { recursive: true });

  const jsImports = brands.map(
    brand => `import * as ${toCamelCase(brand)}Tokens from '../${brand}/js/index';`
  );

  const jsExports = brands.map(
    brand => `  ${toCamelCase(brand)}Tokens`
  );

  const jsIndexContent = [
    '// All brand tokens',
    '',
    ...jsImports,
    '',
    'export {',
    ...jsExports,
    '};',
    ''
  ].join('\n');

  fs.writeFileSync(
    path.join(rootJsDir, 'index.js'),
    jsIndexContent
  );

  // Create TypeScript definition for root index
  const tsImports = brands.map(
    brand => `import * as ${toCamelCase(brand)}Tokens from '../${brand}/js/index';`
  );

  const tsExports = brands.map(
    brand => `  ${toCamelCase(brand)}Tokens`
  );

  const tsIndexContent = [
    '// All brand tokens type definitions',
    '',
    ...tsImports,
    '',
    'export {',
    ...tsExports,
    '};',
    ''
  ].join('\n');

  fs.writeFileSync(
    path.join(rootJsDir, 'index.d.ts'),
    tsIndexContent
  );
}

// Process all token files
function processAllTokens(tokenDir: string, buildPath: string): void {
  // Get all dependency files (non-brand files)
  const dependencies = getDependencyFiles(tokenDir);
  console.log(`Found ${dependencies.length} dependency files`);

  // Get all brand token files
  const brandFiles = fs.readdirSync(tokenDir)
    .filter(file => isBrandFile(file))
    .map(file => path.join(tokenDir, file));

  // Track which brands we've processed
  const processedBrands: string[] = [];

  // Process each brand file
  brandFiles.forEach(filePath => {
    const brand = getBrandFromFilename(filePath);

    processBrandTokens(filePath, dependencies, buildPath);

    if (!processedBrands.includes(brand)) {
      processedBrands.push(brand);
    }
  });

  // Create root index files that import from all brands
  createRootIndex(processedBrands, buildPath);

  console.log(`Processed ${processedBrands.length} brands: ${processedBrands.join(', ')}`);
}

// Main function
function main() {
  const tokenDir = path.resolve(__dirname, './tokens_new');
  const buildPath = path.resolve(__dirname, './build');

  processAllTokens(tokenDir, buildPath);
}

// Run the script if called directly
  main();

// export {
//   processAllTokens,
//   processBrandTokens
// };