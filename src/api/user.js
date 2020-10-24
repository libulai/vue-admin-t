import request from '@/utils/request'

export function login({username, password}) {
  // export function login(data) {
  return request({
    url: `/login?usercode=${username}&passwd=${password}`,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: `/loginout`,
    method: 'get'
  })
}
