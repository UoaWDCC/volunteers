import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window', // Fixes "global is not defined"
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'draft-js', 'react-draft-wysiwyg'],
  },
  resolve: {
    alias: {
      '@utils': '/src/utils',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@contexts': '/src/contexts',
      '@layouts': '/src/layouts',
    },
  },

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // backend port
        changeOrigin: true,
      }
    }
  }
});
