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
  },
};

export default preview;