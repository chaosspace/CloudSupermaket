import { httpReq } from './httpReq'

class HttpUtil {
  // 管理员账户登陆模块
  login = (params) => httpReq('post', '/admins/login', params)
  register = (params) => httpReq('post', '/admins/register', params)

  // 用户模块
  getUsers = (params) =>
    httpReq('get', `/users/all-users/${params.current}/${params.pageSize}`)


}

export default new HttpUtil()