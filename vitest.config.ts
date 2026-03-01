import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['test/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'examples/**',
        'src/generated/**',
        'src/core/types.ts',
        'test/**',
        'dist/**',
        'node_modules/**'
      ],
    },
  },
});
