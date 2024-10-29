import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    optimizeDeps: {
        exclude: ['electron'], // 告诉 Vite 排除预构建 electron，不然会出现 __diranme is not defined
    },
    manifest: true,  //配置后才能让编译后的vue路径被正确识别
    plugins: [
        vue(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            'vue': 'vue/dist/vue.esm-bundler.js'
        }
    },
    server: {
        host: '0.0.0.0',//ip地址
        port: 9001, // 设置服务启动端口号
        open: false, // 设置服务启动时是否自动打开浏览器
    },
    build: {
        chunkSizeWarningLimit: 1500,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                }
            }
        }
    },

})


