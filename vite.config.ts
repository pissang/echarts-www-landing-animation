import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import viteConfigCommon from './vite.config.common';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/main.ts'),
      formats: ['iife'],
      name: 'indexAnimation',
    },
  },

  ...viteConfigCommon,
});
