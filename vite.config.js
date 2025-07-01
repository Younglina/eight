import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/eight',
  plugins: [
    vue(),
    UnoCSS({
      shortcuts: {
        'btn': 'px-4 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition-colors duration-300',
        'card': 'bg-amber-50 rounded-lg p-4 shadow-md border border-amber-200',
        'input': 'px-4 py-2 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500',
        'label': 'text-amber-800 font-medium mb-1 block',
        'title': 'text-2xl font-bold text-amber-900 mb-4',
        'subtitle': 'text-xl font-semibold text-amber-800 mb-3',
      },
      theme: {
        colors: {
          primary: {
            DEFAULT: '#B8860B', // 暗金色
            light: '#DAA520',   // 金色
            dark: '#8B6914',    // 深暗金色
          },
          secondary: {
            DEFAULT: '#800000', // 栗色
            light: '#A52A2A',   // 褐色
            dark: '#4B0000',    // 深栗色
          },
          background: {
            DEFAULT: '#FFF8E1', // 浅米色
            light: '#FFF9E6',   // 更浅的米色
            dark: '#F5E9C9',    // 深米色
          }
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    // Generate source maps for better debugging
    sourcemap: false,
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          iztro: ['iztro']
        }
      }
    },
    // Minify for better performance
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  // SEO and performance optimizations
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000'
    }
  }
})
