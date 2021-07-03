import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // TODO build with rollup will fail to resolve zrender import
      zrender: path.resolve(__dirname, 'node_modules/zrender'),
      echarts: path.resolve(__dirname, 'node_modules/echarts'),
    },
  },

  optimizeDeps: {
    exclude: ['echarts-gl'],
  },
});
