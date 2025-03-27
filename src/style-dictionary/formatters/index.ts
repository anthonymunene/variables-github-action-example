import { toCamelCase, toKebabCase, toPascalCase } from '../utils/string_formatters.js'
import type { TransformedToken } from 'style-dictionary/types'

export const formatJSVariablesByCategory = {
  name: 'javascript/module-by-category',
  format: function({ dictionary, options }) {
    const category = options.category
    const tokens: TransformedToken = dictionary.allTokens

    // Filter tokens for this category
    const filteredTokens = tokens.filter(token => token.path[0] === category)

    // Structure to hold our nested output
    const nestedOutput = {}

    // Process each token into the nested structure
    filteredTokens.forEach(token => {
      // Skip 'content' type - handled separately
      if (token.path.length > 1 && token.path[1] === 'content') return

      // Get the path parts after the category
      const pathParts = token.path.slice(1)

      // Start at the root of our nested output
      let current = nestedOutput

      // Process all path parts except the last one (which will be the value's key)
      for (let i = 0; i < pathParts.length - 1; i++) {
        const part = toCamelCase(pathParts[i])

        // Create nested object if it doesn't exist
        if (!current[part]) {
          current[part] = {}
        }

        // Move to the next level
        current = current[part]
      }

      // Set the value at the final level
      if (pathParts.length > 0) {
        const finalKey = toCamelCase(pathParts[pathParts.length - 1])
        current[finalKey] = token.$value
      }
    })

    // Function to stringify object with proper formatting
    function stringifyObject(obj: {}, indent = 0) {
      const indentStr = '  '.repeat(indent)
      const nextIndentStr = '  '.repeat(indent + 1)

      let result = '{\n'

      // Process each property
      const entries = Object.entries(obj)
      entries.forEach(([key, value], index) => {
        result += nextIndentStr
        result += key + ': '

        if (typeof value === 'object' && value !== null) {
          // Recursively stringify nested objects
          result += stringifyObject(value, indent + 1)
        } else {
          // Format primitive values (assuming strings)
          result += `'${value}'`
        }

        // Add comma if not the last item
        if (index < entries.length - 1) {
          result += ','
        }

        result += '\n'
      })

      result += indentStr + '}'
      return result
    }

    // Generate the output JS code
    let output = [
      `// ${category} tokens for ${options.theme}`,
      '',
      `export default ${stringifyObject(nestedOutput)}`,
    ]

    return output.join('\n')
  },
}

export const formatCSSVariablesByCategory = {
  name: 'css/variables-by-category',
  format: function({ dictionary, options }) {
    const tokens = dictionary.allTokens
    const category = options.category

    const filteredTokens = tokens.filter(token => {

      return token.path[0] === category
    }).map(token => {
      const name = `--${toKebabCase(token.name)}`
      const value = token.$value
      return `${name}: ${value};`
    })
    return [
      `/* ${options.category} variables for ${options.theme} */`,
      ':root {',
      ...filteredTokens,
      '}',
    ].join('\n')
  },
}

export const formatTypeScriptDeclerationsByCategory = {
  name: 'typescript/declarations-by-category',
  format: function({ dictionary, options }) {
    const category = options.category
    const tokens = dictionary.allTokens

    // Group tokens by type (second level in path)
    const tokensByType: Record<string, any[]> = {}
    tokens.forEach(token => {
      const type = token.path.length > 1 ? token.path[1] : 'default'
      if (!tokensByType[type]) {
        tokensByType[type] = []
      }
      tokensByType[type].push(token)
    })

    let output = [
      `// ${category} token types for ${options.theme}`,
      '',
    ]

    // Create interfaces for each type
    Object.entries(tokensByType).forEach(([type, typeTokens]) => {
      // Skip 'content' type - handled separately
      if (type === 'content') return

      if (Object.keys(tokensByType).length > 1) {
        const typePascal = toPascalCase(type)
        const interfaceName = `${toPascalCase(category)}${typePascal}Tokens`

        output.push(`interface ${interfaceName} {`)

        typeTokens.forEach(token => {
          // Create property names by joining parts after type
          const propParts = token.path.slice(2)
          const propName = toCamelCase(propParts.join('-'))
          output.push(`  ${propName}: string;`)
        })

        output.push(`}`)
        output.push('')
      }
    })

    // Create main interface for the category
    output.push(`interface ${toPascalCase(category)}Tokens {`)

    if (Object.keys(tokensByType).length > 1) {
      // Add nested interfaces as properties if multiple types
      Object.keys(tokensByType).forEach(type => {
        // Skip 'content' type - handled separately
        if (type === 'content') return

        const typePascal = toPascalCase(type)
        const propName = toCamelCase(type)
        output.push(`  ${propName}: ${toPascalCase(category)}${typePascal}Tokens;`)
      })
    } else {
      // Flatten properties if only one type (and not content)
      const typeKey = Object.keys(tokensByType)[0]
      if (typeKey !== 'content') {
        const typeTokens = tokensByType[typeKey]
        typeTokens.forEach(token => {
          const propParts = token.path.slice(1)
          const propName = toCamelCase(propParts.join('-'))
          output.push(`  ${propName}: string;`)
        })
      }
    }

    output.push(`}`)
    output.push('')

    // Export statement
    output.push(`export { ${toPascalCase(category)}Tokens };`)

    return output.join('\n')
  },
}