// size token types for bos

interface SizeSmButtonTokens {
  minHeight: string;
}

interface SizeTileTokens {
  minHeight: string;
}

interface SizeHelphubTokens {
  navHeight: string;
}

interface SizeBorderTokens {
  buttonFocus: string;
}

interface SizeTokens {
  smButton: SizeSmButtonTokens;
  tile: SizeTileTokens;
  helphub: SizeHelphubTokens;
  border: SizeBorderTokens;
}

export { SizeTokens };