import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/unleash/index.ts', 'src/changeset/index.ts', 'src/**/scripts/*.ts'],
  format: ['cjs'],
  outExtension() {
    return {
      js: `.js`,
    };
  },
  target: 'es2020',
  sourcemap: process.env.NODE_ENV !== 'production',
  dts: true,
  clean: true,
});
