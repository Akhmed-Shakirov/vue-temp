import { createRouter, createWebHistory } from 'vue-router'
import middleware from '@/app/middleware/index'

const routes = [
    {
        path: '/',
        component: () => import('@/pages/home/index.vue')
    },
    {
        path: '/login',
        component: () => import('@/pages/login/index.vue'),
        meta: {
            layout: 'empty'
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

for (const item in middleware) {
    router.beforeEach(middleware[item])
}

export default router
