import { defineConfig } from 'vitepress'
import { DefaultTheme } from 'vitepress/theme'

/**
 * 侧边栏配置
 */
const sidebar: DefaultTheme.Sidebar = [
  {
    text: 'Start an adventure',
    items: [
      { text: 'Intro', link: '/' },
      { text: 'Environment', link: '/start/install' },
    ]
  },
  {
    text: 'Kubernetes',
    items: [
      { text: 'Intro', link: '/kubernetes/intro' },
      { text: 'Pod', link: '/kubernetes/pod' },
      { text: 'Deployment', link: '/kubernetes/deployment' },
    ]
  },
  {
    text: 'Helm',
  },
  {
    text: 'Samples',
  },
]

/**
 * 主题配置 https://vitepress.dev/reference/default-theme-config
 */
const themeConfig: DefaultTheme.Config = {
  logo: '/kubernetes.svg',
  socialLinks: [
    { icon: 'github', link: 'https://github.com/HenryZhuHR/hello-kubernetes' }
  ],
  sidebar: sidebar,

}


/**
 * 站点配置 https://vitepress.dev/reference/site-config
 */
export default defineConfig({
  base: '/hello-kubernetes/',
  title: "Hello Kubernetes",
  description: "kubernetes 学习记录",
  srcDir: 'docs',
  themeConfig: themeConfig,
  vite: {// Vite 配置选项
    publicDir: '../.vitepress/public', // 相对于 docs 目录
  },
})
