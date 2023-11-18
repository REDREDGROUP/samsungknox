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
  sourcemap: process.env.NODE_ENV !== 'production',
  dts: true,
  clean: true,
});
