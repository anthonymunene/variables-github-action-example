import type { TransformedToken } from 'style-dictionary/types';

import { toCamelCase } from '../utils/stringFormatters.js';

export const formatJSVariablesByCategory = {
    name: 'javascript/module-by-category',
    format: function ({ dictionary, options }) {
        const category = options.category;
        const tokens: TransformedToken = dictionary.allTokens;

        // Filter tokens for this category
        const filteredTokens = tokens.filter((token) => token.path[0] === category);

        // Structure to hold our nested output
        const nestedOutput = {};

        // Process each token into the nested structure
        filteredTokens.forEach((token) => {
            // Skip 'content' type - handled separately
            if (token.path.length > 1 && token.path[1] === 'content') return;

            // Get the path parts after the category
            const pathParts = token.path.slice(1);

            // Start at the root of our nested output
            let current = nestedOutput;

            // Process all path parts except the last one (which will be the value's key)
            for (let i = 0; i < pathParts.length - 1; i++) {
                const part = toCamelCase(pathParts[i]);

                // Create nested object if it doesn't exist
                if (!current[part]) {
                    current[part] = {};
                }

                // Move to the next level
                current = current[part];
            }

            // Set the value at the final level
            if (pathParts.length > 0) {
                const finalKey = toCamelCase(pathParts[pathParts.length - 1]);
                current[finalKey] = token.$value;
            }
        });

        // Function to stringify object with proper formatting
        function stringifyObject(obj: object, indent = 0) {
            const indentStr = '  '.repeat(indent);
            const nextIndentStr = '  '.repeat(indent + 1);
            const needsQuotesRegex = /^\d/;

            let result = '{\n';

            // Process each property
            const entries = Object.entries(obj);
            entries.forEach(([key, value], index) => {
                const formattedKey = needsQuotesRegex.test(key) ? `"${key}"` : key;

                result += `${nextIndentStr}${formattedKey}: `;

                if (typeof value === 'object' && value !== null) {
                    // Recursively stringify nested objects
                    result += stringifyObject(value, indent + 1);
                } else {
                    // Format primitive values (assuming strings)
                    result += `'${value}'`;
                }

                // Add comma if not the last item
                if (index < entries.length - 1) {
                    result += ',';
                }

                result += '\n';
            });

            result += indentStr + '}';
            return result;
        }

        // Generate the output JS code
        const output = [`// ${category} tokens for ${options.theme}`, '', `export default ${stringifyObject(nestedOutput)}`];

        return output.join('\n');
    },
};
