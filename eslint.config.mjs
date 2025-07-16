import { defineConfig } from 'eslint/config';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default defineConfig([
  {
    extends: compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended'),

    plugins: {
      '@typescript-eslint': typescriptEslint
    },

    languageOptions: {
      globals: {
        ...globals.node
      },

      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',

      parserOptions: {
        project: './tsconfig.json'
      }
    },

    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json'
        }
      }
    },

    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_'
        }
      ],

      'prefer-const': 'warn',
      '@typescript-eslint/no-explicit-any': 'error',
      eqeqeq: ['error', 'always'],
      '@typescript-eslint/explicit-module-boundary-types': 'warn',

      'no-console': [
        'warn',
        {
          allow: ['info', 'warn', 'error']
        }
      ],

      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true
        }
      ],

      quotes: ['error', 'single'],
      'no-unsafe-finally': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn',

      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_'
        }
      ]
    }
  }
]);
