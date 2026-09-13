import type { Preview } from '@storybook/sveltekit';
import siteTheme from './siteTheme';

import '../src/lib/styles/media-queries.css';
import '../src/lib/styles/resets.css';
import '../src/lib/styles/utilities.css';
import '../src/lib/styles/colors.css';
import '../src/lib/styles/variables.css';
import '../src/lib/styles/typography.css';
import '../src/lib/styles/globals.css';
import { themes } from 'storybook/theming';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    layout: 'centered',
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },
    docs: {
      theme: siteTheme
    }
  }
};

export default preview;
