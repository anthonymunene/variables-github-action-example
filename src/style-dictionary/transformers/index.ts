import { transformTypes } from 'style-dictionary/enums';
import { Config, PlatformConfig, TransformedToken } from 'style-dictionary/types';

import { convertToREM, isNumber } from '../utils/token.js';
import { screenTokenResolver } from './screenTokenResolver.js';
import { screenReferenceResolver } from './screenReferenceResolver.js';

export const sizeToRem = {
    name: 'sizeToRem',
    type: transformTypes.value,
    transitive: true,
    filter: (token: TransformedToken) => isNumber(token),
    transform: (token: TransformedToken, config: PlatformConfig, options: Config) => convertToREM(token, config, options),
};

export { screenTokenResolver, screenReferenceResolver };
