import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Modern Numerology Design Tokens
        mn: {
          bg: '#F8F7F4',
          surface: '#FFFFFF',
          'surface-subtle': '#F1EFFA',
          text: '#1C1B22',
          muted: '#706E78',
          primary: '#5146A5',
          'primary-hover': '#443A8C',
          gold: '#C59B45',
          'gold-soft': '#EFE2C2',
          border: '#E7E4DD',
          success: '#547A67',
          error: '#B45A58',
        },
        // Backward compatibility mappings
        brand: {
          primary: '#5146A5',
          'primary-hover': '#443A8C',
          gold: '#C59B45',
          'gold-light': '#EFE2C2',
          bg: '#F8F7F4',
          surface: '#FFFFFF',
          'surface-secondary': '#F1EFFA',
          text: '#1C1B22',
          'text-muted': '#706E78',
          border: '#E7E4DD',
          success: '#547A67',
          warning: '#C59B45',
          error: '#B45A58',
        },
      },
      transitionTimingFunction: {
        zen: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      boxShadow: {
        subtle: '0 1px 3px rgba(28, 27, 34, 0.04), 0 1px 2px rgba(28, 27, 34, 0.02)',
        card: '0 2px 8px rgba(28, 27, 34, 0.04)',
        hover: '0 4px 14px rgba(81, 70, 165, 0.08)',
        drawer: '-4px 0 24px rgba(28, 27, 34, 0.06)',
      },
      fontFamily: {
        serif: ['Fraunces', 'DM Serif Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
