// space token types for lloyds

interface SpacePaddingTokens {
  cardDefault: string;
  cardSmNegative: string;
  cardSmPositive: string;
  buttonFocus: string;
}

interface SpaceGapTokens {
  genericSm: string;
  genericMd: string;
  genericLg: string;
  titleDefault: string;
  toggleDefault: string;
}

interface SpaceTokens {
  padding: SpacePaddingTokens;
  gap: SpaceGapTokens;
}

export { SpaceTokens };