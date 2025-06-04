import { createRouter, createWebHistory } from "vue-router";
import PacienteListPage from "../pages/PacienteListPage.vue";
import PacienteDetailPage from "../pages/PacienteDetailPage.vue";
import TesteDarkMode from "../components/TesteDarkMode.vue"; // importa nosso novo teste

const routes = [
  {
    path: "/",
    name: "Pacientes",
    component: PacienteListPage
  },
  {
    path: "/pacientes/:id",
    name: "PacienteDetail",
    component: PacienteDetailPage,
    props: true
  },
  {
    path: "/teste-dark",
    name: "TesteDark",
    component: TesteDarkMode
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
