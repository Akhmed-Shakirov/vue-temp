import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueMacros from 'unplugin-vue-macros'

export default defineConfig({
    plugins: [
        VueMacros.vite({
            plugins: {
                vue: vue({
                    script: {
                        defineModel: true
                    }
                })
            }
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@ui': fileURLToPath(new URL('./src/shared/ui', import.meta.url)),
            '@hook': fileURLToPath(new URL('./src/shared/hooks', import.meta.url)),
            '@store': fileURLToPath(new URL('./src/shared/stores', import.meta.url)),
            '@service': fileURLToPath(new URL('./src/shared/services', import.meta.url))
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                // additionalData: `@import "@/assets/scss/variables.scss";`
            }
        }
    },
})


// "unplugin-vue-macros": "^2.5.1",
// "@tsconfig/node18": "^18.2.0",
// "@types/node": "^18.17.0",
