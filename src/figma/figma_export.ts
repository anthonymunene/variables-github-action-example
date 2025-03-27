import 'dotenv/config'
import * as fs from 'fs'

import FigmaApi from './api.js'

import { green } from './utils/index.js'
import { tokenFilesFromLocalVariables } from './token_export.js'
import { TOKENS_DIR } from '../variables.js'

/**
 * Usage:
 *
 * // Defaults to writing to the tokens_new directory
 * npm run sync-figma-to-tokens
 *
 * // Writes to the specified directory
 * npm run sync-figma-to-tokens -- --output directory_name
 */

async function main() {
  if (!process.env.PERSONAL_ACCESS_TOKEN || !process.env.FILE_KEY) {
    throw new Error('PERSONAL_ACCESS_TOKEN and FILE_KEY environemnt variables are required')
  }
  const fileKey = process.env.FILE_KEY

  const api = new FigmaApi(process.env.PERSONAL_ACCESS_TOKEN)
  const localVariables = await api.getLocalVariables(fileKey)

  const tokensFiles = tokenFilesFromLocalVariables(localVariables)

  let outputDir = TOKENS_DIR
  const outputArgIdx = process.argv.indexOf('--output')
  if (outputArgIdx !== -1) {
    outputDir = process.argv[outputArgIdx + 1]
  }

  saveTokenFiles(tokensFiles, outputDir)

  console.log(green(`✅ Tokens files have been written to the ${outputDir} directory`))
}

const sanitizeFilename = (filename: string) => {
  return  filename.replace(/\s+/g, '')
    .replace(/\//g, '-')
    .toLowerCase()
}
main()
