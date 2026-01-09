import type { StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.stories.@(js|ts|svelte)"
  ],
  "addons": [
    "@storybook/addon-svelte-csf"
  ],
  "staticDirs": ["../static"],
  "framework": "@storybook/sveltekit",
  "viteFinal": async (config) => {
    const { resolve } = await import('path');

    // Add global CSS
    config.css = config.css || {};
    config.css.preprocessorOptions = config.css.preprocessorOptions || {};
    config.css.preprocessorOptions.scss = config.css.preprocessorOptions.scss || {};

    // Allow Vite to access the project root and static directory
    config.server = config.server || {};
    config.server.fs = config.server.fs || {};
    config.server.fs.allow = [
      ...(config.server.fs.allow || []),
      resolve(process.cwd(), 'static'),
      resolve(process.cwd(), 'src')
    ];

    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '$static': resolve(process.cwd(), 'static'),
      '/static': resolve(process.cwd(), 'static'),
    };

    return config;
  }
};
export default config;