import { get } from './request'

// 获取总体统计数据
export function getOverviewStatistics() {
    return get('/statistics/overview')
}

// 获取参观人数统计
export function getVisitorStatistics(params) {
    return get('/statistics/visitors', params)
}

// 获取文物统计
export function getArtifactStatistics(params) {
    return get('/statistics/artifacts', params)
}

// 获取展览统计
export function getExhibitionStatistics(params) {
    return get('/statistics/exhibitions', params)
}

// 获取预约统计
export function getReservationStatistics(params) {
    return get('/statistics/reservations', params)
}

// 获取反馈统计
export function getFeedbackStatistics(params) {
    return get('/statistics/feedback', params)
}

// 获取文物维护统计
export function getMaintenanceStatistics(params) {
    return get('/statistics/maintenance', params)
}

// 获取自定义时间范围的统计数据
export function getCustomRangeStatistics(params) {
    return get('/statistics/custom', params)
}