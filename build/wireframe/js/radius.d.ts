// radius token types for wireframe

interface RadiusButtonTokens {
  default: string;
  focus: string;
}

interface RadiusCheckboxTokens {
  default: string;
  focus: string;
}

interface RadiusGenericTokens {
  none: string;
  2xs: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  circle: string;
}

interface RadiusNotificationTokens {
  default: string;
}

interface RadiusPanelTokens {
  default: string;
}

interface RadiusToggleTokens {
  inner: string;
  outer: string;
}

interface RadiusTokens {
  button: RadiusButtonTokens;
  checkbox: RadiusCheckboxTokens;
  generic: RadiusGenericTokens;
  notification: RadiusNotificationTokens;
  panel: RadiusPanelTokens;
  toggle: RadiusToggleTokens;
}

export { RadiusTokens };