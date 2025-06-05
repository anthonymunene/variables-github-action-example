import { StyleDictionary } from 'style-dictionary-utils';

import { startTokenCompilation } from './compilers/themeCompiler.js';
import { formatJSVariablesByCategory } from './formatters/index.js';
import { sizeToRem, screenTokenResolver, screenReferenceResolver } from './transformers/index.js';

// Register custom formats for Style Dictionary

StyleDictionary.registerFormat(formatJSVariablesByCategory);

StyleDictionary.registerTransform(sizeToRem);
StyleDictionary.registerTransform(screenTokenResolver);
StyleDictionary.registerTransform(screenReferenceResolver);

startTokenCompilation()
    .then(() => {
        // eslint-disable-next-line no-console
        console.log(`✅Token compilation successful`);
    })
    .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
    });
