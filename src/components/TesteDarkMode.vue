<!-- src/components/TesteDarkMode.vue -->
<template>
  <div
    class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100
    flex flex-col items-center justify-center space-y-4">
    <h1 class="text-3xl">Teste de Modo</h1>

    <p>O fundo deve ficar claro ou escuro:</p>

    <p class="p-4 bg-white dark:bg-gray-800 rounded transition-colors">
      Este card muda conforme <code>class="dark"</code> em <code>&lt;html&gt;</code>.
    </p>

    <button
      @click="toggle"
      class="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors"
    >
      Alternar dark/class
    </button>
  </div>
</template>

<script setup>
const html = document.documentElement;


import { ref } from "vue";
const isDark = ref(html.classList.contains("dark"));

function toggle() {
  isDark.value = !isDark.value;
  if (isDark.value) {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
  console.log("[TesteDarkMode] HTML class agora:", html.className);
}
</script>

<style>
</style>
