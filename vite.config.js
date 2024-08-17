import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css','resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: 'laravel.test', // node container in docker
        origin: 'http://localhost:5173', // exposed node container address
    },
});
