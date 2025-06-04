// src/main.js
import { createApp } from "vue";
import App from "./App.vue";

// Importa o arquivo com @tailwind base/components/utilities
import "./style.css";

import router from "./router"; 
const app = createApp(App);
app.use(router);
app.mount("#app");
