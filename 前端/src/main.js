import {createApp} from 'vue'
import {createRouter, createWebHistory} from "vue-router";
import App from "@/App.vue";
// 注册 v-md-editor
import VMdPreview from '@kangc/v-md-editor/lib/preview';
// 引入你所使用的主题 此处以 github 主题为例
import githubTheme from '@kangc/v-md-editor/lib/theme/github';
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css';
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';
import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/cdn';

// 创建路由
const routes = [
    // sensitive: true 为精确大小写
    {path: '/', component: () => import("@/Head/Title_hty.vue")},
    {path: '/resume', component: () => import("@/Other/Resume.vue")},
    {path: '/:id', component: () => import("@/Paper/Paper_main.vue")},
    {path: '/:pathMatch(.*)*', component: () => import("@/Other/Error_404.vue")},

]
// 注册路由
const router = createRouter({
    history: createWebHistory(),
    routes,
})

// highlightjs 核心代码
import hljs from 'highlight.js/lib/core';
// 按需引入语言包
import json from 'highlight.js/lib/languages/json';

// import '@kangc/v-md-editor/lib/style/base-editor.css';
// import '@kangc/v-md-editor/lib/theme/style/github.css';


hljs.registerLanguage('json', json);
// // 引入所有语言包
// import hljs from 'highlight.js';

VMdPreview.use(githubTheme, {
    Hljs: hljs,
    config: {
        toc: {
            includeLevel: [1, 2, 3, 4, 5, 6],
        },
    }
});

// Emoji 表情
VMdPreview.use(createEmojiPlugin());
// TodoList 任务列表
VMdPreview.use(createTodoListPlugin());
// 数学公式解析
VMdPreview.use(createKatexPlugin());

const app = createApp(App)
app.use(router)
app.use(VMdPreview);
app.mount('#app')

