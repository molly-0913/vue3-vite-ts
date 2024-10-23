import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import dayjs from 'dayjs'
import pkg from './package.json'
import createVitePlugins from './vite'
// 👇 用于将外部导入转换为全局变量 👇
// import externalGlobals from 'rollup-plugin-external-globals'

// https://vitejs.dev/config/
export default ({ mode, command }: any) => {
  const env = loadEnv(mode, process.cwd())
  // 全局 scss 资源
  const scssResources: string[] = []

  return defineConfig({
    // base: '/',
    // 开发服务器选项 https://cn.vitejs.dev/config/#server-options
    server: {
      open: true,
      port: Number(env.VITE_APP_PORT),
      proxy: {
        '/api': {
          target: env.VITE_APP_API_BASEURL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/\/api/, '')
        }
      }
    },
    // 构建选项 https://cn.vitejs.dev/config/#server-fsserve-root
    build: {
      minify: 'terser',
      outDir: `dist/${mode}`,
      sourcemap: env.VITE_BUILD_SOURCEMAP === 'true',
      target: ['es2015', 'ios11'],
      terserOptions: {
        compress: {
          drop_console: env.NODE_ENV !== 'fat', // 移除 console 输出
          drop_debugger: true, // 移除 debugger 语句
          pure_funcs: ['console.log'], // 移除指定函数调用
          passes: 2 // 压缩时进行多次优化传递
        },
        mangle: {
          properties: false // 防止混淆类名和属性名
        },
        format: {
          comments: false // 移除所有注释
        }
      }
    },
    define: {
      __SYSTEM_INFO__: JSON.stringify({
        pkg: {
          version: pkg.version,
          dependencies: pkg.dependencies,
          devDependencies: pkg.devDependencies
        },
        lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
    },
    plugins: createVitePlugins(env, command === 'build' || command === 'build:all', command),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '#': path.resolve(__dirname, 'src/types')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: scssResources.join('')
        }
      }
    }
  })
}
