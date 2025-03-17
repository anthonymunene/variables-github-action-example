// DS token types for moja

interface DSStrokeTokens {
  : string;
}

interface DSPostItTokens {
  : string;
}

interface DSPostIt2Tokens {
  : string;
}

interface DSPageTokens {
  : string;
}

interface DSPageInverseTokens {
  : string;
}

interface DSPageHeaderTokens {
  : string;
}

interface DSHeaderDividerTokens {
  : string;
}

interface DSPageTitlesTokens {
  : string;
}

interface DSSectionTokens {
  : string;
}

interface DSSectionTitleTokens {
  : string;
}

interface DSSectionSubtitle 2Tokens {
  : string;
}

interface DSCardTokens {
  : string;
}

interface DSComponentSurfaceTokens {
  : string;
}

interface DSNameTokens {
  : string;
}

interface DSAnnotationTokens {
  : string;
}

interface DSIconMissingTokens {
  : string;
}

interface DSBorderHighlightTokens {
  : string;
}

interface DSTokens {
  stroke: DSStrokeTokens;
  postIt: DSPostItTokens;
  postIt2: DSPostIt2Tokens;
  page: DSPageTokens;
  pageInverse: DSPageInverseTokens;
  pageHeader: DSPageHeaderTokens;
  headerDivider: DSHeaderDividerTokens;
  pageTitles: DSPageTitlesTokens;
  section: DSSectionTokens;
  sectionTitle: DSSectionTitleTokens;
  sectionSubtitle 2: DSSectionSubtitle 2Tokens;
  card: DSCardTokens;
  componentSurface: DSComponentSurfaceTokens;
  name: DSNameTokens;
  annotation: DSAnnotationTokens;
  iconMissing: DSIconMissingTokens;
  borderHighlight: DSBorderHighlightTokens;
}

export { DSTokens };