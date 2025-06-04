<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div
      class="bg-white dark:bg-gray-800 rounded shadow-lg w-full max-w-md p-6 transition-colors"
    >
      <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        {{ dialogTitle }}
      </h2>
      <form @submit.prevent="onSave" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Data de Início
          </label>
          <input
            type="date"
            v-model="form.dataInicio"
            class="border rounded px-2 py-1 w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Data de Fim
          </label>
          <input
            type="date"
            v-model="form.dataFim"
            class="border rounded px-2 py-1 w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Descrição
          </label>
          <input
            type="text"
            v-model="form.descricao"
            placeholder="Digite a descrição do plano"
            class="border rounded px-2 py-1 w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          />
        </div>
        <div class="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            @click="onClose"
            class="bg-gray-400 hover:bg-gray-500 text-white rounded px-3 py-1"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-1"
          >
            {{ mode === "create" ? "Criar" : "Atualizar" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { createPlano, updatePlano } from "../services/fakePlanos";

const props = defineProps({
  mode: {
    type: String,
    required: true
  },
  pacienteId: {
    type: [Number, String],
    required: true
  },
  planoData: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(["closed", "saved"]);

const dialogTitle = computed(() =>
  props.mode === "create" ? "Criar Novo Plano" : "Editar Plano"
);

const form = ref({
  dataInicio: "",
  dataFim: "",
  descricao: ""
});

onMounted(() => {
  if (props.mode === "edit" && props.planoData) {
    form.value.dataInicio = props.planoData.dataInicio;
    form.value.dataFim = props.planoData.dataFim;
    form.value.descricao = props.planoData.descricao;
  }
});

const onClose = () => emit("closed");

const onSave = async () => {
  if (
    !form.value.dataInicio ||
    !form.value.dataFim ||
    !form.value.descricao
  ) {
    alert("Preencha todos os campos.");
    return;
  }

  const payload = {
    dataInicio: form.value.dataInicio,
    dataFim: form.value.dataFim,
    descricao: form.value.descricao
  };

  if (props.mode === "create") {
    const criado = await createPlano(Number(props.pacienteId), payload);
    if (criado) emit("saved", criado);
    else alert("Falha ao criar plano.");
  } else {
    const atualizado = await updatePlano(props.planoData.id, payload);
    if (atualizado) emit("saved", atualizado);
    else alert("Falha ao atualizar plano.");
  }
};
</script>

<style scoped>
/* Tudo via Tailwind/dark:… */
</style>
