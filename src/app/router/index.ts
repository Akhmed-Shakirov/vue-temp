import { createRouter, createWebHistory } from 'vue-router'
import { checkLogin } from '@/app/middleware/index'

const routes = [
    {
        path: '/',
        component: () => import('@/pages/home/index.vue')
    },
    {
        path: '/about',
        component: () => import('@/pages/about/index.vue'),
        meta: {
            layout: 'empty'
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(checkLogin)

export default router
