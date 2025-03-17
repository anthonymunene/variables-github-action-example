// controls token types for moja

interface ControlsStringsTokens {
  brandIcon: string;
  brandIllustration: string;
  trustPilot: string;
  url: string;
  cTALog in: string;
  iconSize: string;
}

interface ControlsBooleanTokens {
  appearanceMojaTrue: string;
  appearanceMojaFalse: string;
  appearanceBosTrue: string;
  appearanceBosFalse: string;
  appearanceIconHide: string;
  logoMoja: string;
  logoLloyds: string;
  logoBos: string;
  logoHalifax: string;
  logoBrand: string;
  footerGraphic: string;
  footerLogoWithTp: string;
}

interface ControlsTokens {
  strings: ControlsStringsTokens;
  boolean: ControlsBooleanTokens;
}

export { ControlsTokens };