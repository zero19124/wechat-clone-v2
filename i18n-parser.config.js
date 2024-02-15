module.exports = {
  input: ['app/**/*.{ts,tsx}'], // Specify the file patterns to be scanned
  output: 'app/locales/{{locale}}/{{ns}}.json', // Specify the output file pattern
  options: {
    removeUnusedKeys: true, // Remove unused translation keys
    sort: true, // Sort the keys alphabetically
    attr: { // Define the translation attributes to extract
      list: ['data-i18n'],
      extensions: ['.html', '.tsx'],
    },
    func: { // Define the translation functions to extract
      list: ['t', 'i18n.t'],
      extensions: ['.ts', '.tsx'],
    },
    trans: { // Define the translation functions for plurals
      list: ['t', 'i18n.t'],
      extensions: ['.ts', '.tsx'],
    },
  },
};