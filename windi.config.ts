import { defineConfig } from 'vite-plugin-windicss';

export default defineConfig({
  theme: {
    colors: {
      blue: 'hsl(220, 98%, 61%)',
      cyan: 'hsl(192, 100%, 67%)',
      pink: 'hsl(280, 87%, 65%)',
      slate: {
        100: 'hsl(236, 33%, 92%)',
        200: 'hsl(234, 39%, 85%)',
        500: 'hsl(234, 11%, 52%)',
        600: 'hsl(233, 14%, 35%)',
        700: 'hsl(237, 14%, 26%)',
        800: 'hsl(235, 24%, 19%)',
        900: 'hsl(235, 21%, 11%)',
      },
      transparent: 'transparent',
      white: 'hsl(0, 100%, 100%)',
    },
    fontFamily: {
      josefin: ['Josifin Sans', 'sans-serif'],
    },
  },
});
