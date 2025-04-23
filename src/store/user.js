import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login, register, getUserInfo, logout } from '../api/user'
import { ElMessage } from 'element-plus'

export const useUserStore = defineStore('user', () => {
    // 状态
    const token = ref(localStorage.getItem('token') || '')
    const userInfo = ref({})
    const isLoggedIn = computed(() => !!token.value)
    const userRole = computed(() => userInfo.value.role || '')

    // 判断是否是管理员
    const isAdmin = computed(() =>
        ['artifact_manager', 'museum_admin'].includes(userRole.value)
    )

    // 判断是否是博物馆管理人员
    const isMuseumAdmin = computed(() => userRole.value === 'museum_admin')

    // 判断是否是文物管理员
    const isArtifactManager = computed(() => userRole.value === 'artifact_manager')

    // 判断是否是参观者
    const isVisitor = computed(() => userRole.value === 'visitor')

    // 方法
    // 登录
    async function loginUser(credentials) {
        try {
            const response = await login(credentials)
            if (response.success) {
                token.value = response.data.token
                localStorage.setItem('token', token.value)
                await fetchUserInfo()
                ElMessage.success('登录成功')
                return true
            }
            return false
        } catch (error) {
            ElMessage.error(error.message || '登录失败')
            return false
        }
    }

    // 注册
    async function registerUser(userData) {
        try {
            const response = await register(userData)
            if (response.success) {
                ElMessage.success('注册成功，请登录')
                return true
            }
            return false
        } catch (error) {
            ElMessage.error(error.message || '注册失败')
            return false
        }
    }

    // 获取用户信息
    async function fetchUserInfo() {
        if (!token.value) return

        try {
            const response = await getUserInfo()
            if (response.success) {
                userInfo.value = response.data
            }
        } catch (error) {
            console.error('获取用户信息失败:', error)
        }
    }

    // 登出
    async function logoutUser() {
        try {
            await logout()
            resetState()
            ElMessage.success('已退出登录')
        } catch (error) {
            console.error('登出失败:', error)
        }
    }

    // 检查认证状态
    function checkAuth() {
        if (token.value) {
            fetchUserInfo()
        }
    }

    // 重置状态
    function resetState() {
        token.value = ''
        userInfo.value = {}
        localStorage.removeItem('token')
    }

    return {
        token,
        userInfo,
        isLoggedIn,
        userRole,
        isAdmin,
        isMuseumAdmin,
        isArtifactManager,
        isVisitor,
        loginUser,
        registerUser,
        fetchUserInfo,
        logoutUser,
        checkAuth,
        resetState
    }
})