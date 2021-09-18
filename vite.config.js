import { defineConfig } from 'vite'
import resolve from '@rollup/plugin-node-resolve'

export default defineConfig({
    plugins: [resolve({
        extensions: ['.js', '.ts']
    })]
})