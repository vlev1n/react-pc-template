import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import WindiCSS from 'vite-plugin-windicss'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: [{ find: '@', replacement: path.resolve('./', 'src') }],
  },
  plugins: [react(), WindiCSS(), visualizer()],
  server: {
    proxy: {
      '/api': {
        target: 'https://new.icity24.xyz',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#3D7FFF',
        },
      },
    },
  },
})
