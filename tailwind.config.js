// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        base: "var(--color-base)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        muted: "var(--color-muted)",
      },
      textColor: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        muted: "var(--text-muted)",
        invert: "var(--text-invert)",
      },
      fontFamily: {
        sans: "var(--font-sans)",
        display: "var(--font-display)",
        mono: "var(--font-mono)",
        inter: "var(--font-inter)",
        roboto: "var(--font-roboto)",
        nunito: "var(--font-nunito)",
        poppins: "var(--font-poppins)",
        league: "var(--font-league)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        medium: "var(--shadow-medium)",
        hard: "var(--shadow-hard)",
      },
      backgroundImage: {
        'gradient-main': "var(--gradient-main)",
        'gradient-accent': "var(--gradient-accent)",
        'gradient-muted': "var(--gradient-muted)",
      },
      animation: {
        'spin-slow': 'spin 6s linear infinite',
      },
    },
  },
  darkMode: "class", // penting biar var(--dark) aktif
  plugins: [],
}
