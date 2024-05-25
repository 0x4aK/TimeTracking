import type { Config } from "tailwindcss";

export default {
  content: ["presets/**/*.{js,vue,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgb(var(--primary))",
          50: "rgb(var(--primary-50))",
          100: "rgb(var(--primary-100))",
          200: "rgb(var(--primary-200))",
          300: "rgb(var(--primary-300))",
          400: "rgb(var(--primary-400))",
          500: "rgb(var(--primary-500))",
          600: "rgb(var(--primary-600))",
          700: "rgb(var(--primary-700))",
          800: "rgb(var(--primary-800))",
          900: "rgb(var(--primary-900))",
          950: "rgb(var(--primary-950))",

          inverse: "rgb(var(--primary-inverse))",
          hover: "rgb(var(--primary-hover))",

          "active-color": "rgb(var(--primary-active-color))",

          highlight: {
            DEFAULT: "rgb(var(--primary)/var(--primary-highlight-opacity))",
            inverse: "rgb(var(--primary-highlight-inverse))",
            hover: "rgb(var(--primary)/var(--primary-highlight-hover-opacity))",
          },
        },
        surface: {
          0: "rgb(var(--surface-0))",
          50: "rgb(var(--surface-50))",
          100: "rgb(var(--surface-100))",
          200: "rgb(var(--surface-200))",
          300: "rgb(var(--surface-300))",
          400: "rgb(var(--surface-400))",
          500: "rgb(var(--surface-500))",
          600: "rgb(var(--surface-600))",
          700: "rgb(var(--surface-700))",
          800: "rgb(var(--surface-800))",
          900: "rgb(var(--surface-900))",
          950: "rgb(var(--surface-950))",
        },
      },
    },
  },
} satisfies Config;
