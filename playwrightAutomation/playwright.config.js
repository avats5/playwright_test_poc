import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  timeout: 60 * 1000,

  expect: {
    timeout: 60000,
  },

  reporter: [
    ['html'],
    ['junit', { outputFile: 'test-results/results.xml' }],
    ['json', { outputFile: 'test-results/results.json' }]
    
  ],

  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'off',
    trace: 'on',
  },
});