module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'standard-with-typescript'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    project: 'tsconfig.json'
  },
  plugins: ['react', 'prettier', 'react-hooks'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] }
    ],
    'comma-dangle': 'off',
    'multiline-ternary': 0,
    'space-before-function-paren': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/comma-dangle': 'warn',
    '@typescript-eslint/no-misused-promises': [
      'warn',
      {
        checksConditionals: false
      }
    ],
    '@typescript-eslint/no-floating-promises': 'warn',
    indent: 'off',
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/restrict-template-expressions': 'warn'
  }
}
