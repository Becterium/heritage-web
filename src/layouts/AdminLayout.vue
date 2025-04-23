<template>
    <div class="admin-layout">
        <el-container>
            <el-aside width="220px" class="admin-sidebar">
                <div class="sidebar-header">
                    <img src="/logo.png" alt="博物馆文物管理系统" class="h-8" />
                    <h2 class="ml-2 text-white text-sm">管理后台</h2>
                </div>
                <el-menu :default-active="activeMenu" class="sidebar-menu" background-color="#304156"
                    text-color="#bfcbd9" active-text-color="#409EFF" :collapse="isCollapse" router>
                    <el-menu-item index="/admin">
                        <el-icon>
                            <DataBoard />
                        </el-icon>
                        <span>控制面板</span>
                    </el-menu-item>

                    <el-menu-item index="/admin/artifacts">
                        <el-icon>
                            <Collection />
                        </el-icon>
                        <span>文物管理</span>
                    </el-menu-item>

                    <el-menu-item index="/admin/exhibitions" v-if="isMuseumAdmin">
                        <el-icon>
                            <PictureFilled />
                        </el-icon>
                        <span>展览管理</span>
                    </el-menu-item>

                    <el-menu-item index="/admin/reservations" v-if="isMuseumAdmin">
                        <el-icon>
                            <Calendar />
                        </el-icon>
                        <span>预约管理</span>
                    </el-menu-item>

                    <el-menu-item index="/admin/maintenance" v-if="isArtifactManager">
                        <el-icon>
                            <Tools />
                        </el-icon>
                        <span>文物维护</span>
                    </el-menu-item>

                    <el-menu-item index="/admin/users" v-if="isMuseumAdmin">
                        <el-icon>
                            <User />
                        </el-icon>
                        <span>用户管理</span>
                    </el-menu-item>

                    <el-menu-item index="/admin/statistics" v-if="isMuseumAdmin">
                        <el-icon>
                            <TrendCharts />
                        </el-icon>
                        <span>统计分析</span>
                    </el-menu-item>

                    <el-menu-item index="/admin/notifications" v-if="isMuseumAdmin">
                        <el-icon>
                            <Bell />
                        </el-icon>
                        <span>通知管理</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>

            <el-container>
                <el-header height="60px" class="admin-header">
                    <div class="flex items-center">
                        <el-icon class="toggle-sidebar" @click="toggleSidebar">
                            <Fold v-if="!isCollapse" />
                            <Expand v-else />
                        </el-icon>
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item :to="{ path: '/admin' }">管理后台</el-breadcrumb-item>
                            <el-breadcrumb-item>{{ currentPageTitle }}</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>

                    <div class="flex items-center">
                        <el-tooltip content="返回前台" placement="bottom">
                            <router-link to="/" class="header-icon">
                                <el-icon>
                                    <House />
                                </el-icon>
                            </router-link>
                        </el-tooltip>

                        <el-tooltip content="消息通知" placement="bottom">
                            <el-badge :value="3" class="header-icon">
                                <el-icon>
                                    <Bell />
                                </el-icon>
                            </el-badge>
                        </el-tooltip>

                        <el-dropdown trigger="click">
                            <div class="user-info">
                                <el-avatar :size="32" :src="userInfo.avatar || '/avatar-placeholder.png'" />
                                <span class="ml-2">{{ userInfo.username }}</span>
                            </div>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item>
                                        <router-link to="/profile">个人中心</router-link>
                                    </el-dropdown-item>
                                    <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                </el-header>

                <el-main class="admin-main">
                    <router-view v-slot="{ Component }">
                        <transition name="fade" mode="out-in">
                            <component :is="Component" />
                        </transition>
                    </router-view>
                </el-main>

                <el-footer height="40px" class="admin-footer">
                    <div class="text-center text-gray-500 text-sm">
                        © {{ new Date().getFullYear() }} 博物馆文物管理系统 版权所有
                    </div>
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../store/user'
import {
    DataBoard,
    Collection,
    PictureFilled,
    Calendar,
    Tools,
    User,
    TrendCharts,
    Bell,
    Fold,
    Expand,
    House
} from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { userInfo, isMuseumAdmin, isArtifactManager, logoutUser } = userStore

const isCollapse = ref(false)
const activeMenu = ref(route.path)

const toggleSidebar = () => {
    isCollapse.value = !isCollapse.value
}

// Use watch to react to route changes and update activeMenu
watch(
    () => route.path,
    (newPath) => {
        activeMenu.value = newPath
    },
    { immediate: true } // Set immediate to true to run the watcher on component mount
)

const currentPageTitle = computed(() => {
    const path = route.path
    if (path === '/admin') return '控制面板'
    if (path === '/admin/artifacts') return '文物管理'
    if (path === '/admin/exhibitions') return '展览管理'
    if (path === '/admin/reservations') return '预约管理'
    if (path === '/admin/maintenance') return '文物维护'
    if (path === '/admin/users') return '用户管理'
    if (path === '/admin/statistics') return '统计分析'
    if (path === '/admin/notifications') return '通知管理'
    return '管理后台'
})

const handleLogout = async () => {
    await logoutUser()
    router.push('/login')
}
</script>

<style scoped>
.admin-layout {
    height: 100vh;
    overflow: hidden;
}

.admin-sidebar {
    background-color: #304156;
    transition: width 0.3s;
    overflow-y: auto;
    overflow-x: hidden;
}

.sidebar-header {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    color: white;
}

.sidebar-menu {
    border-right: none;
}

.admin-header {
    background-color: white;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
}

.toggle-sidebar {
    font-size: 20px;
    margin-right: 16px;
    cursor: pointer;
}

.header-icon {
    font-size: 20px;
    margin-right: 16px;
    cursor: pointer;
    color: #606266;
}

.user-info {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.admin-main {
    background-color: #f0f2f5;
    padding: 20px;
    overflow-y: auto;
}

.admin-footer {
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #e6e6e6;
}
</style>