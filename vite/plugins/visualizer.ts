import { visualizer } from 'rollup-plugin-visualizer'

export default function rollupVisualizer() {
  return visualizer({
    filename: './dist/report.html', // 生成的报告文件
    open: true, // 打包后自动打开报告
    gzipSize: true, // 显示 gzip 大小
    brotliSize: true // 显示 brotli 大小
  })
}
