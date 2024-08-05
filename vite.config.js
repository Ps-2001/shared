import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: ``
      }
    }
  },
  resolve: {
    alias: {
      // Устанавливаем корневые директории для импортов
      '@/': path.resolve(__dirname, 'src/shared'),
    },
  },
})
