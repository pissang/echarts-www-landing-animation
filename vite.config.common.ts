import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 'echarts-liquidfill': '/Users/lang/Develop/echarts-liquidfill',
      // zrender: '/Users/lang/Develop/zrender',
      // echarts: '/Users/lang/Develop/echarts',
    },
  },

  optimizeDeps: {
    // exclude: ['echarts-gl', 'echarts-wordcloud', 'echarts-liquidfill'],
  },
});
