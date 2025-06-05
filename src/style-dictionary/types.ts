type ItemTransformFn = (item: string) => string;
type ImportFormatFn = (transformedItem: string, originalItem: string) => string;
type ExportFormatFn = (transformedItem: string, index: number, array: string[]) => string;

export interface CreateIndexConfig {
    type: 'ts';
    outputPath: string;
    items: string[];
    commentPrefix?: string;
    importFormat: ImportFormatFn;
    exportFormat: ExportFormatFn;
    fileExtension?: string;
    itemTransform?: ItemTransformFn;
}

export type IndexCreatorFn = (brand: string, categories: string[], buildPath: string) => void;
export type RootIndexCreatorFn = (brands: string[], buildPath: string) => void;
