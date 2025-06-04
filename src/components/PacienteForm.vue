<template>
  <div class="max-w-lg mx-auto bg-white shadow-lg rounded p-6">
    <h2 class="text-xl font-semibold mb-4" v-if="isEdit">Editar Paciente</h2>
    <h2 class="text-xl font-semibold mb-4" v-else>Criar Novo Paciente</h2>

    <!-- Formulário -->
    <form @submit.prevent="onSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1" for="nome">Nome</label>
        <Input
          id="nome"
          v-model="form.nome"
          placeholder="Digite o nome"
          class="w-full"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1" for="dataNascimento">
          Data de Nascimento
        </label>
        <DatePicker
          id="dataNascimento"
          v-model="form.dataNascimento"
          format="yyyy-MM-dd"
          class="w-full"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1" for="email">E-mail</label>
        <Input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="Digite o e-mail"
          class="w-full"
        />
      </div>

      <!-- Botões de ação -->
      <div class="flex justify-end space-x-2 mt-6">
        <Button themeColor="secondary" @click="onCancel" type="button">
          Cancelar
        </Button>
        <Button themeColor="primary" type="submit">
          {{ isEdit ? "Atualizar" : "Criar" }}
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";


import {
  fetchPacientePorId,
  createPaciente,
  updatePaciente,
} from "../services/fakeApi";

const props = defineProps({
  patientId: {
    type: Number,
    default: null,
  },
});

const emit = defineEmits(["saved", "canceled"]);

const isEdit = computed(() => props.patientId !== null);


const form = ref({
  nome: "",
  dataNascimento: null, 
  email: "",
});


onMounted(async () => {
  if (isEdit.value) {

    const paciente = await fetchPacientePorId(props.patientId);
    if (paciente) {
      form.value.nome = paciente.nome;

      form.value.dataNascimento = new Date(paciente.dataNascimento);
      form.value.email = paciente.email;
    } else {
      alert("Paciente não encontrado para edição.");
    }
  }
});


const onSubmit = async () => {

  if (!form.value.nome || !form.value.dataNascimento || !form.value.email) {
    alert("Preencha todos os campos.");
    return;
  }


  const payload = {
    nome: form.value.nome,

    dataNascimento: form.value.dataNascimento
      .toISOString()
      .slice(0, 10),
    email: form.value.email,
  };

  if (isEdit.value) {
    // Modo edição
    const atualizado = await updatePaciente(props.patientId, payload);
    if (atualizado) {
      alert("Paciente atualizado com sucesso!");
      emit("saved", atualizado);
    } else {
      alert("Falha ao atualizar paciente.");
    }
  } else {
    // Modo criação
    const criado = await createPaciente(payload);
    if (criado) {
      alert("Paciente criado com sucesso!");
      // Limpar campos após criar
      form.value.nome = "";
      form.value.dataNascimento = null;
      form.value.email = "";
      emit("saved", criado);
    } else {
      alert("Falha ao criar paciente.");
    }
  }
};

const onCancel = () => {
  emit("canceled");
};
</script>

<style scoped>

</style>
