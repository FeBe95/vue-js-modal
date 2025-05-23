import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import eslintPluginVue from 'eslint-plugin-vue'
import eslintPluginVuePrettier from '@vue/eslint-config-prettier'
import globals from 'globals'

export default defineConfig([
  js.configs.recommended,
  ...eslintPluginVue.configs['flat/recommended'],
  eslintPluginVuePrettier, // includes prettier/recommended
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      'vue/order-in-components': 'off',
      'vue/no-v-html': 'off',
      'no-console': 'off',
      'no-debugger': 'off',
      camelcase: 'warn'
    }
  }
])
