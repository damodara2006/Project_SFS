/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand color
        'primary-accent': '#FF9900', // A rich, energetic orange

        // Neutral background colors for a soft, layered look
        'background-light': '#F7F8FC', // Very light gray for the main background
        'background-white': '#FFFFFF', // Pure white for cards and foreground elements

        // Text colors for clear hierarchy
        'text-primary': '#1A202C',   // Dark, almost black for main text
        'text-secondary': '#718096', // Muted gray for subheadings and labels
        'text-tertiary': '#A0AEC0',   // Lighter gray for less important info

        // Status and Action colors
        'action-blue': '#4299E1',
        'status-green': '#48BB78',
        'status-yellow': '#F6E05E',
        'border-color': '#E2E8F0',    // Subtle border color
      },
      fontFamily: {
        // Using a modern, clean system font stack
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem', // 16px
        '2xl': '1.5rem', // 24px
      },
      boxShadow: {
        // A soft, modern shadow for our cards
        'card': '0px 10px 30px -5px rgba(0, 0, 0, 0.07)',
        'card-hover': '0px 15px 40px -5px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}