import * as path from "path";
import * as fs from "fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sunmaoFsVitePlugin from "./tools/sunmao-fs-vite-plugin";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/installer/api": "http://192.168.28.253",
    },
  },
  plugins: [
    sunmaoFsVitePlugin({
      schemas: [
        {
          name: "site",
          path: path.resolve(__dirname, "./src/sunmao/site.json"),
        },
        {
          name: "calendar",
          path: path.resolve(__dirname, "./src/sunmao/calendar.json"),
        },
        {
          name: "table",
          path: path.resolve(__dirname, "./src/sunmao/table.json"),
        },
      ],
    }),
    react(),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(__dirname, "public/icons")],
      // Specify symbolId format
      symbolId: "icon-[name]",
    }),
  ],
});
