// space token types for halifax

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