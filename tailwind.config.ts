import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // <--- ISSO AQUI PEGA TUDO DENTRO DE SRC
  ],
  theme: {
    extend: {
      colors: {
        maithe: {
          light: '#f3e8ff',
          DEFAULT: '#d8b4fe',
          dark: '#7e22ce',
        }
      }
    },
  },
  plugins: [],
};
export default config;