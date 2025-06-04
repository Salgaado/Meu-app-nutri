<template>
  <div :key="recarregarKey" class="p-6 bg-white dark:bg-gray-800 shadow rounded transition-colors">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Histórico de Planos
      </h3>
      <div class="flex space-x-2 items-end">
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Início
          </label>
          <input
            type="date"
            v-model="dataInicioFiltro"
            class="border rounded px-2 py-1 w-36 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Fim
          </label>
          <input
            type="date"
            v-model="dataFimFiltro"
            class="border rounded px-2 py-1 w-36 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          />
        </div>
        <button
          @click="filtrar"
          class="bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-1 text-sm"
        >
          Filtrar
        </button>
        <button
          @click="limparFiltro"
          class="bg-gray-400 hover:bg-gray-500 text-white rounded px-3 py-1 text-sm"
        >
          Limpar
        </button>
      </div>
    </div>

    <div v-if="loading" class="text-gray-500 dark:text-gray-400">
      Carregando planos…
    </div>

    <ul v-else class="space-y-3">
      <li
        v-for="plano in planosFiltrados"
        :key="plano.id"
        class="border border-gray-200 dark:border-gray-700 p-4 rounded hover:shadow bg-white dark:bg-gray-800 transition-colors flex justify-between"
      >
        <div>
          <p class="text-gray-800 dark:text-gray-200">
            <span class="font-medium">ID:</span> {{ plano.id }}
          </p>
          <p class="text-gray-800 dark:text-gray-200">
            <span class="font-medium">Período:</span>
            {{ formatDate(plano.dataInicio) }} — {{ formatDate(plano.dataFim) }}
          </p>
          <p class="mt-1 text-gray-800 dark:text-gray-200">
            <span class="font-medium">Descrição:</span> {{ plano.descricao }}
          </p>
        </div>
        <div class="flex space-x-2">
          <button
            @click="onEditar(plano)"
            class="bg-yellow-500 hover:bg-yellow-600 text-white text-xs rounded px-2 py-1"
          >
            Editar
          </button>
          <button
            @click="onExcluir(plano.id)"
            class="bg-red-600 hover:bg-red-700 text-white text-xs rounded px-2 py-1"
          >
            Excluir
          </button>
        </div>
      </li>
      <li v-if="planosFiltrados.length === 0" class="text-gray-600 dark:text-gray-400">
        Nenhum plano encontrado para o período selecionado.
      </li>
    </ul>

    <div class="mt-4">
      <button
        @click="onCriar"
        class="bg-green-600 hover:bg-green-700 text-white rounded px-3 py-1"
      >
        + Novo Plano
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { fetchPlanosPorPaciente, deletePlano } from "../services/fakePlanos";

const props = defineProps({
  pacienteId: {
    type: [Number, String],
    required: true
  },
  recarregarKey: {
    type: [Number, String],
    default: 0
  }
});

const emit = defineEmits(["createPlano", "editPlano"]);

const planos = ref([]);
const loading = ref(true);
const dataInicioFiltro = ref("");
const dataFimFiltro = ref("");

const carregarPlanos = async () => {
  loading.value = true;
  const idNum = Number(props.pacienteId);
  planos.value = await fetchPlanosPorPaciente(idNum);
  loading.value = false;
};

onMounted(carregarPlanos);
watch(() => props.recarregarKey, carregarPlanos);

const planosFiltrados = computed(() => {
  if (!dataInicioFiltro.value && !dataFimFiltro.value) {
    return planos.value;
  }
  return planos.value.filter((plano) => {
    const inicioPlano = new Date(plano.dataInicio);
    const fimPlano = new Date(plano.dataFim);

    if (
      dataInicioFiltro.value &&
      fimPlano < new Date(dataInicioFiltro.value)
    ) {
      return false;
    }
    if (
      dataFimFiltro.value &&
      inicioPlano > new Date(dataFimFiltro.value)
    ) {
      return false;
    }
    return true;
  });
});

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

const filtrar = () => {};
const limparFiltro = () => {
  dataInicioFiltro.value = "";
  dataFimFiltro.value = "";
};

const onExcluir = async (id) => {
  const confirmou = confirm(`Deseja excluir o plano #${id}?`);
  if (!confirmou) return;
  const ok = await deletePlano(id);
  if (ok) {
    await carregarPlanos();
  } else {
    alert("Erro ao excluir plano.");
  }
};

const onCriar = () => {
  emit("createPlano");
};
const onEditar = (plano) => {
  emit("editPlano", plano);
};
</script>

<style scoped>
</style>
