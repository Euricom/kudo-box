module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "prettier/@typescript-eslint", // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module" // Allows for the use of imports
  },
  plugins: [
    'import'
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts',],
      },
      alias: {
        map: [['@', './src'], ['@test', './test']],
        extensions: ['.ts', '.js', '.json'],
      },
    },
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",

      // ES

      // reducing complexity
      // see https://wecodetheweb.com/2016/11/05/improving-code-quality-using-eslint/
      complexity: [2, 6],
      'max-statements': [2, 18],
      'max-statements-per-line': [2, { max: 1 }],
      'max-nested-callbacks': [2, 3],
      'max-depth': [2, { max: 3 }],

      // Our taste
      'linebreak-style': 'off', // Don't play nicely with Windows.
      'no-plusplus': 'off',
      'no-restricted-globals': ['error', 'event', 'fdescribe'],
      'import/prefer-default-export': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'no-console': ['warn'],
      'no-debugger': ['warn'],

      // Typescript issues
      'lines-between-class-members': 'off',
      // Our taste for typescript
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/indent': 'off', // prettier is handling this
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      "no-useless-constructor":'off',
      "@typescript-eslint/consistent-type-assertions":'off',
      "class-methods-use-this":'off',
    },

};
