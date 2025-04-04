import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
    base: '/admin/',
    esbuild: {
        logOverride: { "this-is-undefined-in-esm": "silent" }
    },
    build: {
        outDir: "./build",
        target: "ESNEXT",
        sourcemap: true
    },
    optimizeDeps: { include: ["react/jsx-runtime"] },
    plugins: [
        react({})
    ]
})
