const planos = [
  {
    id: 1,
    pacienteId: 1,
    dataInicio: "2025-06-01",
    dataFim: "2025-06-30",
    descricao: "Plano de junho para reduzir carboidrato à noite",
  },
  {
    id: 2,
    pacienteId: 1,
    dataInicio: "2025-05-01",
    dataFim: "2025-05-31",
    descricao: "Plano de maio com foco em proteína pós-treino",
  },
  {
    id: 3,
    pacienteId: 2,
    dataInicio: "2025-06-10",
    dataFim: "2025-07-10",
    descricao: "Plano para ganho de massa muscular",
  },
  {
    id: 4,
    pacienteId: 3,
    dataInicio: "2025-04-01",
    dataFim: "2025-04-30",
    descricao: "Plano detox de abril",
  },
  
];


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export async function fetchPlanosPorPaciente(pacienteId) {
  await delay(500); // simula 500ms de latência
  return planos.filter((p) => p.pacienteId === pacienteId).map((p) => ({ ...p }));
}

export async function createPlano(pacienteId, data) {
  await delay(300);
  const novoId = planos.length ? planos[planos.length - 1].id + 1 : 1;
  const novoPlano = { id: novoId, pacienteId, ...data };
  planos.push(novoPlano);
  return { ...novoPlano };
}


export async function updatePlano(id, data) {
  await delay(300);
  const index = planos.findIndex((p) => p.id === id);
  if (index === -1) return null;
  
  const pacienteId = planos[index].pacienteId;
  planos[index] = { id, pacienteId, ...data };
  return { ...planos[index] };
}


export async function deletePlano(id) {
  await delay(300);
  const index = planos.findIndex((p) => p.id === id);
  if (index === -1) return false;
  planos.splice(index, 1);
  return true;
}
