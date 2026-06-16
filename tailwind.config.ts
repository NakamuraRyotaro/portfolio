import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-noto-jp)", "sans-serif"],
      },
      colors: {
        ink: {
          950: "#0A0A0B",
          900: "#111114",
          800: "#1A1A1E",
        },
        accent: {
          DEFAULT: "#10B981",
          cyan: "#22D3EE",
          violet: "#8B5CF6",
        },
      },
      keyframes: {
        aurora: {
          from: { backgroundPosition: "50% 50%, 50% 50%" },
          to: { backgroundPosition: "350% 50%, 350% 50%" },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
        scroll: {
          to: { transform: "translate(calc(-50% - 0.5rem))" },
        },
        shimmer: {
          "0%, 90%, 100%": { backgroundPosition: "calc(-100% - var(--shimmer-width)) 0" },
          "30%, 60%": { backgroundPosition: "calc(100% + var(--shimmer-width)) 0" },
        },
        spotlight: {
          "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)" },
          "100%": { opacity: "1", transform: "translate(-50%,-40%) scale(1)" },
        },
      },
      animation: {
        aurora: "aurora 60s linear infinite",
        meteor: "meteor 5s linear infinite",
        scroll: "scroll var(--animation-duration,40s) var(--animation-direction,forwards) linear infinite",
        spotlight: "spotlight 2s ease .75s 1 forwards",
      },
    },
  },
  plugins: [],
};

export default config;
