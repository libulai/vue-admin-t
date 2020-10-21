import request from '@/utils/request'

export function login({username, password}) {
  // export function login(data) {
  return request({
    url: `/login?usercode=${username}&passwd=${password}`,
    method: 'get'
  })

  // return request({
  //   url: '/vue-admin-template/user/login',
  //   method: 'post',
  //   data
  // })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: `/loginout`,
    method: 'get'
  })
}
