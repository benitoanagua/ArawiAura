import type { Preview } from '@storybook/sveltekit'

// Import global CSS and theme variables
import '../static/css/material-theme.css'
import '../static/app.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#fff7ff' },
        { name: 'dark', value: '#151218' },
      ],
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'circlehollow', title: 'Light' },
          { value: 'dark', icon: 'circle', title: 'Dark' },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    (storyFn, context) => {
      const { theme } = context.globals;
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', theme || 'light');
      }
      return storyFn();
    },
  ],
};

export default preview;