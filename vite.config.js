
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// import dts from 'vite-plugin-dts';

import { createHtmlPlugin } from 'vite-plugin-html';
// import {dancingFontUrl} from "./src/_inject";

import { visualizer } from 'rollup-plugin-visualizer';

// import externalize from 'vite-plugin-externalize-dependencies';

// import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.woff2'],
  resolve: {
    alias: {
      // Force Vite to resolve to the specific ESM index file directly
      // This sometimes helps Rollup break it apart better than the default entry point
      '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
    },
  },
  build: {
    minify: true,
    rollupOptions: {
      output: {
        // manualChunks: id => {
        //   if (id.includes('node_modules')) {
        //     return 'vendor';
        //   }
        //
        //   return null;
        // },
      },
      treeshake: {
        preset: 'smallest',
        moduleSideEffects: id => {
          // console.log(`id`, id);
          // If the module path matches dnd-kit, tell Rollup it has NO side effects.
          // This allows Rollup to delete the import entirely if the variable is unused.
          if (id.includes('@dnd-kit/')) {
            return false;
          }
          if (id.includes('tabler-icons') || id.includes('tabler/icons')) {
            return false; // Force side-effect free
          }
          // Return null to fall back to the default behavior for all other modules
          return null;
        },
      },
    },
  },
  plugins: [
    // tsconfigPaths(),
    react({
      jsxRuntime: 'automatic',
      // jsxImportSource: "@emotion/react",
      babel: {
        plugins: [
          // ['@emotion/babel-plugin'],
          ['@babel/plugin-proposal-decorators', { legacy: true }],
          ['@babel/plugin-transform-class-properties', { loose: false }],
        ],
        env: {
          development: {
            compact: false,
          },
        },
      },
    }),
    // dts({
    //   include: ["src/storage.ts"],
    //   outDir: "dtsss"
    // })
    createHtmlPlugin({
      minify: true,
      /**
       * After writing entry here, you will not need to add script tags in `index.html`, the original tags need to be deleted
       * @default src/main.ts
       */
      entry: '/src/_load.tsx',
      /**
       * If you want to store `index.html` in the specified folder, you can modify it, otherwise no configuration is required
       * @default index.html
       */
      template: 'index.html',

      /**
       * Data that needs to be injected into the index.html ejs template
       */
      inject: {
        data: {
          title: 'index',
          // injectScript: `<link rel="preload" as="font" href={dancingFontUrl} type="font/woff2" />`,
        },
        tags: [
          {
            injectTo: 'body-prepend',
            tag: 'div',
            attrs: {
              id: 'root-app-id',
            },
          },
        ],
      },
    }),
    visualizer({
      template: 'treemap', // or sunburst
      open: true, // will open the report in your browser automatically
      gzipSize: true, // shows the size of your files when gzipped (most relevant for web)
      brotliSize: true,
      filename: 'analyse.html', // name of the output file
    }),
  ],
  cacheDir: '.vite-cache',
  base: '/lang-helpers/',
  server: {
    watch: true,
  },
});
