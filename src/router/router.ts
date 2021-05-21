import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

/**
 * 路由配置项
 *
 * meta:{
 *  roles: ['admin', 'editor'] // 设置该路由进入的权限，支持多个权限叠加
 *  title: 'title' // 设置该路由在侧边栏和面包屑中展示的名字
 *  alwaysShow: false // 一个路由下面有多个子路由的时候自动变成嵌套模式。小于一个或者没有的时候只显示跟路由。设置为true的话就会，一个子路由也会显示成嵌套路由。默认为false
 *  hidden:true  是否在菜单栏显示，true：隐藏  false：显示。默认为：false
 *  affix：tag固定在导航上面，不可删除
 *  activeMenu：详情页的时候菜单栏高亮
 *
 * }
 * redirect：noredirect // 链接不能跳转
 * name: 'router-name' // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * breadcrumb: false //  如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
 *
 */

/**
 * 默认路由，不需要权限
 */
export const constRouter: Array<RouteConfig> = [
    {
        path: '/404',
        name: '404',
        meta: {
            title: '404',
            hidden: true
        },
        component: () => import('@/views/error/404.vue')
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
            hidden: true
        },
        component: () => import('@/views/login/login.vue')
    },
    {
        path: '/',
        component: () => import('@/layout/index.vue'),
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'Home',
                component: () => import('@/views/home/home.vue'),
                meta: {
                    title: '订单',
                    icon: 'dashboard',
                    affix: true
                }
            }
        ]
    },
    {
        path: '/level',
        name: 'Level',
        meta: {
            title: '商品分类',
            icon: 'lock'
        },
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: 'level_1',
                name: 'Level_1',
                meta: {
                    title: '商品分类'
                },
                component: () => import('@/views/level/level.vue')
            }
        ]
    }
]

/**
 *
 * 动态路由，需要权限
 */
export const asyncRouter:Array<RouteConfig> = [
    {
        path: '/goods',
        name: 'Goods',
        meta: {
            title: '商品',
            roles: ['admin'],
            icon: 'user'
        },
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: 'goodsList',
                name: 'GoodsList',
                meta: {
                    title: '商品列表',
                    roles: ['admin']
                },
                component: () => import('@/views/goods/list.vue')
            },
            {
                path: 'goodsDetail',
                name: 'GoodsDetail',
                meta: {
                    title: '商品详情',
                    roles: ['admin'],
                    hidden: true,
                    activeMenu: '/goods/goodsList'
                },
                component: () => import('@/views/goods/detail.vue')
            }
        ]
    },
    {
        path: '/permission',
        name: 'Permission',
        redirect: 'noredirect',
        meta: {
            title: '权限页面',
            roles: ['admin', 'editor'],
            icon: 'user',
            alwaysShow: true
        },
        component: () => import('@/layout/index.vue'),
        children: [
            // {
            //     path: 'role',
            //     name: 'Role',
            //     meta: {
            //         title: '角色',
            //         roles: ['editor']
            //     },
            //     component: () => import('@/views/permission/roles.vue')
            // },
            {
                path: 'user',
                name: 'User',
                meta: {
                    title: '用户',
                    roles: ['admin']
                },
                component: () => import('@/views/permission/user.vue')
            }
        ]
    },
    {
        path: '*',
        redirect: '/404',
        meta: { hidden: true }
    }
]
/**
 *
 * 创建路由
 *
 */
const createRouter = () => new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: constRouter
})
const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter();
    (router as any).matcher = (newRouter as any).matcher // reset router
}
export default router
