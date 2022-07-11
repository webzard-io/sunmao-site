import * as path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sunmaoFsVitePlugin from './tools/sunmao-fs-vite-plugin';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: fileURLToPath(
          new URL('./index.html', import.meta.url)
        ),
        dev: fileURLToPath(
          new URL('./dev.html', import.meta.url)
        ),
      },
    },
  },

  plugins: [
    sunmaoFsVitePlugin({
      schemas: [
        {
          name: 'site',
          path: path.resolve(__dirname, './src/sunmao/site.json'),
        },
        {
          name: 'calendar',
          path: path.resolve(__dirname, './src/sunmao/calendar.json'),
        },
        {
          name: 'table',
          path: path.resolve(__dirname, './src/sunmao/table.json'),
        },
        {
          name: 'only-calendar',
          path: path.resolve(__dirname, './src/sunmao/only-calendar.json'),
        },
      ],
    }),
    react(),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(__dirname, 'public/icons')],
      // Specify symbolId format
      symbolId: 'icon-[name]',
    }),
  ],
});
