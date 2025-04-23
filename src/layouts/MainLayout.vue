<template>
  <div class="main-layout">
    <header class="header">
      <div class="container mx-auto px-4 py-2 flex items-center justify-between">
        <div class="flex items-center">
          <router-link to="/" class="logo">
            <img src="/logo.png" alt="博物馆文物管理系统" class="h-10" />
          </router-link>
          <h1 class="ml-4 text-xl font-bold text-primary">博物馆文物管理系统</h1>
        </div>
        <nav class="hidden md:flex space-x-6">
          <router-link to="/" class="nav-link">首页</router-link>
          <router-link to="/artifacts" class="nav-link">文物展示</router-link>
          <router-link to="/exhibitions" class="nav-link">展览活动</router-link>
          <router-link to="/reservation" class="nav-link" v-if="isLoggedIn">预约参观</router-link>
          <router-link to="/admin" class="nav-link" v-if="isAdmin">管理后台</router-link>
        </nav>
        <div class="flex items-center">
          <template v-if="isLoggedIn">
            <el-dropdown trigger="click">
              <div class="user-avatar flex items-center cursor-pointer">
                <el-avatar :size="32" :src="userInfo.avatar || '/avatar-placeholder.png'" />
                <span class="ml-2 hidden sm:inline">{{ userInfo.username }}</span>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <router-link to="/profile">个人中心</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="isAdmin">
                    <router-link to="/admin">管理后台</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
          <template v-else>
            <router-link to="/login" class="btn-login">登录</router-link>
            <router-link to="/register" class="btn-register ml-4">注册</router-link>
          </template>
        </div>
        <div class="md:hidden">
          <el-button type="text" @click="toggleMobileMenu">
            <el-icon v-if="!mobileMenuOpen"><Menu /></el-icon>
            <el-icon v-else><Close /></el-icon>
          </el-button>
        </div>
      </div>
    </header>

    <!-- 移动端菜单 -->
    <div v-if="mobileMenuOpen" class="mobile-menu md:hidden">
      <div class="container mx-auto px-4 py-2">
        <router-link to="/" class="mobile-nav-link" @click="closeMobileMenu">首页</router-link>
        <router-link to="/artifacts" class="mobile-nav-link" @click="closeMobileMenu">文物展示</router-link>
        <router-link to="/exhibitions" class="mobile-nav-link" @click="closeMobileMenu">展览活动</router-link>
        <router-link to="/reservation" class="mobile-nav-link" v-if="isLoggedIn" @click="closeMobileMenu">预约参观</router-link>
        <router-link to="/profile" class="mobile-nav-link" v-if="isLoggedIn" @click="closeMobileMenu">个人中心</router-link>
        <router-link to="/admin" class="mobile-nav-link" v-if="isAdmin" @click="closeMobileMenu">管理后台</router-link>
        <a v-if="isLoggedIn" @click="handleLogout" class="mobile-nav-link">退出登录</a>
        <router-link to="/login" class="mobile-nav-link" v-if="!isLoggedIn" @click="closeMobileMenu">登录</router-link>
        <router-link to="/register" class="mobile-nav-link" v-if="!isLoggedIn" @click="closeMobileMenu">注册</router-link>
      </div>
    </div>

    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="footer">
      <div class="container mx-auto px-4 py-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-lg font-bold mb-4">关于我们</h3>
            <p class="text-sm">博物馆文物管理系统致力于提升博物馆文物管理和展示效率，促进文物保护和文化传承。</p>
          </div>
          <div>
            <h3 class="text-lg font-bold mb-4">联系方式</h3>
            <p class="text-sm">地址：北京市海淀区中关村南大街5号</p>
            <p class="text-sm">电话：010-12345678</p>
            <p class="text-sm">邮箱：contact@museum.com</p>
          </div>
          <div>
            <h3 class="text-lg font-bold mb-4">开放时间</h3>
            <p class="text-sm">周二至周日：9:00 - 17:00</p>
            <p class="text-sm">周一闭馆（法定节假日除外）</p>
          </div>
        </div>
        <div class="mt-8 pt-4 border-t border-gray-200 text-center">
          <p class="text-sm">© {{ new Date().getFullYear() }} 博物馆文物管理系统 版权所有</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/user'
import { Menu, Close } from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()

const mobileMenuOpen = ref(false)
const isLoggedIn = ref(false)
const isAdmin = ref(false)
const userInfo = ref({})

onMounted(() => {
  isLoggedIn.value = userStore.isLoggedIn
  isAdmin.value = userStore.isAdmin
  userInfo.value = userStore.userInfo
})


const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const handleLogout = async () => {
  await userStore.logoutUser()
  router.push('/login')
  closeMobileMenu()
}
</script>

<style scoped>
.header {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-link {
  color: var(--text-color);
  font-weight: 500;
  padding: 0.5rem;
  transition: color 0.3s;
}

.nav-link:hover, .nav-link.router-link-active {
  color: var(--accent-color);
}

.btn-login {
  color: var(--accent-color);
  font-weight: 500;
}

.btn-register {
  background-color: var(--accent-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 500;
}

.main-content {
  min-height: calc(100vh - 64px - 240px);
  padding: 2rem 0;
}

.footer {
  background-color: #f8f9fa;
  color: var(--text-color);
}

.mobile-menu {
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: absolute;
  width: 100%;
  z-index: 99;
}

.mobile-nav-link {
  display: block;
  padding: 0.75rem 1rem;
  color: var(--text-color);
  border-bottom: 1px solid #eee;
  font-weight: 500;
}

.mobile-nav-link:hover, .mobile-nav-link.router-link-active {
  background-color: #f8f9fa;
  color: var(--accent-color);
}
</style>