import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

function nonBlockingCssPlugin() {
  return {
    name: 'non-blocking-css-plugin',
    apply: 'build' as const,
    enforce: 'post' as const,
    transformIndexHtml(html: string) {
      return html.replace(
        /<link\s+rel=["']stylesheet["']\s+crossorigin\s+href=["']([^"']+\.css)["']\s*\/?>|<link\s+rel=["']stylesheet["']\s+href=["']([^"']+\.css)["']\s*\/?>/gi,
        (_match, p1, p2) => {
          const href = p1 || p2;
          return [
            `<link rel="preload" href="${href}" as="style" crossorigin />`,
            `<link rel="stylesheet" href="${href}" media="print" onload="this.media='all'" crossorigin />`,
            `<noscript><link rel="stylesheet" href="${href}" /></noscript>`
          ].join('\n    ');
        }
      );
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), nonBlockingCssPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
      cssTarget: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
      modulePreload: false,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'vendor-react';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
            }
          },
        },
      },
      chunkSizeWarningLimit: 800,
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâ€”file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
