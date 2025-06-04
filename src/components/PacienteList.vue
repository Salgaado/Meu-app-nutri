<template>
  <div class="p-6">
    <h2 class="text-xl font-semibold mb-4 dark:text-gray-200">Lista de Pacientes</h2>

    <div v-if="loading" class="text-gray-500">
      Carregando pacientes...
    </div>

    <ul v-else class="space-y-2">
      <li
        v-for="paciente in pacientes"
        :key="paciente.id"
        class="flex justify-between items-center bg-white shadow p-4 rounded dark:bg-gray-800 transition-colors"
      >
        <div>
          <!-- Exemplo: link para detalhe -->
          <router-link
            :to="`/pacientes/${paciente.id}`"
            class="font-medium dark:text-gray-200 hover:underline"
          >
            #{{ paciente.id }} – {{ paciente.nome }}
          </router-link>
          <span class="ml-4 text-sm dark:text-gray-200">
            ({{ paciente.dataNascimento }})
          </span>
        </div>
        <div class="space-x-2 dark:text-gray-200">
          <Button size="small" themeColor="primary" @click="editar(paciente.id)">
            Editar
          </Button>
          <Button size="small" themeColor="error" @click="excluir(paciente.id)">
            Excluir
          </Button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchPacientes, deletePaciente } from "../services/fakeApi";


const pacientes = ref([]);
const loading = ref(true);

onMounted(async () => {
  loading.value = true;
  pacientes.value = await fetchPacientes();
  loading.value = false;
});

const editar = (id) => {
  // Por ora, só exibe alerta
  alert(`Editar paciente #${id}`);
};

const excluir = async (id) => {
  const confirmou = confirm(`Deseja realmente excluir o paciente #${id}?`);
  if (!confirmou) return;
  const ok = await deletePaciente(id);
  if (ok) {
    pacientes.value = pacientes.value.filter((p) => p.id !== id);
  } else {
    alert("Falha ao excluir. Paciente não encontrado.");
  }
};
</script>

<style scoped>
/* Sem CSS extra: usamos Tailwind */
</style>
