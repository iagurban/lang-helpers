
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// import dts from 'vite-plugin-dts';

import { createHtmlPlugin } from 'vite-plugin-html';
// import {dancingFontUrl} from "./src/_inject";

import { visualizer } from 'rollup-plugin-visualizer';
import { createRequire } from 'module';

// import externalize from 'vite-plugin-externalize-dependencies';

// import tsconfigPaths from 'vite-tsconfig-paths';

const require = createRequire(import.meta.url);

// 1. Calculate the path to the ESM version
// We grab the CJS path from Yarn, then string-replace to find the ESM file.
const mantineCjsPath = require.resolve('@mantine/core');
const mantineEsmPath = mantineCjsPath
  .replace('/cjs/', '/esm/')
  .replace('.js', '.mjs') // Mantine 7+ uses .mjs for ESM
  .replace('.cjs', '.mjs');

const tablerCjsPath = require.resolve('@tabler/icons-react');
const tablerEsmPath = tablerCjsPath
  .replace('/cjs/', '/esm/')
  .replace('.js', '.mjs')
  .replace('.cjs', '.mjs');

const chunks = {
  mantine: [{ i: `node_modules/@mantine` }, { i: `node_modules/@floating-ui` }],
  individuals: [
    { i: `node_modules/zod` },
    { i: `node_modules/@grbn/kit` },
    { i: `node_modules/chroma` },
    { i: `node_modules/safe-stable-stringify` },
    { i: `node_modules/mobx/` },
  ],
  lodash: [{ i: `node_modules/lodash-es` }], // used only on English table, loaded lazily when the table opened
  // react: [{ i: `node_modules/react` }, { i: `node_modules/mobx` }, { i: `node_modules/scheduler` }],
};

const chunkName = (id) => {
  for (const [name, items] of Object.entries(chunks)) {
    for (const item of items) {
      if (Object.keys(item).length !== 1) {
        throw new Error(`Invalid chunk item: ${item}`);
      }
      const { i, e, regex } = item;
      if (i != null) {
        if (id.includes(i)) {
          return name;
        }
      } else if (e != null) {
        if (id.endsWith(e)) {
          return name;
        }
      } else if (regex != null) {
        if (regex.test(id)) {
          return name;
        }
      } else {
        throw new Error(`[unreachable]: programming error, invalid chunk item: ${JSON.stringify(item)}`);
      }
    }
  }
  return null;
};

const visualizerRawConfig = {
  template: 'raw-data', // or sunburst
  // open: true, // will open the report in your browser automatically
  gzipSize: true, // shows the size of your files when gzipped (most relevant for web)
  brotliSize: true,
  filename: 'stats.json', // name of the output file
};

const visualizerHtmlConfigBase = {
  open: true, // will open the report in your browser automatically
  gzipSize: true, // shows the size of your files when gzipped (most relevant for web)
  brotliSize: true,
  filename: 'analyse.html', // name of the output file
};

const visualizerHtmlCircleConfig = {
  template: 'sunburst', // "sunburst" | "treemap" | "network" | "raw-data" | "list" | "flamegraph"
  ...visualizerHtmlConfigBase
};

const visualizerHtmlMapConfig = {
  template: 'flamegraph', // "sunburst" | "treemap" | "network" | "raw-data" | "list" | "flamegraph"
  ...visualizerHtmlConfigBase,
};

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.woff2'],
  resolve: {
    alias: [
      {
        find: /^@mantine\/core$/,
        replacement: mantineEsmPath,
      },
      {
        find: /^@tabler\/icons-react$/,
        replacement: tablerEsmPath,
      },
    ],
  },
  build: {
    minify: true,
    target: `es2020`,
    rollupOptions: {
      output: {
        manualChunks: id => {
          const name = chunkName(id);
          if (name) {
            return name;
          }

          if (id.includes('/node_modules/')) {
            return 'vendor';
          }

          return null;
        },
      },
      treeshake: {
        preset: 'smallest',
        moduleSideEffects: id => {

          // if (id.includes('grbn') || id.includes('kit')) {
          //   console.log('Vite sees:', id);
          // }

          // console.log(`id`, id);
          // If the module path matches dnd-kit, tell Rollup it has NO side effects.
          // This allows Rollup to delete the import entirely if the variable is unused.
          if (id.includes('@dnd-kit/')) {
            return false;
          }

          if (id.includes('@grbn/kit')) {
            return false;
          }

          if (id.includes('lodash-es')) {
            return false;
          }

          if (
            id.includes('tabler-icons') ||
            id.includes('tabler/icons') ||
            id.includes('@tabler/icons-react')
          ) {
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
    visualizer(visualizerHtmlMapConfig),
  ],
  cacheDir: '.vite-cache',
  base: '/lang-helpers/',
  server: {
    watch: true,
  },
});
