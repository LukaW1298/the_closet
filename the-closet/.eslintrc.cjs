module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2024: true
  },
  plugins: ['@typescript-eslint'],
  'extends': [
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: require.resolve('@typescript-eslint/parser'),
    extraFileExtensions: ['.vue'],
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-deprecated-slot-attribute': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "vue/block-order": ["warn", {
      "order": [["script", "template"], "style"]
    }],
    "vue/block-tag-newline": ["warn", {
      "singleline": "always",
      "multiline": "always"
    }
    ],
    "vue/component-api-style": ["warn",
      ["script-setup"]
    ],
    "vue/no-empty-component-block": "warn",
    "vue/no-ref-object-reactivity-loss": "error",
    "vue/no-setup-props-reactivity-loss": "error",
    "vue/no-static-inline-styles": "warn",
    "vue/no-undef-properties": "error",
    "vue/no-unused-refs": "warn",
    "vue/no-useless-v-bind": "warn",
    "vue/no-useless-mustaches": "warn",
    "vue/padding-line-between-tags": ["warn", [{
      blankLine: 'consistent', prev: '*', next: '*'
    }]],
    "vue/prefer-define-options": "warn",
    "vue/prefer-separate-static-class": "warn",
    "vue/prefer-true-attribute-shorthand": "warn",
    "vue/v-on-handler-style": "warn",
    "vue/max-attributes-per-line": ["warn", {
      "singleline": {
        "max": 2
      },      
      "multiline": {
        "max": 2
      }
    }]
  },
  overrides: [{
    files: ['*.ts', '*.tsx'],
    rules: {
      // The core 'no-unused-vars' rules (in the eslint:recommeded ruleset)
      // does not work with type definitions
      'no-unused-vars': 'off',
    }
  }]
}
