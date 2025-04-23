<template>
    <div class="login-container">
        <div class="login-card">
            <div class="login-header">
                <img src="/logo.png" alt="博物馆文物管理系统" class="h-12" />
                <h2 class="text-2xl font-bold mt-4">登录</h2>
                <p class="text-gray-500 mt-2">欢迎回到博物馆文物管理系统</p>
            </div>

            <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form"
                @submit.prevent="handleLogin">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="用户名" prefix-icon="User" />
                </el-form-item>

                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" type="password" placeholder="密码" prefix-icon="Lock"
                        show-password />
                </el-form-item>

                <div class="flex items-center justify-between mb-4">
                    <el-checkbox v-model="rememberMe">记住我</el-checkbox>
                    <a href="#" class="text-sm text-accent-color">忘记密码？</a>
                </div>

                <el-form-item>
                    <el-button type="primary" class="w-full" :loading="loading" @click="handleLogin">
                        登录
                    </el-button>
                </el-form-item>
            </el-form>

            <div class="login-footer">
                <p class="text-center text-gray-500">
                    还没有账号？
                    <router-link to="/register" class="text-accent-color">立即注册</router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../store/user'
import { User, Lock } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const loginFormRef = ref(null)
const loading = ref(false)
const rememberMe = ref(false)

const loginForm = reactive({
    username: '',
    password: ''
})

const loginRules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 20, message: '用户名长度应为3-20个字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度应为6-20个字符', trigger: 'blur' }
    ]
}

const handleLogin = async () => {
    if (!loginFormRef.value) return

    loginFormRef.value.validate(async (valid) => {
        if (valid) {
            loading.value = true
            try {
                const success = await userStore.loginUser(loginForm)
                if (success) {
                    // 如果有重定向，则跳转到重定向页面
                    const redirectPath = route.query.redirect || '/'
                    router.push(redirectPath)
                }
            } finally {
                loading.value = false
            }
        }
    })
}
</script>

<style scoped>
.login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f7fafc;
    padding: 20px;
}

.login-card {
    width: 100%;
    max-width: 400px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 40px;
}

.login-header {
    text-align: center;
    margin-bottom: 30px;
}

.login-form {
    margin-bottom: 20px;
}

.login-footer {
    margin-top: 20px;
}

:deep(.el-input__wrapper) {
    box-shadow: 0 0 0 1px #e2e8f0 inset;
}

:deep(.el-button--primary) {
    background-color: var(--accent-color);
    border-color: var(--accent-color);
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
    background-color: var(--accent-color);
    border-color: var(--accent-color);
}
</style>