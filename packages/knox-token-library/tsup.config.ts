import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  outExtension() {
    return {
      js: `.mjs`,
    };
  },
  target: 'esnext',
  sourcemap: true,
  dts: true,
  clean: true,
});
