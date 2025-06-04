// src/composables/useTheme.js
import { ref, watchEffect } from "vue";

const STORAGE_KEY = "themeState"; // só esta chave vai existir no LS
const themeState = ref("system"); // valor inicial

function applyTheme(state) {
  const html = document.documentElement;
  html.classList.remove("dark"); // sempre limpe antes

  if (state === "dark") {
    html.classList.add("dark"); 
    // console.log("[useTheme] modo ESCURO forçado: <html class='dark'>");
  } else if (state === "light") {
    html.classList.remove("dark"); 
    // console.log("[useTheme] modo CLARO forçado: <html sem 'dark'>");
  } else {
    // state === "system": usa preferencia do sistema
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) {
      html.classList.add("dark");
      // console.log("[useTheme] modo SYSTEM detectou sistema DARK → <html class='dark'>");
    } else {
      html.classList.remove("dark");
      // console.log("[useTheme] modo SYSTEM detectou sistema LIGHT → <html sem 'dark'>");
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

// roda uma vez ao importar o hook
initTheme();

// sempre que themeState mudar, grava e reaplica
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
