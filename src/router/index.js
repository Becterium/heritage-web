import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../store/user'

// 布局
import MainLayout from '../layouts/MainLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'

// 路由懒加载
const Login = () => import('../views/Login.vue')
const Register = () => import('../views/Register.vue')
const Home = () => import('../views/Home.vue')
const ArtifactList = () => import('../views/artifacts/ArtifactList.vue')
const ArtifactDetail = () => import('../views/artifacts/ArtifactDetail.vue')
const Exhibition = () => import('../views/Exhibition.vue')
const Reservation = () => import('../views/Reservation.vue')
const UserProfile = () => import('../views/UserProfile.vue')
const Feedback = () => import('../views/Feedback.vue')

// 管理员页面
const Dashboard = () => import('../views/admin/Dashboard.vue')
const ArtifactManagement = () => import('../views/admin/ArtifactManagement.vue')
const ExhibitionManagement = () => import('../views/admin/ExhibitionManagement.vue')
const UserManagement = () => import('../views/admin/UserManagement.vue')
const ReservationManagement = () => import('../views/admin/ReservationManagement.vue')
const MaintenanceReminder = () => import('../views/admin/MaintenanceReminder.vue')
const Statistics = () => import('../views/admin/Statistics.vue')
const NotificationManagement = () => import('../views/admin/NotificationManagement.vue')

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { requiresAuth: false }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: { requiresAuth: false }
    },
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '',
                name: 'Home',
                component: Home,
                meta: { requiresAuth: false }
            },
            {
                path: 'artifacts',
                name: 'ArtifactList',
                component: ArtifactList,
                meta: { requiresAuth: false }
            },
            {
                path: 'artifacts/:id',
                name: 'ArtifactDetail',
                component: ArtifactDetail,
                meta: { requiresAuth: false }
            },
            {
                path: 'exhibitions',
                name: 'Exhibition',
                component: Exhibition,
                meta: { requiresAuth: false }
            },
            {
                path: 'reservation',
                name: 'Reservation',
                component: Reservation,
                meta: { requiresAuth: true, roles: ['visitor'] }
            },
            {
                path: 'profile',
                name: 'UserProfile',
                component: UserProfile,
                meta: { requiresAuth: true }
            },
            {
                path: 'feedback',
                name: 'Feedback',
                component: Feedback,
                meta: { requiresAuth: true, roles: ['visitor'] }
            }
        ]
    },
    {
        path: '/admin',
        component: AdminLayout,
        meta: { requiresAuth: true, roles: ['artifact_manager', 'museum_admin'] },
        children: [
            {
                path: '',
                name: 'Dashboard',
                component: Dashboard
            },
            {
                path: 'artifacts',
                name: 'ArtifactManagement',
                component: ArtifactManagement,
                meta: { roles: ['artifact_manager', 'museum_admin'] }
            },
            {
                path: 'exhibitions',
                name: 'ExhibitionManagement',
                component: ExhibitionManagement,
                meta: { roles: ['museum_admin'] }
            },
            {
                path: 'users',
                name: 'UserManagement',
                component: UserManagement,
                meta: { roles: ['museum_admin'] }
            },
            {
                path: 'reservations',
                name: 'ReservationManagement',
                component: ReservationManagement,
                meta: { roles: ['museum_admin'] }
            },
            {
                path: 'maintenance',
                name: 'MaintenanceReminder',
                component: MaintenanceReminder,
                meta: { roles: ['artifact_manager'] }
            },
            {
                path: 'statistics',
                name: 'Statistics',
                component: Statistics,
                meta: { roles: ['museum_admin'] }
            },
            {
                path: 'notifications',
                name: 'NotificationManagement',
                component: NotificationManagement,
                meta: { roles: ['museum_admin'] }
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    const { isLoggedIn, userRole } = userStore

    // 检查路由是否需要认证
    if (to.meta.requiresAuth && !isLoggedIn) {
        next({ name: 'Login', query: { redirect: to.fullPath } })
    }
    // 检查用户角色权限
    else if (to.meta.roles && !to.meta.roles.includes(userRole)) {
        next({ name: 'Home' })
    }
    else {
        next()
    }
})

export default router