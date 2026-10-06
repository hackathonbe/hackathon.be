/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,ts}'],
  theme: {
    extend: {
      // Same tokens as the homepage design (see src/styles.css).
      colors: {
        ink: '#0B0E13',
        panel: '#12161D',
        fg: '#F3F5F7',
        muted: '#A3ACB9',
        accent: 'var(--accent)',
      },
      borderColor: {
        line: 'rgba(255,255,255,0.08)',
        'line-strong': 'rgba(255,255,255,0.18)',
      },
      fontFamily: {
        display: ["'Bricolage Grotesque'", "'Arial Black'", 'sans-serif'],
        sans: ["'IBM Plex Sans'", 'system-ui', 'sans-serif'],
        mono: ["'JetBrains Mono'", 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
