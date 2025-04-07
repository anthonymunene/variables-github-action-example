type ItemTransformFn = (item: string) => string;
type ImportFormatFn = (transformedItem: string, originalItem: string) => string;
type ExportFormatFn = (
  transformedItem: string,
  index: number,
  array: string[],
) => string;

export interface CreateIndexConfig {
  type: 'css' | 'js' | 'ts';  // Restrict to valid types
  outputPath: string;
  items: string[];
  commentPrefix?: string;  // Optional with default value in the function
  importFormat: ImportFormatFn;
  exportFormat: ExportFormatFn;
  fileExtension?: string;  // Optional with default value in the function
  itemTransform?: ItemTransformFn;  // Optional with default value in the function
}

export type IndexCreatorFn = (brand: string, categories: string[], buildPath: string) => void
export type RootIndexCreatorFn = (brands: string[], buildPath: string) => void;
