import { crx } from '@crxjs/vite-plugin';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import manifest from './manifest.config';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: 'src/html/popup.html'
            }
        }
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    plugins: [
        vue({}),
        crx({ manifest })
    ]
});
