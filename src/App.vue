<template>
  <div class="app-container">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useUserStore } from './store/user';

const userStore = useUserStore();

onMounted(() => {
  // 检查本地存储中是否有用户信息，如果有则自动登录
  userStore.checkAuth();
});
</script>

<style>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 全局样式 */
:root {
  --primary-color: #4a5568;
  --secondary-color: #718096;
  --accent-color: #9c4221;
  --background-color: #f7fafc;
  --text-color: #2d3748;
  --border-color: #e2e8f0;
  --success-color: #48bb78;
  --warning-color: #ed8936;
  --danger-color: #e53e3e;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  color: var(--text-color);
  background-color: var(--background-color);
  line-height: 1.6;
}

a {
  text-decoration: none;
  color: var(--accent-color);
}

button {
  cursor: pointer;
}
</style>