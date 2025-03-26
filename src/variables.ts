export const BRANDS = ['halifax', 'lloyds', 'bos', 'moja'] as const
export const PLATFORMS = [
  { name: 'css',
    transformGroup: 'css',
    format: 'css/advanced',
    fileExtension: "css"
  }, {
    name: 'js',
    transformGroup: 'js',
    format: 'javascript/es6',
    fileExtension: "js"
  }] as const
export const TOKENS_DIR = './src/tokens'
export const BUILD_DIR= "build"
export const DESIGN_SYSTEM_NAME = "Ascot"

export const EXCLUDED_COLLECTIONS = ["content","System", "comms", "wireframe"]
export const EXCLUDED_VARIABLE_CATEGORIES = ["comms","system","ascot", "archive", "content"]
