import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/workOrder',
    component: Layout,
    redirect: '/workOrder/appointment',
    name: 'WorkOrder',
    meta: { title: '工单管理', icon: 'el-icon-s-help' },
    children: [
      // {
      //   path: 'appointment',
      //   name: 'Appointment',
      //   component: () => import('@/views/table/index'),
      //   meta: { title: '预约登记', icon: '' }
      // },
      {
        path: 'dispatch',
        name: 'Dispatch',
        component: () => import('@/views/workOrder/dispatch'),
        meta: { title: '分派工单', icon: '' }
      },
      {
        path: 'review',
        name: 'Review',
        component: () => import('@/views/workOrder/review'),
        meta: { title: '复核工单', icon: '' },
        children: [{
          path: 'reviewDetail',
          name: 'ReviewDetail',
          hidden: true,
          component: () => import('@/views/workOrder/reviewDetail/reviewDetail'),
          meta: { title: '工单信息', icon: '', activeMenu: '/workOrder/review' }
        },]
      },
      {
        path: 'networkOrder',
        name: 'NetworkOrder',
        component: () => import('@/views/workOrder/networkOrder'),
        meta: { title: '网络预约单审核', icon: '' }
      },
      {
        path: 'qualityOrder',
        name: 'QualityOrder',
        component: () => import('@/views/workOrder/qualityOrder'),
        meta: { title: '发放质保单', icon: '' }
      },
    ]
  },
  {
    path: '/score',
    component: Layout,
    redirect: '/score/settingA',
    name: 'Score',
    meta: { title: '积分管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'settingA',
        name: 'SettingA',
        component: () => import('@/views/score/settingA'),
        meta: { title: 'A分设置', icon: '' }
      },
      {
        path: 'settingC',
        name: 'SettingC',
        component: () => import('@/views/score/settingA'),
        meta: { title: 'C分设置', icon: '' }
      },
      {
        path: 'dispatchA',
        name: 'DispatchA',
        component: () => import('@/views/score/dispatchA'),
        meta: { title: 'A分发放', icon: '' }
      },
      {
        path: 'dispatchC',
        name: 'DispatchC',
        component: () => import('@/views/score/dispatchA'),
        meta: { title: 'C分发放', icon: '' }
      }
    ]
  },
  {
    path: '/basic',
    component: Layout,
    redirect: '/basic/area',
    name: 'Basic',
    meta: { title: '基础数据', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'area',
        name: 'Area',
        component: () => import('@/views/basic/area'),
        meta: { title: '区域管理', icon: '' }
      },
      {
        path: 'dep',
        name: 'Dep',
        component: () => import('@/views/basic/dep'),
        meta: { title: '部门管理', icon: '' }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/user',
    name: 'Setting',
    meta: { title: '系统设置', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/setting/user'),
        meta: { title: '用户管理', icon: '' }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/setting/role'),
        meta: { title: '角色管理', icon: '' }
      }
    ]
  },

  



  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
