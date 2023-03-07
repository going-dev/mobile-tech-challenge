const jsExtensions = [".js", ".jsx", ".json"];
const tsExtensions = [".ts", ".tsx", ".d.ts"];
const extensions = [...jsExtensions, ...tsExtensions];

module.exports = {
  env: {
    es6: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: "module",
    ecmaVersion: 2020,
    /**
     * These fields are required for using rules that require type information
     * To override them, you can play an `overrides` field in your config file
     *
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/parser/README.md#parseroptionsproject
     * @see https://typescript-eslint.io/docs/linting/typed-linting/monorepos#one-tsconfigjson-per-package-and-an-optional-one-in-the-root
     */
    tsconfigRootDir: process.cwd(),
    project: ["./tsconfig.json"],
  },
  extends: [
    /**
     * Use recommended eslint rules
     * @see https://eslint.org/docs/rules
     */
    "eslint:recommended",
    /**
     * Recommended TypeScript eslint rules
     * @see https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#recommended-configs
     */
    "plugin:@typescript-eslint/recommended",
    /**
     * Lint with Type information
     * NOTE: with this enabled, the linter compiles your project first. this can take up to 30 seconds.
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/TYPED_LINTING.md
     */
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    /**
     * Use recommended import rules
     * @see https://github.com/benmosher/eslint-plugin-import#typescript
     */
    "plugin:import/recommended",
    "plugin:import/typescript",
    /**
     * Use React recommended rules
     * @see https://github.com/yannickcr/eslint-plugin-react
     */
    "plugin:react/recommended",
    /**
     * Use React Hooks recommended rules
     * @see https://github.com/facebook/react/tree/master/packages/eslint-plugin-react-hooks
     */
    "plugin:react-hooks/recommended",
    /**
     * Use Prettier
     * @see https://github.com/prettier/eslint-plugin-prettier#options
     */
    "plugin:prettier/recommended",
  ],
  plugins: [
    /**
     * Use unused-imports
     * @see https://github.com/sweepline/eslint-plugin-unused-imports
     */
    "unused-imports",
  ],
  rules: {
    /**
     * Disallow variables being used outside of the block in which they were defined
     * @see https://eslint.org/docs/rules/block-scoped-var
     */
    "block-scoped-var": "error",
    /**
     * Disallow extending native JS objects
     * @see https://eslint.org/docs/rules/no-extend-native#disallow-extending-of-native-objects-no-extend-native
     */
    "no-extend-native": "error",
    /**
     * The __proto__ property has been deprecated and shouldn't be used in code
     * @see https://eslint.org/docs/rules/no-proto#disallow-use-of-__proto__-no-proto
     */
    "no-proto": "error",
    /**
     * Enforce usage of 'let' or 'const'
     * @see https://eslint.org/docs/rules/no-var#require-let-or-const-instead-of-var-no-var
     */
    "no-var": "error",
    /**
     * Disallow 'yoda' conditions where the literal value of the condition comes before the variable, which can cause mistaken use of logical operators
     * @see https://eslint.org/docs/rules/yoda#require-or-disallow-yoda-conditions-yoda
     * @example
     * "red" === color // incorrect
     * color === "red" // correct
     */
    yoda: "error",
    /**
     * Remove unused imports
     * @see https://github.com/sweepline/eslint-plugin-unused-imports#usage
     */
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    /**
     * ES2015 provides a default class constructor if one isn't specified, so it's unnecessary to provide an empty one
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-useless-constructor.md
     */
    "no-useless-constructor": "off",
    "@typescript-eslint/no-useless-constructor": ["error"],
    /**
     * Don't enforce unbound methods -- this rule can fire incorrectly on React libraries that expose hooks
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/unbound-method.md
     * @example
     * const { foo } = useHookFromSomeLib()
     * ^ error is thrown here because the lib hook may not be annotated the exact way required to prevent this error from firing incorrectly
     */
    "@typescript-eslint/unbound-method": "off",
    /**
     * Require explicit return types on functions and class methods
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
     */
    "@typescript-eslint/explicit-function-return-type": "warn",
    /**
     * Enforce template literal expressions to be of string type.
     * We allow nullish values because this rule throws an error even if you are properly checking against null/undefined.
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/v4.22.0/packages/eslint-plugin/docs/rules/restrict-template-expressions.md
     */
    "@typescript-eslint/restrict-template-expressions": [
      "error",
      {
        allowNullish: true,
      },
    ],
    /**
     * Mark ts-comments with a warning so long as they have a description - otherwise they will throw an error
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/v4.22.0/packages/eslint-plugin/docs/rules/ban-ts-comment.md
     */
    "@typescript-eslint/ban-ts-comment": [
      "error",
      {
        "ts-expect-error": "allow-with-description",
        "ts-ignore": "allow-with-description",
        "ts-nocheck": "allow-with-description",
        "ts-check": false,
      },
    ],
    /**
     * Allow the use of the 'void' operator on a Promise function and allow skipping of async IIFEs
     * This rule directly contradicts the way promises are expected to be called within the `useEffect` hook in React, these 2 options allow bypassing without disabling the rule
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-floating-promises.md
     */
    "@typescript-eslint/no-floating-promises": [
      "error",
      {
        ignoreVoid: true,
        ignoreIIFE: true,
      },
    ],
    /**
     * Allow the use of require statements -- for some reason, this lint error will throw even with correct usage re: dynamic imports.
     * @see https://typescript-eslint.io/rules/no-var-requires/
     */
    "@typescript-eslint/no-var-requires": "off",
    /**
     * Don't check promises expecting void return -- this gets thrown on React hooks, which is incorrect since it's valid to pass async arguments to useCallback.
     *
     * @see https://typescript-eslint.io/rules/no-misused-promises
     */
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],
    /**
     * Use consistent type imports
     * @see https://typescript-eslint.io/rules/consistent-type-imports/
     */
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports", disallowTypeAnnotations: true },
    ],
    /**
     * These import rules are redundant, as TypeScript provides the same checks as part of standard type checking
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/FAQ.md#eslint-plugin-import
     */
    "import/named": "off",
    "import/namespace": "off",
    "import/default": "off",
    "import/no-named-as-default-member": "off",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "parent", "sibling", "index"],
        pathGroups: [
          {
            pattern: "~/**",
            group: "parent",
          },
        ],
      },
    ],
    /**
     * Turn off PropTypes since most of the time, we're using TypeScript
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md
     */
    "react/prop-types": "off",
    /**
     *  Don't require display names used with React.createClass({}) or React.Component
     * since we mostly use function components with hooks, this is not necessary
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/display-name.md
     */
    "react/display-name": "off",
    /**
     * No longer necessary with JSX automatic transform
     * @see https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#eslint
     */
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
  },
  settings: {
    /**
     * Tell import which file extensions to look for
     * @see https://github.com/benmosher/eslint-plugin-import#importextensions
     */
    "import/extensions": tsExtensions,
    /**
     * Tell import which files to look for
     * @see https://github.com/benmosher/eslint-plugin-import#resolvers
     */
    "import/resolver": {
      node: {
        extensions: extensions,
        paths: ["./src", "./assets"],
      },
      /**
       * Enable babel-plugin-module-resolver for resolving aliases
       * @see https://github.com/tleunen/babel-plugin-module-resolver
       */
      "babel-module": {},
      /**
       * Load tsconfig.json to eslint
       * @see https://github.com/benmosher/eslint-plugin-import/issues/1485#issuecomment-571597574
       */
      typescript: {
        alwaysTryTypes: true,
        project: "tsconfig.json",
      },
    },
    /**
     * Tell import to use typescript-eslint
     * @see https://github.com/benmosher/eslint-plugin-import#importparsers
     */
    "import/parsers": {
      "@typescript-eslint/parser": tsExtensions,
    },
    /**
     * Set the React settings
     * @see https://github.com/yannickcr/eslint-plugin-react#configuration
     */
    react: {
      version: "detect", // Automatically picks the React version installed
    },
  },
  ignorePatterns: ["**/*.js", "node_modules", "coverage", ".turbo"],
};
