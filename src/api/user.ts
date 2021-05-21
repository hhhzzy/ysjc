import Ajax from '@/utils/http'
import { ResponseData } from '@/api/response'

export function login<T>(data: T) {
    return Ajax.post('​/Mall​/adminLogin', data)
}

export function getUserInfo<T>(data: string) {
    return Ajax.post<ResponseData<T>>('/api/getUserInfo', data)
}
// 获取所有用户
export function getUserList<T>(data: object) {
    return Ajax.get<ResponseData<T>>('/Mall/getUserList', { params: data })
}
// 获取角色列表
export function getRoleList<T>() {
    return Ajax.get<ResponseData<T>>('/Mall/getRoleList')
}
// 用户分配角色
export function assignRole<T>(data: []) {
    return Ajax.post<ResponseData<T>>('/Mall/assignRole', { userRoleList: data })
}

