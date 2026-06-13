/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Semantic Token System
        primary: {
          50: "#F4F7F5",   // wiseBg
          100: "#9FE870",  // wiseLime
          200: "#8DE05C",
          300: "#7BD848",
          400: "#69D034",
          500: "#9FE870",  // Brand Match
          600: "#0D2B1B",  // Action Default (Forest Green)
          700: "#0A2215",  // Action Hover (Darker Forest Green)
          800: "#081A10",
          900: "#05110A",
          950: "#030905",
          DEFAULT: "#0D2B1B",
          foreground: "#9FE870",
        },
        wiseLime: "#9FE870",
        wiseForest: "#0D2B1B",
        wiseBg: "#F4F7F5",
        // Premium Grays (Cool/Slate mix)
        gray: {
          50: "#f8fafc", // Surface Field
          100: "#f1f5f9", // Surface Hover
          200: "#e2e8f0", // Borders
          300: "#cbd5e1",
          400: "#94a3b8", // Muted Text
          500: "#64748b",
          600: "#475569", // Body Text
          700: "#334155", // Headings
          800: "#1e293b",
          900: "#0f172a", // Black
        },
        surface: {
          DEFAULT: "#ffffff",
          subtle: "#f8fafc",
          muted: "#f1f5f9",
        },
        status: {
          success: "#10b981",
          error: "#ef4444",
          warning: "#f59e0b",
          info: "#3b82f6",
        }
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'premium': '0 2px 5px -1px rgba(0,0,0,0.08), 0 1px 3px -1px rgba(0,0,0,0.04)',
        'premium-hover': '0 8px 20px -4px rgba(0,0,0,0.12), 0 4px 8px -4px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
};
