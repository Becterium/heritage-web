import { get, post } from './request'

// 用户登录
export function login(data) {
    return post('/auth/login', data)
}

// 用户注册
export function register(data) {
    return post('/auth/register', data)
}

// 获取用户信息
export function getUserInfo() {
    return get('/users/profile')
}

// 更新用户信息
export function updateUserInfo(data) {
    return post('/users/profile', data)
}

// 用户登出
export function logout() {
    return post('/auth/logout')
}

// 获取用户列表（管理员）
export function getUsers(params) {
    return get('/admin/users', params)
}

// 更新用户状态（管理员）
export function updateUserStatus(userId, status) {
    return post(`/admin/users/${userId}/status`, { status })
}

// 删除用户（管理员）
export function deleteUser(userId) {
    return post(`/admin/users/${userId}/delete`)
}

// 重置用户密码（管理员）
export function resetUserPassword(userId) {
    return post(`/admin/users/${userId}/reset-password`)
}

// 修改密码
export function changePassword(data) {
    return post('/users/change-password', data)
}