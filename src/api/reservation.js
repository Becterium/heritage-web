import { get, post, put, del } from './request'

// 获取预约列表
export function getReservations(params) {
    return get('/reservations', params)
}

// 获取预约详情
export function getReservationById(id) {
    return get(`/reservations/${id}`)
}

// 创建预约
export function createReservation(data) {
    return post('/reservations', data)
}

// 更新预约
export function updateReservation(id, data) {
    return put(`/reservations/${id}`, data)
}

// 取消预约
export function cancelReservation(id) {
    return post(`/reservations/${id}/cancel`)
}

// 审核预约（管理员）
export function approveReservation(id) {
    return post(`/reservations/${id}/approve`)
}

// 拒绝预约（管理员）
export function rejectReservation(id, reason) {
    return post(`/reservations/${id}/reject`, { reason })
}

// 获取可预约时间段
export function getAvailableTimeSlots(date) {
    return get('/reservations/available-slots', { date })
}

// 获取预约统计数据
export function getReservationStatistics(params) {
    return get('/reservations/statistics', params)
}