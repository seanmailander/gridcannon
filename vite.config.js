import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import resolve from '@rollup/plugin-node-resolve'

export default defineConfig({
    plugins: [react(), resolve({
        extensions: ['.js', '.ts']
    })]
})