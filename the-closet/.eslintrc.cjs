module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
        es2024: true
    },
    plugins: [
        "vue",
        '@typescript-eslint',
        '@stylistic',
        "unicorn"
    ],
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        'plugin:vue/vue3-recommended',
        '@vue/typescript/recommended',
        'plugin:unicorn/recommended'
    ],
    parser: "vue-eslint-parser",
    parserOptions: {parser: '@typescript-eslint/parser',},
    rules: {
        "@stylistic/semi": "warn",
        "@stylistic/spaced-comment": ["warn", "always"],
        "@stylistic/object-curly-newline": [
            "error", {"ObjectExpression": {minProperties: 2}}
        ],
        "@stylistic/indent": ["warn", 4, {"ObjectExpression": "first"}],
        '@stylistic/object-property-newline': "warn",
        '@stylistic/lines-around-comment': ["warn", {
            "beforeBlockComment": true,
            "beforeLineComment": true
        }],
        "@stylistic/brace-style": ["warn", "stroustrup"],
        "@stylistic/comma-spacing": ["warn", {
            "before": false,
            "after": true 
        }],
        "@stylistic/comma-style": ["warn", "last"],
        "@stylistic/padding-line-between-statements": ["warn",
            {
                blankLine: "always",
                prev: "*",
                next: "return" 
            },
            {
                blankLine: "always",
                prev: "*",
                next: "block" 
            },
            {
                blankLine: "always",
                prev: "*",
                next: "block-like" 
            },
            {
                blankLine: "always",
                prev: "*",
                next: "const" 
            },
            {
                blankLine: "any",
                prev: "const",
                next: "const" 
            },
            {
                blankLine: "always",
                prev: "*",
                next: "for" 
            },
            {
                blankLine: "always",
                prev: "*",
                next: "function" 
            }
        ],

        // possible problems
        'no-await-in-loop': "error",
        "array-callback-return": "error",
        "no-duplicate-imports": "error",
        // eslint suggestions
        "no-lonely-if": "error",
        "sort-vars": "warn",
        "sort-keys": "warn",
        "arrow-body-style": ["warn", "always"],
        "block-scoped-var": "error",
        "camelcase": "warn",
        "no-invalid-this": "warn",
        "no-unused-expressions": "warn",
        "no-useless-return": "warn",
        "complexity": ["warn", 20],

        // unicorn plugin
        'unicorn/filename-case': "off",
        'unicorn/prevent-abbreviations': "off",

        // vue/ts specific rules
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
            blankLine: 'consistent',
            prev: '*',
            next: '*'
        }]],
        "vue/prefer-define-options": "warn",
        "vue/prefer-separate-static-class": "warn",
        "vue/prefer-true-attribute-shorthand": "warn",
        "vue/v-on-handler-style": "warn",
        "vue/max-attributes-per-line": ["warn", {
            "singleline": {"max": 2},
            "multiline": {"max": 2}
        }]
    }
};
