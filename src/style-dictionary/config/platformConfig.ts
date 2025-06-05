import { BASE_FONT_SIZE, PLATFORMS } from '../../variables';
import type { PlatformConfig, PlatformOptions } from '../types';

export const getEnabledPlatforms = () => PLATFORMS.filter((platform) => platform.enabled);

const generatePlatformConfig = (platform: PlatformConfig, options: PlatformOptions): Record<string, any> => {
    const { category, theme, buildPath, outputReferences = true } = options;
    const platformBuildPath = `${buildPath}/${platform.buildSuffixPath}/`;

    return {
        transformGroup: platform.transFormGroup,
        transform: platform.transforms,
        buildPath: platformBuildPath,
        basePxFontSize: BASE_FONT_SIZE,
        files: [
            {
                destination: platform.fileNameFormat(category),
                format: platform.format,
                options: {
                    outputReferences,
                },
            },
        ],
        options: {
            category,
            theme,
        },
    };
};

export const createPlatformConfig = (options: PlatformOptions) => {
    const enabledPlatforms = getEnabledPlatforms();
    const platformsConfig: Record<string, unknown> = {};
    enabledPlatforms.forEach((platform) => {
        platformsConfig[platform.name] = generatePlatformConfig(platform, options);
    });

    return platformsConfig;
};
