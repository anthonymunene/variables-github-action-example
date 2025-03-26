import { convertToREM, isNumber } from '../utils/token.js'
import { PlatformConfig, TransformedToken, Config } from 'style-dictionary/types'
import { transformTypes } from 'style-dictionary/enums'

export const sizeToRem = {
  name: 'sizeToRem',
  type: transformTypes.value,
  transitive: true,
  filter: (token: TransformedToken) => isNumber(token),
  transform: (token: TransformedToken, config: PlatformConfig, options: Config) => convertToREM(token, config, options),
}