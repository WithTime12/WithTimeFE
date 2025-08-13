import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const target = env.VITE_API_BASE_URL;
    return {
        plugins: [react(), svgr({ include: '**/*.svg?react' }), tailwindcss()],
        server: {
            host: '0.0.0.0',
            port: 5173,
            proxy: {
                '/api': {
                    target,
                    changeOrigin: true,
                    secure: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            },
        },
        resolve: {
            alias: {
                '@': '/src',
            },
        },
    };
});
