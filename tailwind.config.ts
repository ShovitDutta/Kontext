import type { Config } from "tailwindcss";
const config: Config = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            fontFamily: { sans: ["var(--font-poppins)"] },
            screens: { xs: "475px", sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1536px" },
            container: { center: true, padding: { DEFAULT: "1rem", sm: "2rem", lg: "4rem", xl: "5rem", "2xl": "6rem" } },
            colors: { primary: { 50: "#e6f1fe", 100: "#cce3fd", 200: "#99c7fb", 300: "#66aaf9", 400: "#338ef7", 500: "#0072f5", 600: "#005bc4", 700: "#004493", 800: "#002e62", 900: "#001731" } },
        },
    },
    plugins: [],
    darkMode: "class",
};
export default config;