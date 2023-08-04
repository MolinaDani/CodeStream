/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      montserratLigth: ['Montserrat-Ligth', 'sans serif'],
      montserratRegular: ['Montserrat-Regular', 'sans serif'],
      montserratMedium: ['Montserrat-Medium', 'sans serif'],
      montserratBold: ['Montserrat-Bold', 'sans serif'],
      jetbrainsMono: ['Jetbrains-Mono', 'sans serif']
    }
  },
  plugins: [],
}

