// src/services/fakeKpi.js
// Simula um “endpoint” de KPIs nutri para cada paciente.
// Retorna valores aleatórios para calorias, proteínas, carboidratos e gorduras.

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchKpiPorPaciente(pacienteId) {
  // simula latência de ~200 ms
  await delay(200);

  // Gera valores aleatórios dentro de um intervalo razoável:
  // - Calorias totais: 1500 a 3000 kcal
  // - Proteínas: 50 a 200 g
  // - Carboidratos: 100 a 400 g
  // - Gorduras: 30 a 120 g
  const randomBetween = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  return {
    calorias: randomBetween(1500, 3000),
    proteinas: randomBetween(50, 200),
    carboidratos: randomBetween(100, 400),
    gorduras: randomBetween(30, 120)
  };
}
