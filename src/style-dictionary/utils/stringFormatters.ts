// Utility functions for string manipulation
export const toCamelCase = (str: string) => {
    return str
        .replace(/\s+/g, '')
        .replace(/[-_.](.)/g, (_, char) => char.toUpperCase()) // Removed unnecessary escape for `.`
        .replace(/^(.)/, (_, char) => char.toLowerCase());
};

export const toPascalCase = (str: string) => {
    return str
        .replace(/[-_.](.)/g, (_, char) => char.toUpperCase()) // Removed unnecessary escape for `.`
        .replace(/^(.)/, (_, char) => char.toUpperCase());
};

export const toKebabCase = (str: string) => {
    // Handle null or undefined input
    if (!str) return '';

    // Step 1: Convert the entire string to lowercase
    let result = str.toLowerCase();

    // Step 2: Replace any special characters (except hyphens) with spaces
    result = result.replace(/[^\w\s-]/g, ' ');

    // Step 3: Replace underscores with spaces
    result = result.replace(/_/g, ' ');

    // Step 4: Replace all spaces with hyphens
    result = result.replace(/\s+/g, '-');

    // Step 5: Trim any leading/trailing hyphens
    result = result.replace(/^-+|-+$/g, '');

    // Step 6: Replace any instances of multiple consecutive hyphens with a single hyphen
    result = result.replace(/-{2,}/g, '-');

    return result;
};
