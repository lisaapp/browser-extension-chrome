import { crx } from '@crxjs/vite-plugin';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import manifest from './manifest.config';

export default defineConfig({
    resolve: {
        alias: {
            '~/': `${ path.resolve(__dirname, 'src') }/`
        }
    },
    css: {
        preprocessorOptions: {
            scss: {

                additionalData: `@use "~/styles/styles.scss" as *;`
            }
        }
    },
    build: {
        rollupOptions: {
            input: {
                main: 'src/html/popup.html'
            }
        }
    },
    server: {
        watch: {
            usePolling: true
        }
    },
    plugins: [
        vue({}),
        crx({ manifest }),
        Components({
            // allow auto load markdown components under `./src/components/`
            extensions: [ 'vue', 'md' ],
            // allow auto import and register components used in markdown
            include: [ /\.vue$/, /\.vue\?vue/, /\.md$/ ],
            resolvers: [
                ElementPlusResolver({
                    importStyle: 'sass'
                })
            ],
            dts: 'src/components.d.ts'
        })
        // ElementPlus({
        //     useSource: true
        // })
    ]
});
