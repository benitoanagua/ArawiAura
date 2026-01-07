import type { Preview } from '@storybook/sveltekit'

// Import global CSS with CSS custom properties
import '../src/lib/global.css'

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