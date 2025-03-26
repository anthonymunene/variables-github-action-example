import type { GetLocalVariablesResponse, LocalVariable } from '@figma/rest-api-spec'
import { rgbToHex } from './utils/index.js'
import  type { Token, TokensFile } from './types.js'
import {EXCLUDED_COLLECTIONS} from '../variables.js'

function tokenTypeFromVariable(variable: LocalVariable) {
  switch (variable.resolvedType) {
    case 'BOOLEAN':
      return 'boolean'
    case 'COLOR':
      return 'color'
    case 'FLOAT':
      return 'number'
    case 'STRING':
      return 'string'
  }
}

function tokenValueFromVariable(
  variable: LocalVariable,
  modeId: string,
  localVariables: { [id: string]: LocalVariable },
) {
  const value = variable.valuesByMode[modeId]
  if (typeof value === 'object') {
    if ('type' in value && value.type === 'VARIABLE_ALIAS') {
      const aliasedVariable = localVariables[value.id]
      if (!aliasedVariable) {
        console.log(aliasedVariable)
        return 'NO_VALUE'
      }
      return `{${aliasedVariable.name.replace(/\//g, '.')}}`
    } else if ('r' in value) {
      return rgbToHex(value)
    }

    throw new Error(`Format of variable value is invalid: ${value}`)
  } else {
    return value
  }
}

export const shouldExclude = (targets: string, collection: string[]) => collection.some(excluded_collection => targets.toLowerCase().includes(excluded_collection.toLowerCase()))

export function tokenFilesFromLocalVariables(localVariablesResponse: GetLocalVariablesResponse) {
  const tokenFiles: { [fileName: string]: TokensFile } = {}
  const localVariableCollections = localVariablesResponse.meta.variableCollections
  const localVariables = localVariablesResponse.meta.variables

  Object.values(localVariables).forEach((variable) => {
    // Skip remote variables because we only want to generate tokens for local variables
    if (variable.remote) {
      return
    }

    const collection = localVariableCollections[variable.variableCollectionId]

    collection.modes.forEach((mode) => {
      const fileName = `${collection.name}.${mode.name}.json`


      if (!shouldExclude(fileName, EXCLUDED_COLLECTIONS)) {

        if (!tokenFiles[fileName]) {
          tokenFiles[fileName] = {}
        }

        let obj: any = tokenFiles[fileName]

        // if (shouldExclude(variable.name, EXCLUDED_VARIABLE_CATEGORIES)) {
        //   return
        // }
        variable.name.split('/').forEach((groupName) => {
          obj[groupName] = obj[groupName] || {}
          obj = obj[groupName]
        })

        const token: Token = {
          $type: tokenTypeFromVariable(variable),
          $value: tokenValueFromVariable(variable, mode.modeId, localVariables),
          $description: variable.description,
          $extensions: {
            'com.figma': {
              hiddenFromPublishing: variable.hiddenFromPublishing,
              scopes: variable.scopes,
              codeSyntax: variable.codeSyntax,
            },
          },
        }

        Object.assign(obj, token)
      }
    })
  })

  return tokenFiles
}
