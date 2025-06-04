// src/composables/useTheme.js
import { ref, watchEffect } from "vue";

const STORAGE_KEY = "themeState";
const themeState = ref("system"); 

function applyTheme(state) {
  const html = document.documentElement;
  html.classList.remove("dark"); 

  if (state === "dark") {
    html.classList.add("dark"); 
  } else if (state === "light") {
    html.classList.remove("dark"); 

  } else {
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }
}

function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark" || saved === "system") {
    themeState.value = saved;
  } else {
    themeState.value = "system";
  }
  applyTheme(themeState.value);
}

initTheme();

watchEffect(() => {
  localStorage.setItem(STORAGE_KEY, themeState.value);
  applyTheme(themeState.value);
});

function toggleTheme() {
  if (themeState.value === "system") {
    themeState.value = "light";
  } else if (themeState.value === "light") {
    themeState.value = "dark";
  } else {
    themeState.value = "system";
  }
}

export function useTheme() {
  return { themeState, toggleTheme };
}
