import fs from 'fs'
import { toKebabCase } from './string_formatters.js'
import path from 'path'
import { PlatformConfig, TransformedToken } from 'style-dictionary/types'
import { Config } from 'style-dictionary'

export const getCategoriesFromTokenFile = (filePath: string) => {
  try {
    const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    return Object.keys(fileContent)
  } catch (err) {
    console.error(`Error reading file ${filePath}:`, err)
    return []
  }
}

// Process content category into a separate JSON file
export const  processContentTokens = (dictionary: any, brand: string, buildPath: string) => {
  // Filter tokens to only include 'content' category
  const contentTokens = dictionary.allTokens.filter(
    (token: any) => token.path[0] === 'content',
  )

  if (contentTokens.length === 0) return

  // Transform tokens into a nested structure with kebab-case keys
  const contentOutput: Record<string, any> = {}

  contentTokens.forEach((token: any) => {
    let current = contentOutput
    const pathParts = token.path.slice(1) // Skip 'content'

    // Build the nested structure (all parts except the last one)
    for (let i = 0; i < pathParts.length - 1; i++) {
      const part = toKebabCase(pathParts[i])
      if (!current[part]) {
        current[part] = {}
      }
      current = current[part]
    }

    // Set the final value with kebab-case key
    const finalKey = toKebabCase(pathParts[pathParts.length - 1])
    current[finalKey] = token.value
  })

  // Ensure directory exists
  const contentDir = path.join(buildPath, brand, 'content')
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true })
  }

  // Write the content JSON file
  fs.writeFileSync(
    path.join(contentDir, 'content.json'),
    JSON.stringify(contentOutput, null, 2),
  )

  console.log(`Generated content.json for ${brand}`)
}

export const convertToRem = (value: number, basePixelValue: number) => {
  const remUnit = value / basePixelValue
  return `${remUnit.toFixed(3)}rem`
}

export const isNumber = (token: TransformedToken) => {
  return (
    token.$type === 'number'

  ) && typeof token.original.$value === 'number'
}

export const convertToREM = (token:TransformedToken, config:PlatformConfig, options: Config) => {
  const  throwSizeError = (name: string, value: unknown, unitType: string)=> {
    throw `Invalid Number: '${name}: ${value}' is not a valid number, cannot transform to '${unitType}' \n`
  }
  const nonParsed = options.usesDtcg ? token.$value : token.value
  const parsedVal = parseFloat(nonParsed.toFixed(1))
  if (isNaN(parsedVal)) throwSizeError(token.name, nonParsed, 'rem')
  if (parsedVal === 0) return Number.isInteger(nonParsed) ? 0 : '0'
  return convertToRem(parsedVal, config.basePxFontSize)
}