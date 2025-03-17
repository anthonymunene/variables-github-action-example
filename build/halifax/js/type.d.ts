// type token types for halifax

interface TypeFontTokens {
  familyPrimary: string;
  familySecondary: string;
  familyNumbersEmail: string;
  weightToggle: string;
  weightSelector text: string;
  weightHeadingRegBold: string;
  weightBodyLight: string;
  weightBodyMedium: string;
  weightBodyStrong: string;
}

interface TypeTextStyleTokens {
  titleFontSize: string;
  titleLineHeight: string;
  titleHugeFontSize: string;
  titleHugeLineHeight: string;
  titleBigFontSize: string;
  titleBigLineHeight: string;
  titleNormalFontSize: string;
  titleNormalLineHeight: string;
  titleResponsiveFontSize: string;
  titleResponsiveLineHeight: string;
  titleSmallFontSize: string;
  titleSmallLineHeight: string;
  titleTinyFontSize: string;
  titleTinyLineHeight: string;
  paragraphTitleResponsiveFontSize: string;
  paragraphTitleResponsiveLineHeight: string;
  paragraphHugeFontSize: string;
  paragraphHugeLineHeight: string;
  paragraphBigFontSize: string;
  paragraphBigLineHeight: string;
  paragraphNormalFontSize: string;
  paragraphNormalLineHeight: string;
  paragraphSmallFontSize: string;
  paragraphSmallLineHeight: string;
  paragraphSmallResponsiveFontSize: string;
  paragraphSmallResponsiveLineHeight: string;
  paragraphTinyFontSize: string;
  paragraphTinyLineHeight: string;
  paragraphPrice bubbleLargeFontSize: string;
  paragraphPrice bubbleLargeLineHeight: string;
  paragraphPrice bubbleSmallFontSize: string;
  paragraphPrice bubbleSmallLineHeight: string;
  docsEmailsFontSize: string;
  docsEmailsLineHeight: string;
  docsEmailsTitleEmail tinyFontSize: string;
  docsEmailsTitleEmail tinyLineHeight: string;
  docsEmailsTitleMiniSubtitleFontSize: string;
  docsEmailsTitleMiniSubtitleLineHeight: string;
  docsEmailsMini2FontSize: string;
  docsEmailsMini2LineHeight: string;
  docsEmailsMini1FontSize: string;
  docsEmailsMini1LineHeight: string;
  overlineFontSize: string;
  overlineLineHeight: string;
  fieldInputBigFontSize: string;
  fieldInputBigLineHeight: string;
  fieldInputFontSize: string;
  fieldInputLineHeight: string;
  fieldLabelFontSize: string;
  fieldLabelLineHeight: string;
  fieldHintFontSize: string;
  fieldHintLineHeight: string;
  buttonMediumFontSize: string;
  buttonMediumLineHeight: string;
  buttonSmallFontSize: string;
  buttonSmallLineHeight: string;
  buttonTinyFontSize: string;
  buttonTinyLineHeight: string;
  buttonTagFontSize: string;
  buttonTagLineHeight: string;
  linksBigFontSize: string;
  linksBigLineHeight: string;
  linksNormalFontSize: string;
  linksNormalLineHeight: string;
  linksSmallFontSize: string;
  linksSmallLineHeight: string;
  linksTinyFontSize: string;
  linksTinyLineHeight: string;
  linksFooterFontSize: string;
  linksFooterLineHeight: string;
}

interface TypeSizeTokens {
  sm: string;
  3xs: string;
  4xs: string;
}

interface TypeSpaceTokens {
  xl: string;
  md: string;
  sm: string;
  xs: string;
  none: string;
}

interface TypeLineHeightTokens {
  sm: string;
  xs: string;
  4xs: string;
}

interface TypeTokens {
  font: TypeFontTokens;
  textStyle: TypeTextStyleTokens;
  size: TypeSizeTokens;
  space: TypeSpaceTokens;
  lineHeight: TypeLineHeightTokens;
}

export { TypeTokens };