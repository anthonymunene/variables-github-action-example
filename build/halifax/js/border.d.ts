// border token types for halifax

interface BorderMojaOffLloydsOnTokens {
  : string;
}

interface BorderCardTokens {
  default: string;
  inverse: string;
}

interface BorderCheckboxTokens {
  default: string;
  selected: string;
  focusInner: string;
  focusOuter: string;
}

interface BorderIconsTokens {
  default: string;
  md: string;
  sm: string;
  xs: string;
  xxs: string;
}

interface BorderInputTokens {
  default: string;
  active: string;
}

interface BorderNoticeBannerTokens {
  default: string;
}

interface BorderRadioTokens {
  default: string;
  selected: string;
  focusInner: string;
  focusOuter: string;
}

interface BorderSelectorTokens {
  default: string;
  defaultInverse: string;
  unselected: string;
}

interface BorderTogglesTokens {
  outer: string;
  outerNone: string;
  inner: string;
}

interface BorderStepTokens {
  inner: string;
}

interface BorderTokens {
  mojaOffLloydsOn: BorderMojaOffLloydsOnTokens;
  card: BorderCardTokens;
  checkbox: BorderCheckboxTokens;
  icons: BorderIconsTokens;
  input: BorderInputTokens;
  noticeBanner: BorderNoticeBannerTokens;
  radio: BorderRadioTokens;
  selector: BorderSelectorTokens;
  toggles: BorderTogglesTokens;
  step: BorderStepTokens;
}

export { BorderTokens };