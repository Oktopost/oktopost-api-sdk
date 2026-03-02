import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    webhooks: 'src/webhooks/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  target: 'node20',
  outDir: 'dist',
  treeshake: true,
  minify: false,
  hash: false,
});
