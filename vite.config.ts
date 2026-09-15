import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'serve-user-photo',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const decodedUrl = decodeURIComponent(req.url || '');
            if (
              decodedUrl.includes('kailash off photo') ||
              decodedUrl.includes('kailash_off_photo') ||
              decodedUrl.includes('developer_avatar')
            ) {
              const searchPaths = [
                path.resolve(__dirname, 'public', 'kailash off photo.jpeg'),
                path.resolve(__dirname, 'public', 'kailash_off_photo.jpeg'),
                path.resolve(__dirname, 'kailash off photo.jpeg'),
                path.resolve(__dirname, 'kailash_off_photo.jpeg'),
                path.resolve(__dirname, 'src', 'assets', 'kailash off photo.jpeg'),
                path.resolve(__dirname, 'src', 'kailash off photo.jpeg'),
              ];
              for (const sp of searchPaths) {
                if (fs.existsSync(sp)) {
                  res.setHeader('Content-Type', 'image/jpeg');
                  return fs.createReadStream(sp).pipe(res);
                }
              }
            }
            next();
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
