import { asyncRoutes, constantRoutes } from '@/router'
import request from '@/utils/request'
import Layout from '@/layout'

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
    const tmp = { ...route }
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
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  RESET_ROUTERS: async (state, route) => {
    return new Promise(async (resolve, reject) => {
      try {
        let rs = await request({
          url: `/admin/menurolelist`,
          method: "get"
        })

        let data = rs.data
        let routes = []
        console.log(data)

        data.forEach(item => {
          let children = item.subMenus
          let childrenArr = []
          let ppath = ''
          for (let i = 0; i < children.length; i++) {
            ppath = children[i].menuurl.split('/')[0]
            childrenArr.push({
              path: children[i].menuurl.split('/')[1],
              name: children[i].menuurl.split('/')[1],
              component: () => import('@/views/setting/user'),
              meta: { title: '用户管理', icon: '' }
            })
          }
          // children.forEach(i => {
          //   ppath = i.menuurl.split('/')[0]
          // })
          routes.push({
            path: `/${ppath}`,
            component: Layout,
            redirect: '/setting/user',
            name: `/${ppath}`,
            meta: { title: item.menuname, icon: 'el-icon-s-help' },
            children: [
              {
                path: 'user',
                name: 'User',
                component: () => import('@/views/setting/user'),
                meta: { title: '用户管理', icon: '' }
              },
            ]
          })
        })

        // let routes = [{
        //   path: '/setting',
        //   component: Layout,
        //   redirect: '/setting/user',
        //   name: 'Setting',
        //   meta: { title: '系统设置222', icon: 'el-icon-s-help' },
        //   children: [
        //     {
        //       path: 'user',
        //       name: 'User',
        //       component: () => import('@/views/setting/user'),
        //       meta: { title: '用户管理', icon: '' }
        //     },
        //   ]
        // }]

        route.options.routes = routes;
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
  generateRoutes({ commit }, roles) {
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
  asyncRouter({ commit }, router) {
    commit('RESET_ROUTERS', router)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
