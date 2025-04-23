import { get, post, put, del } from './request'

// 获取展览列表
export function getExhibitions(params) {
    return get('/exhibitions', params)
}

// 获取展览详情
export function getExhibitionById(id) {
    return get(`/exhibitions/${id}`)
}

// 创建展览
export function createExhibition(data) {
    return post('/exhibitions', data)
}

// 更新展览
export function updateExhibition(id, data) {
    return put(`/exhibitions/${id}`, data)
}

// 删除展览
export function deleteExhibition(id) {
    return del(`/exhibitions/${id}`)
}

// 获取展览文物
export function getExhibitionArtifacts(exhibitionId) {
    return get(`/exhibitions/${exhibitionId}/artifacts`)
}

// 添加文物到展览
export function addArtifactToExhibition(exhibitionId, artifactId) {
    return post(`/exhibitions/${exhibitionId}/artifacts`, { artifactId })
}

// 从展览中移除文物
export function removeArtifactFromExhibition(exhibitionId, artifactId) {
    return del(`/exhibitions/${exhibitionId}/artifacts/${artifactId}`)
}

// 获取展览统计数据
export function getExhibitionStatistics(exhibitionId) {
    return get(`/exhibitions/${exhibitionId}/statistics`)
}