import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

function serveProjectsPlugin() {
  return {
    name: 'serve-projects',
    enforce: 'pre' as const,
    configureServer(server: import('vite').ViteDevServer) {
      const distProjects = path.resolve(process.cwd(), 'dist/projects')
      if (!fs.existsSync(distProjects)) return

      const types: Record<string, string> = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
      }

      server.middlewares.use((req, res, next) => {
        const m = req.url?.split('?')[0]?.match(/^\/projects\/([^/]+)\/?(.*)$/)
        if (!m) return next()
        const [, slug, rest = ''] = m
        const requestFile = rest || 'index.html'
        const filePath = path.join(distProjects, slug, requestFile)
        let toServe = filePath
        if (!fs.existsSync(filePath)) {
          const indexPath = path.join(distProjects, slug, 'index.html')
          if (fs.existsSync(indexPath)) toServe = indexPath
          else return next()
        }
        const ext = path.extname(toServe)
        res.setHeader('Content-Type', types[ext] || 'application/octet-stream')
        res.setHeader('Cache-Control', 'no-cache')
        res.end(fs.readFileSync(toServe))
      })
    },
  }
}

export default defineConfig({
  plugins: [serveProjectsPlugin(), react()],
  base: '/',
  server: {
    fs: { allow: [path.resolve(process.cwd(), 'dist')], strict: false },
  },
})
