// “banco de dados”
const pacientes = [
  { id: 1, nome: "João Silva", dataNascimento: "1985-07-23", email: "joao.silva@exemplo.com" },
  { id: 2, nome: "Mariana Souza", dataNascimento: "1990-03-12", email: "mariana.souza@exemplo.com" },
  { id: 3, nome: "Carlos Santos", dataNascimento: "1978-11-05", email: "carlos.santos@exemplo.com" },
];


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchPacientes() {
  await delay(500); 
  return [...pacientes]; 
}
export async function fetchPacientePorId(id) {
  await delay(300);
  const paciente = pacientes.find(p => p.id === id);
  return paciente ? { ...paciente } : null;
}

export async function createPaciente(data) {
  await delay(300);
  const novoId = pacientes.length ? pacientes[pacientes.length - 1].id + 1 : 1;
  const novoPaciente = { id: novoId, ...data };
  pacientes.push(novoPaciente);
  return { ...novoPaciente };
}

export async function updatePaciente(id, data) {
  await delay(300);
  const index = pacientes.findIndex(p => p.id === id);
  if (index === -1) return null;
  pacientes[index] = { id, ...data };
  return { ...pacientes[index] };
}

export async function deletePaciente(id) {
  await delay(300);
  const index = pacientes.findIndex(p => p.id === id);
  if (index === -1) return false;
  pacientes.splice(index, 1);
  return true;
}
