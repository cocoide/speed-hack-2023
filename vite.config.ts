import path from 'node:path';
import viteCompression from 'vite-plugin-compression';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import topLevelAwait from 'vite-plugin-top-level-await';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import { getFileList } from './tools/get_file_list';

const publicDir = path.resolve(__dirname, './public');
const getPublicFileList = async (targetPath: string) => {
  const filePaths = await getFileList(targetPath);
  const publicFiles = filePaths
    .map((filePath) => path.relative(publicDir, filePath))
    .map((filePath) => path.join('/', filePath));

  return publicFiles;
};

export default defineConfig(async () => {
  const videos = await getPublicFileList(path.resolve(publicDir, 'videos'));

  return {
    build: {
      assetsInlineLimit: 300,
      cssCodeSplit: true,
      cssTarget: 'es6',
      minify: true,
      rollupOptions: {
        output: {
          intro: 'const ENVIRONMENT = "production";',
        },
      },
      target: 'es2015',
    },
    plugins: [
      react(),
      chunkSplitPlugin(),
      topLevelAwait(),
      visualizer(),
      viteCompression(),
      ViteEjsPlugin({
        module: '/src/client/index.tsx',
        title: '買えるオーガニック',
        videos,
      }),
    ],
  };
});
