import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 导入UnoCSS相关样式
import '@unocss/reset/tailwind.css'
import 'uno.css'

// 创建并挂载应用
createApp(App).use(router).mount('#app')
