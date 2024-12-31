/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页推荐' }
    },
    {
        path: '/episode',
        name: 'Play',
        component: () => import('@/views/playlet/episode'),
        meta: { title: '短剧播放' }
    }
]