/** @type {import("prettier").Config} */
const prettierConfig = {
    semi: true, // Always add semicolons
    tabWidth: 4, // Use 4 spaces per indentation level
    useTabs: false, // Consistent with Next.js ecosystem (spaces over tabs)
    printWidth: 400, // Wrap lines at 400 chars for readability
    singleQuote: true, // Use single quotes in JS/TS
    bracketSpacing: true, // { foo: bar } not {foo: bar}
    jsxSingleQuote: false, // But keep double quotes in JSX (HTML-like consistency)
    bracketSameLine: false, // Put `>` of JSX on its own line
    singleAttributePerLine: true, // Break long JSX props onto separate lines for readability
    endOfLine: 'lf', // Consistent LF endings (Unix-style, cross-platform safe)
    trailingComma: 'all', // Multiline objects, arrays, etc., get trailing commas
    proseWrap: 'preserve', // Don't auto-wrap markdown text
    arrowParens: 'always', // (x) => x for clarity and consistency
    htmlWhitespaceSensitivity: 'css', // Respect CSS display settings in formatting
    embeddedLanguageFormatting: 'auto', // Let Prettier handle embedded blocks
    overrides: [
        { files: '*.json', options: { printWidth: 200 } },
        { files: '*.md', options: { proseWrap: 'always' } },
    ],
};
export default prettierConfig;
