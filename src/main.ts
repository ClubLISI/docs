import { createApp } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import App from './App.vue'
import routes from './routes'

import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'

import './styles/global.scss'
import 'highlight.js/styles/stackoverflow-light.css'

hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('javascript', javascript)

const router = createRouter({
	history: createWebHistory(),
	routes
})

createApp(App).use(router).mount('#root')
