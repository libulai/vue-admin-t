import {
  asyncRoutes,
  constantRoutes
} from '@/router'
import request from '@/utils/request'
import Layout from '@/layout'
import Router from 'vue-router'
import {
  RouterLinkStub
} from '@vue/test-utils'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = {
      ...route
    }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: [],
  tabshift: false
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  RESET_ROUTERS: async (state, route) => {
    return new Promise(async (resolve, reject) => {
      let routes = []
      let settingMenu = [8, 9, 10]

      //首页
      routes.push({
        path: '*',
        component: Layout,
        redirect: '/home',
        children: [{
          path: 'home',
          name: 'Home',
          component: () => import('@/views/home/index'),
          meta: {
            title: '首页',
            icon: 'el-icon-s-home'
          }
        }]
      })

      try {
        let rs = await request({
          url: `/admin/menurolelist`,
          method: "get"
        })

        let data = rs.data


        console.log(data)

        const ROUTERMAP = {
          8: import('@/views/setting/role'),
          9: import('@/views/setting/menu'),
          10: import('@/views/setting/user'),

          11: import('@/views/basic/dep'),
          12: import('@/views/basic/employees'),
          13: import('@/views/basic/area'),
          14: import('@/views/basic/plot'),
          17: import('@/views/basic/customer'),

          421: import('@/views/score/settingA'),
          422: import('@/views/score/settingC'),
          423: import('@/views/score/dispatchA'),
          424: import('@/views/score/dispatchA'),

          413: import('@/views/workOrder/addOrder'),
          414: import('@/views/workOrder/dispatch'),
          415: import('@/views/workOrder/review'),
          416: import('@/views/workOrder/networkOrder'),
          417: import('@/views/workOrder/orderManger'),
          418: import('@/views/workOrder/orderDetail'),
          419: import('@/views/workOrder/qualityOrder'),
        }



        data.forEach(item => {
          let children = item.subMenus
          let childrenArr = []
          let ppath = ''

          children.forEach(i => {
            if(settingMenu.includes(i.menuid)) ppath = '/setting'
            else ppath = '/' + i.menuurl.split('/')[1]
            
            childrenArr.push({
              path: i.menuurl,
              name: i.menuurl,
              component: () => ROUTERMAP[i.menuid],
              meta: {
                title: i.menuname,
                icon: ''
              }
            })
          })
          
          routes.push({
            path: ppath,
            component: Layout,
            redirect: children[0].menuurl,
            name: item.menuid,
            meta: {
              title: item.menuname,
              icon: item.menuicon
            },
            children: childrenArr
          })
        })

        console.log(routes)

        route.options.routes = routes;
        // route.matcher = new Router({mode: 'hash'}).matcher;
        route.addRoutes(routes)
        state.routes = routes
        resolve()
      } catch (error) {
        reject(error)
      }
    })

    // state.routes = [{
    //   path: '/setting',
    //   component: Layout,
    //   redirect: '/setting/user',
    //   name: 'Setting',
    //   meta: { title: '系统设置222', icon: 'el-icon-s-help' }
    // }]
  }
}

const actions = {
  generateRoutes({
    commit
  }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  asyncRouter({
    commit
  }, router) {
    commit('RESET_ROUTERS', router)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
