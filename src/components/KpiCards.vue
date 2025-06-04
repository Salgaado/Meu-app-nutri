<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
    <div
      v-for="(valor, nome) in kpis"
      :key="nome"
      class="bg-white dark:bg-gray-800 shadow rounded p-4 flex flex-col items-center transition-colors"
    >
      <span class="text-gray-500 dark:text-gray-400 text-sm">{{ labels[nome] }}</span>
      <span class="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-1">
        {{ formatValor(nome, valor) }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { fetchKpiPorPaciente } from "../services/fakeKpi";

const props = defineProps({
  pacienteId: {
    type: [Number, String],
    required: true
  }
});

const labels = {
  calorias: "Calorias (kcal)",
  proteinas: "Proteínas (g)",
  carboidratos: "Carboidratos (g)",
  gorduras: "Gorduras (g)"
};

const kpis = ref({
  calorias: 0,
  proteinas: 0,
  carboidratos: 0,
  gorduras: 0
});

let intervalId = null;

const atualizarKpis = async () => {
  const idNum = Number(props.pacienteId);
  if (isNaN(idNum)) return;
  const dados = await fetchKpiPorPaciente(idNum);
  kpis.value = { ...dados };
};

onMounted(async () => {
  await atualizarKpis();
  intervalId = setInterval(async () => {
    await atualizarKpis();
  }, 30_000);
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});

const formatValor = (nome, valor) => {
  if (nome === "calorias") return valor.toLocaleString();
  return `${valor.toLocaleString()} g`;
};
</script>

<style scoped>

</style>
