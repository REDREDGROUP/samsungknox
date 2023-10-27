import path from 'node:path';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      // you can include other reporters, but 'json-summary' is required, json is recommended
      reporter: ['text', 'json-summary', 'json'],
    },
    exclude: [...configDefaults.exclude],
  },
  resolve: {
    // alias: {
    //   "~": path.resolve(__dirname, "./src"),
    // },
  },
});
