// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    // 빌드 과정에서 global 이 나오면 window 로 치환
    global: "window",
  },
  resolve: {
    alias: {
      // import 구문에 global 이 쓰이면 globalThis 로 매핑
      global: "globalThis",
    },
  },
});