import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
    getExhibitions,
    getExhibitionById,
    createExhibition,
    updateExhibition,
    deleteExhibition
} from '../api/exhibition'
import { ElMessage } from 'element-plus'

export const useExhibitionStore = defineStore('exhibition', () => {
    // 状态
    const exhibitions = ref([])
    const currentExhibition = ref(null)
    const loading = ref(false)
    const totalExhibitions = ref(0)

    // 方法
    // 获取展览列表
    async function fetchExhibitions(params = {}) {
        loading.value = true
        try {
            const response = await getExhibitions(params)
            if (response.success) {
                exhibitions.value = response.data.items
                totalExhibitions.value = response.data.total
            }
        } catch (error) {
            ElMessage.error('获取展览列表失败')
            console.error(error)
        } finally {
            loading.value = false
        }
    }

    // 获取展览详情
    async function fetchExhibitionById(id) {
        loading.value = true
        try {
            const response = await getExhibitionById(id)
            if (response.success) {
                currentExhibition.value = response.data
                return response.data
            }
        } catch (error) {
            ElMessage.error('获取展览详情失败')
            console.error(error)
        } finally {
            loading.value = false
        }
    }

    // 创建展览
    async function addExhibition(exhibitionData) {
        try {
            const response = await createExhibition(exhibitionData)
            if (response.success) {
                ElMessage.success('展览创建成功')
                return response.data
            }
        } catch (error) {
            ElMessage.error('创建展览失败')
            console.error(error)
        }
    }

    // 更新展览
    async function editExhibition(id, exhibitionData) {
        try {
            const response = await updateExhibition(id, exhibitionData)
            if (response.success) {
                ElMessage.success('展览更新成功')
                return response.data
            }
        } catch (error) {
            ElMessage.error('更新展览失败')
            console.error(error)
        }
    }

    // 删除展览
    async function removeExhibition(id) {
        try {
            const response = await deleteExhibition(id)
            if (response.success) {
                ElMessage.success('展览删除成功')
                return true
            }
        } catch (error) {
            ElMessage.error('删除展览失败')
            console.error(error)
        }
    }

    return {
        exhibitions,
        currentExhibition,
        loading,
        totalExhibitions,
        fetchExhibitions,
        fetchExhibitionById,
        addExhibition,
        editExhibition,
        removeExhibition
    }
})