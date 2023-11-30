import dts from "vite-plugin-dts"
import { defineConfig } from 'vite'
import { extname, relative ,resolve } from "path"
import { fileURLToPath } from "url";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { glob } from "glob"
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ["es"]
    },
    rollupOptions: {
      external: ["react", 'react/jsx-runtime'],
      input: Object.fromEntries(
               glob.sync('lib/**/!(*.spec).{ts,tsx}').map(file => [
                 relative(
                   'lib',
                   file.slice(0, file.length - extname(file).length)
                 ),
                 fileURLToPath(new URL(file, import.meta.url))
               ])
      ),
      output: {
               assetFileNames: 'assets/[name][extname]',
               entryFileNames: '[name].js',
      }
    }
  },
  plugins: [react(), libInjectCss() ,dts({include: ['lib']})],
})
