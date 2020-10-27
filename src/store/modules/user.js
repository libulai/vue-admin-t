import {
  login,
  logout,
  getInfo
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import {
  resetRouter
} from '@/router'

var storage = window.localStorage;

const getDefaultState = () => {
  return {
    token: '',
    password: '',
    logintime: '',
    // name: '',
    // avatar: '',
    user: {
      comid: 0,
      comname: "",
      roleid: 0,
      rolename: "",
      userid: 0,
      username: ""
    },
    company: {
      compid: '',
      compName: ''
    },
    role: {
      roleid: ''
    }
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, {
    token,
    password,
    logintime
  }) => {
    state.token = token
    state.password = password
    state.logintime = logintime

    storage.setItem("logintime", logintime);
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_Company: (state, data) => {
    state.company = {
      compid: data.comid,
      compName: data.comname
    }
  },
  SET_Role: (state, data) => {
    state.role = {
      roleid: data.roleid
    }

    storage.setItem("role", JSON.stringify(data));
  },
  SET_User: (state, data) => {
    state.user = {
      comid: data.comid,
      comname: data.comname,
      roleid: data.roleid,
      rolename: data.rolename,
      userid: data.userid,
      username: data.username
    }
  }
}

const actions = {
  // user login
  login({
    commit
  }, userInfo) {
    const {
      username,
      password
    } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password
      }).then(response => {
        const data = response
        setToken(data.token)
        // const { data } = response
        commit('SET_TOKEN', {
          token: data.token,
          password,
          logintime: data.logintime
        })
        
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  changeCompany({
    commit
  }, data) {
    commit('SET_Company', data)
  },

  changeRole({
    commit
  }, data) {
    commit('SET_Role', data)
  },

  changeUserinfo({
    commit
  }, data) {
    commit('SET_User', data)
  },

  // get user info
  getInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const {
          data
        } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const {
          name,
          avatar
        } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
