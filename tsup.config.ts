import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: {
      index: 'src/index.ts',
      webhooks: 'src/webhooks/index.ts',
    },
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    clean: true,
    splitting: false,
    target: 'node18',
    outDir: 'dist',
    treeshake: true,
    minify: false,
  },
]);
