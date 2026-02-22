/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — The Commoner
        crimson: {
          DEFAULT: '#8B1A1A',
          light: '#A52020',
          dark: '#6B1414',
        },
        ink: {
          DEFAULT: '#1A1A1A',
          soft: '#2D2D2D',
          muted: '#555555',
        },
        parchment: {
          DEFAULT: '#ffffff',
          dark: '#ffffff',
        },
        rule: '#ffffff',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-source-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '68ch',
            color: '#1A1A1A',
            lineHeight: '1.75',
          },
        },
      },
    },
  },
  plugins: [],
};
