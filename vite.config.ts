import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import viteConfigCommon from './vite.config.common';
import visualizer from 'rollup-plugin-visualizer';

export default defineConfig({
  build: {
    sourcemap: false,
    cssCodeSplit: false,
    chunkSizeWarningLimit: 1500,

    lib: {
      entry: path.resolve(__dirname, './src/main.ts'),
      formats: ['umd'],
      name: 'featureTrailer',
      fileName: (formats) => 'echarts-www-feature-trailer.js',
    },

    rollupOptions: {
      plugins: [
        visualizer({
          // open: true,
          sourcemap: false,
          gzipSize: true,
          brotliSize: true,
        }),
      ],
    },
  },

  ...viteConfigCommon,
});
