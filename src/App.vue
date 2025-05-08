<template>
  <div class="min-h-screen bg-background-light font-kai">
    <header class="bg-primary-dark text-white py-4 shadow-md">
      <div class="container mx-auto px-4">
        <h1 class="text-2xl font-bold text-center">生辰八字</h1>
      </div>
    </header>
    
    <main class="container mx-auto px-4 py-8">
      <router-view />
    </main>
    
    <footer class="bg-primary-dark text-white py-4 mt-8">
      <div class="container mx-auto px-4 text-center text-sm">
        <p>生辰八字 &copy; {{ new Date().getFullYear() }} Woung</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  document.body.classList.add('bg-background-light');
});
</script>

<style>
/* 自定义古风样式 */
body {
  background-image: url('/src/assets/paper_texture.jpg');
  background-size: cover;
  background-attachment: fixed;
  color: #5C4033;
}

/* 古风滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #F5E9C9;
}

::-webkit-scrollbar-thumb {
  background: #B8860B;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #8B6914;
}
</style>
