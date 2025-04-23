import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
    getReservations,
    getReservationById,
    createReservation,
    updateReservation,
    cancelReservation
} from '../api/reservation'
import { ElMessage } from 'element-plus'

export const useReservationStore = defineStore('reservation', () => {
    // 状态
    const reservations = ref([])
    const currentReservation = ref(null)
    const loading = ref(false)
    const totalReservations = ref(0)

    // 方法
    // 获取预约列表
    async function fetchReservations(params = {}) {
        loading.value = true
        try {
            const response = await getReservations(params)
            if (response.success) {
                reservations.value = response.data.items
                totalReservations.value = response.data.total
            }
        } catch (error) {
            ElMessage.error('获取预约列表失败')
            console.error(error)
        } finally {
            loading.value = false
        }
    }

    // 获取预约详情
    async function fetchReservationById(id) {
        loading.value = true
        try {
            const response = await getReservationById(id)
            if (response.success) {
                currentReservation.value = response.data
                return response.data
            }
        } catch (error) {
            ElMessage.error('获取预约详情失败')
            console.error(error)
        } finally {
            loading.value = false
        }
    }

    // 创建预约
    async function addReservation(reservationData) {
        try {
            const response = await createReservation(reservationData)
            if (response.success) {
                ElMessage.success('预约成功')
                return response.data
            }
        } catch (error) {
            ElMessage.error('预约失败')
            console.error(error)
        }
    }

    // 更新预约
    async function editReservation(id, reservationData) {
        try {
            const response = await updateReservation(id, reservationData)
            if (response.success) {
                ElMessage.success('预约更新成功')
                return response.data
            }
        } catch (error) {
            ElMessage.error('更新预约失败')
            console.error(error)
        }
    }

    // 取消预约
    async function removeReservation(id) {
        try {
            const response = await cancelReservation(id)
            if (response.success) {
                ElMessage.success('预约取消成功')
                return true
            }
        } catch (error) {
            ElMessage.error('取消预约失败')
            console.error(error)
        }
    }

    return {
        reservations,
        currentReservation,
        loading,
        totalReservations,
        fetchReservations,
        fetchReservationById,
        addReservation,
        editReservation,
        removeReservation
    }
})