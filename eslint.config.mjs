import pluginJs from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {files: ['**/*.{js,ts}']},
  {languageOptions: {globals: globals.node}},
  {
    rules: {
      semi: ['error', 'always'],
      '@typescript-eslint/no-explicit-any': ['warn', {ignoreRestArgs: true}],
      'comma-dangle': ['error', 'never']
    }
  },
  {
    ignores: [
      'node_modules',
      'dist',
      'build',
      'coverage',
      '**/*.config.{js,ts}',
      'tsconfig.json',
      // @scf-region eslint-ignore
      // @end-scf-region
    ]
  }
];
