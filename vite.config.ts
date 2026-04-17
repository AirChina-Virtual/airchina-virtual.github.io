import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    // For GitHub Pages project sites, set BASE_PATH to "/<repo-name>/".
    // For user/organization sites (<user>.github.io), keep it as "/".
    base: process.env.BASE_PATH ?? '/',
    plugins: [
        react({
            babel: {
                plugins: [['babel-plugin-react-compiler']],
            },
        }),
        tailwindcss(),
    ],
    server: {
        host: '0.0.0.0',
        port: 3000
    }
})
