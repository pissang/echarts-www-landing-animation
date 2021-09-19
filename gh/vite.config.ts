import { defineConfig } from 'vite';
import viteConfigCommon from '../vite.config.common';
import path from 'path';

export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, './dist'),
  },
  ...viteConfigCommon,
});
