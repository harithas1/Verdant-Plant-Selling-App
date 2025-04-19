import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@/components": path.resolve(__dirname, "src/components"),
      },
    },
    // You don't need to load env manually, Vite does it for you.
    // The following will make the environment variables available in your app.
    define: {
      "process.env": {
        VITE_RAZOR_PAY_KEY: process.env.VITE_RAZOR_PAY_KEY,
        VITE_BACKEND_URL: process.env.VITE_BACKEND_URL,
      },
    },
    // Vite automatically loads the .env file and provides values to import.meta.env
    server: {
      // Additional server settings (if needed)
    },
  };
});
