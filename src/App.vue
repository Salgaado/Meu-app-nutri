<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
    <header
      class="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center transition-colors"
    >
      <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Sistema Nutricionista
      </h1>

      <button
        @click="toggleTheme"
        class="flex items-center space-x-2 text-gray-600 dark:text-gray-200"
      >
        <span v-if="themeState === 'system'">🌗 Auto</span>
        <span v-else-if="themeState === 'light'">🌞 Claro</span>
        <span v-else>🌙 Escuro</span>
      </button>
    </header>

    <router-view />
  </div>
</template>

<script setup>
import { useTheme } from "./composables/useTheme";
const { themeState, toggleTheme } = useTheme();
</script>

<style>
html {
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}
</style>
