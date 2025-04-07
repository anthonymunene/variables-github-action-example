import fs from 'fs'
import { TOKENS_DIR, VARIABLE_COLLECTIONS } from '../../variables.js'
import path from 'path'
import { getFilesFromDirectory } from '../../shared/utils/index.js'

const createThemeFileRegex = () => new RegExp('theme.([a-zA-Z0-9]+).json$')

export function getThemeFromFileName(filePath: string): string {
  const fileName = path.basename(filePath)
  const themeRegex = createThemeFileRegex()
  const match = fileName.match(themeRegex)

  if (match && match[1]) {
    return match[1].toLowerCase()
  }

  return 'no match'
}

export function getDependencyFiles(): string[] {
  return getFilesFromDirectory(TOKENS_DIR).filter(
    (file) =>
      file.endsWith('.json') &&
      (file.includes(VARIABLE_COLLECTIONS.core) || file.includes(VARIABLE_COLLECTIONS.layout)),
  )
}

// Check if a file is a brand file (brands.brandname.json)
export function isThemeFile(filePath: string): boolean {
  const fileName = path.basename(filePath)
  return /^theme\.(?!(wireframe|thirdparty|system)\.json$)[^.]+\.json$/.test(fileName)
}

export const getBrandFile = (brand: string) => {
  return fs
    .readdirSync(TOKENS_DIR)
    .filter((file) => file.endsWith('.json') && isThemeFile(file) && file.includes(brand))
    .map((file) => path.join(TOKENS_DIR, file))
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
