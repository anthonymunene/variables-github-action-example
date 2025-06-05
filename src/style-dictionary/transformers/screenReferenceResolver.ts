import { transformTypes } from 'style-dictionary/enums';
import { PlatformConfig, TransformedToken } from 'style-dictionary/types';

// Map of broken references to their correct paths
const referenceFixMap: Record<string, string> = {
    '{type.styles.title.fixed.large.size}': '{type.title.large.size}',
    '{type.styles.title.fixed.large.line-height}': '{type.title.large.line-height}',
    '{type.styles.title.fixed.medium.size}': '{type.title.medium.size}',
    '{type.styles.title.fixed.medium.line-height}': '{type.title.medium.line-height}',
    '{type.styles.title.fixed.small.size}': '{type.title.small.size}',
    '{type.styles.title.fixed.small.line-height}': '{type.title.small.line-height}',
};

export const screenReferenceResolver = {
    name: 'screen-reference-resolver',
    type: transformTypes.value,
    transitive: false, // Run before other transforms
    filter: (token: TransformedToken) => {
        const value = token.$value || token.value;
        // Check if this is a screen token with a broken reference
        return typeof value === 'string' && 
               value.startsWith('{') && 
               value.endsWith('}') &&
               Object.keys(referenceFixMap).includes(value);
    },
    transform: (token: TransformedToken, config: PlatformConfig) => {
        const value = token.$value || token.value;
        
        // Fix the reference if it's in our map
        if (referenceFixMap[value]) {
            return referenceFixMap[value];
        }
        
        return value;
    },
};