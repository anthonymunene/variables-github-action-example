import { Config } from 'style-dictionary';
import { logBrokenReferenceLevels, logVerbosityLevels, logWarningLevels } from 'style-dictionary/enums';

import { BASE_FONT_SIZE } from '../../variables';

export const createConfig = (theme: string, category: string, sourcePath: string, dependencies: string[], buildPath: string): Config => {
    return {
        log: {
            warnings: logWarningLevels.warn,
            verbosity: logVerbosityLevels.verbose,
            errors: {
                brokenReferences: category === 'screen' ? logBrokenReferenceLevels.console : logBrokenReferenceLevels.throw,
            },
        },
        source: [sourcePath],
        include: dependencies,
        platforms: {
            ts: {
                transformGroup: 'js',
                transforms: ['screen-reference-resolver', 'sizeToRem', 'screen-token-resolver', 'attribute/cti'],
                buildPath: `${buildPath}/`,
                basePxFontSize: BASE_FONT_SIZE,
                files: [
                    {
                        destination: `${category}.ts`,
                        format: 'javascript/module-by-category',
                    },
                ],
                options: {
                    category: category,
                    theme,
                    platform: 'mobile', // Default to mobile, can be overridden
                },
            },
        },
    };
};
