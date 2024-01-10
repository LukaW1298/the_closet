module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2024: true
  },
  plugins: [
    "vue",
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended'
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  rules: {
    'vue/no-deprecated-slot-attribute': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
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
  }
}
