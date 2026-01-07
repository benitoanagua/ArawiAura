import type { StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.stories.@(js|ts|svelte)"
  ],
  "addons": [
    "@storybook/addon-svelte-csf"
  ],
  "framework": "@storybook/sveltekit",
  "viteFinal": async (config) => {
    // Add global CSS
    config.css = config.css || {};
    config.css.preprocessorOptions = config.css.preprocessorOptions || {};
    config.css.preprocessorOptions.scss = config.css.preprocessorOptions.scss || {};
    
    // Allow Vite to access the lib directory for CSS imports
    config.server = config.server || {};
    config.server.fs = config.server.fs || {};
    config.server.fs.allow = [
      ...(config.server.fs.allow || []),
      "../src/lib"
    ];
    
    return config;
  }
};
export default config;