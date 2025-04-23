import { get, post, put, del } from './request'

// 获取文物列表
export function getArtifacts(params) {
    return get('/artifacts', params)
}

// 获取文物详情
export function getArtifactById(id) {
    return get(`/artifacts/${id}`)
}

// 创建文物
export function createArtifact(data) {
    return post('/artifacts', data)
}

// 更新文物
export function updateArtifact(id, data) {
    return put(`/artifacts/${id}`, data)
}

// 删除文物
export function deleteArtifact(id) {
    return del(`/artifacts/${id}`)
}

// 获取文物维护记录
export function getArtifactMaintenance(artifactId) {
    return get(`/artifacts/${artifactId}/maintenance`)
}

// 创建维护记录
export function createMaintenance(data) {
    return post('/maintenance', data)
}

// 获取文物借展记录
export function getArtifactLoans(artifactId) {
    return get(`/artifacts/${artifactId}/loans`)
}

// 创建借展记录
export function createLoan(data) {
    return post('/loans', data)
}

// 更新借展状态
export function updateLoanStatus(id, status) {
    return put(`/loans/${id}/status`, { status })
}