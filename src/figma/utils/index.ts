import { RGB, RGBA } from '@figma/rest-api-spec'

export function green(msg: string) {

  return `\x1b[32m${msg}\x1b[0m`
}

export function brightRed(msg: string) {
  return `\x1b[1;31m${msg}\x1b[0m`
}

export function areSetsEqual<T>(a: Set<T>, b: Set<T>) {
  return a.size === b.size && [...a].every((item) => b.has(item))
}

export function rgbToHex({ r, g, b, ...rest }: RGB | RGBA) {
  const a = 'a' in rest ? rest.a : 1

  const toHex = (value: number) => {
    const hex = Math.round(value * 255).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  const hex = [toHex(r), toHex(g), toHex(b)].join('')
  return `#${hex}` + (a !== 1 ? toHex(a) : '')
}

export const getTokenCategory = (fileName: string): string => {
  if (fileName.startsWith('theme.')) {
    return 'themes'
  } else if (fileName.startsWith('core') || fileName.startsWith('global')) {
    return 'core'
  } else if (fileName.startsWith('responsive.')) {
    return 'responsive'
  } else {
    return 'misc' // For any uncategorized tokens
  }
}



