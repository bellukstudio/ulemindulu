import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [laravel({
        input: ['resources/css/app.css', 'resources/js/frontend/app.jsx', 'resources/js/app.js'],
        refresh: true,
    }), tailwindcss(), react()],
    build: {
        outDir: "public/build",
        rollupOptions: {
            input: {
                basic: 'resources/js/templates/basic/main.jsx',
            }
        }
    },

});
