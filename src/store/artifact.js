import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
    getArtifacts,
    getArtifactById,
    createArtifact,
    updateArtifact,
    deleteArtifact,
    getArtifactMaintenance,
    createMaintenance
} from '../api/artifact'
import { ElMessage } from 'element-plus'

export const useArtifactStore = defineStore('artifact', () => {
    // 状态
    const artifacts = ref([])
    const currentArtifact = ref(null)
    const loading = ref(false)
    const maintenanceRecords = ref([])
    const totalArtifacts = ref(0)

    // 方法
    // 获取文物列表
    async function fetchArtifacts(params = {}) {
        loading.value = true
        try {
            const response = await getArtifacts(params)
            if (response.success) {
                artifacts.value = response.data.items
                totalArtifacts.value = response.data.total
            }
        } catch (error) {
            ElMessage.error('获取文物列表失败')
            console.error(error)
        } finally {
            loading.value = false
        }
    }

    // 获取文物详情
    async function fetchArtifactById(id) {
        loading.value = true
        try {
            const response = await getArtifactById(id)
            if (response.success) {
                currentArtifact.value = response.data
                return response.data
            }
        } catch (error) {
            ElMessage.error('获取文物详情失败')
            console.error(error)
        } finally {
            loading.value = false
        }
    }

    // 创建文物
    async function addArtifact(artifactData) {
        try {
            const response = await createArtifact(artifactData)
            if (response.success) {
                ElMessage.success('文物添加成功')
                return response.data
            }
        } catch (error) {
            ElMessage.error('添加文物失败')
            console.error(error)
        }
    }

    // 更新文物
    async function editArtifact(id, artifactData) {
        try {
            const response = await updateArtifact(id, artifactData)
            if (response.success) {
                ElMessage.success('文物更新成功')
                return response.data
            }
        } catch (error) {
            ElMessage.error('更新文物失败')
            console.error(error)
        }
    }

    // 删除文物
    async function removeArtifact(id) {
        try {
            const response = await deleteArtifact(id)
            if (response.success) {
                ElMessage.success('文物删除成功')
                return true
            }
        } catch (error) {
            ElMessage.error('删除文物失败')
            console.error(error)
        }
    }

    // 获取文物维护记录
    async function fetchMaintenanceRecords(artifactId) {
        try {
            const response = await getArtifactMaintenance(artifactId)
            if (response.success) {
                maintenanceRecords.value = response.data
                return response.data
            }
        } catch (error) {
            ElMessage.error('获取维护记录失败')
            console.error(error)
        }
    }

    // 添加维护记录
    async function addMaintenanceRecord(data) {
        try {
            const response = await createMaintenance(data)
            if (response.success) {
                ElMessage.success('维护记录添加成功')
                return response.data
            }
        } catch (error) {
            ElMessage.error('添加维护记录失败')
            console.error(error)
        }
    }

    return {
        artifacts,
        currentArtifact,
        loading,
        maintenanceRecords,
        totalArtifacts,
        fetchArtifacts,
        fetchArtifactById,
        addArtifact,
        editArtifact,
        removeArtifact,
        fetchMaintenanceRecords,
        addMaintenanceRecord
    }
})