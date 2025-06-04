<template>
  <div class="p-6 max-w-xl mx-auto">
    <div v-if="loading" class="text-gray-500 dark:text-gray-400">
      Carregando detalhe do paciente…
    </div>
    <div v-else-if="!paciente" class="text-red-600">
      Paciente não encontrado.
    </div>
    <div v-else>
      <!-- Card de dados -->
      <div
        class="bg-white dark:bg-gray-800 shadow p-6 rounded mb-6 transition-colors"
      >
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Detalhe do Paciente: {{ paciente.nome }}
        </h2>
        <p class="mb-2 text-gray-700 dark:text-gray-200">
          <span class="font-medium">ID:</span> {{ paciente.id }}
        </p>
        <p class="mb-2 text-gray-700 dark:text-gray-200">
          <span class="font-medium">Data de Nascimento:</span>
          {{ formatDate(paciente.dataNascimento) }}
        </p>
        <p class="mb-4 text-gray-700 dark:text-gray-200">
          <span class="font-medium">E-mail:</span> {{ paciente.email }}
        </p>
      </div>

      <!-- KPI Cards -->
      <KpiCards :pacienteId="paciente.id" />

      <!-- Histórico de planos -->
      <div class="mt-6">
        <PlanoList
          :pacienteId="paciente.id"
          :recarregarKey="recarregarListagem"
          @createPlano="abrirModalCriar"
          @editPlano="abrirModalEditar"
        />
      </div>

      <!-- Botão voltar -->
      <div class="mt-6">
        <router-link
          to="/"
          class="text-blue-600 dark:text-blue-400 hover:underline transition-colors"
        >
          ← Voltar à Lista de Pacientes
        </router-link>
      </div>
    </div>

    <PlanoFormModal
      v-if="mostrarModal"
      :mode="modoModal"
      :pacienteId="paciente.id"
      :planoData="planoAtual"
      @closed="onModalClosed"
      @saved="onPlanoSalvo"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { fetchPacientePorId } from "../services/fakeApi";
import PlanoList from "../components/PlanoList.vue";
import PlanoFormModal from "../components/PlanoFormModal.vue";
import KpiCards from "../components/KpiCards.vue";

const route = useRoute();
const idParam = route.params.id;

const paciente = ref(null);
const loading = ref(true);

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

onMounted(async () => {
  loading.value = true;
  const idNum = Number(idParam);
  if (isNaN(idNum)) {
    paciente.value = null;
    loading.value = false;
    return;
  }
  paciente.value = await fetchPacientePorId(idNum);
  loading.value = false;
});

// Modal state
const mostrarModal = ref(false);
const modoModal = ref("create");
const planoAtual = ref(null);
const recarregarListagem = ref(0);

const abrirModalCriar = () => {
  modoModal.value = "create";
  planoAtual.value = null;
  mostrarModal.value = true;
};
const abrirModalEditar = (plano) => {
  modoModal.value = "edit";
  planoAtual.value = { ...plano };
  mostrarModal.value = true;
};
const onModalClosed = () => {
  mostrarModal.value = false;
};
const onPlanoSalvo = () => {
  mostrarModal.value = false;
  recarregarListagem.value++;
};
</script>

<style scoped>

.max-w-xl {
  max-width: 40rem;
}

</style>
