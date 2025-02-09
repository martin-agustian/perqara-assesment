module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2021, // Use the latest ECMAScript standard
    sourceType: 'module',
  },
  rules: {
    "vue/no-multiple-template-root": "off",
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended', // Vue 3 recommended rules
    'plugin:@typescript-eslint/recommended', // TypeScript recommended rules
  ],
  plugins: ['vue', '@typescript-eslint'],
};
