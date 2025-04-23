import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/index.css'
import './mock' // 引入Mock数据，用于开发测试
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 创建应用实例
const app = createApp(App)

// 注册所有Element Plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 使用插件
app.use(createPinia())
app.use(router)
app.use(ElementPlus, { size: 'default', zIndex: 3000 })

// 全局错误处理
app.config.errorHandler = (err, vm, info) => {
    console.error('全局错误:', err, info)
}

// 挂载应用
app.mount('#app')