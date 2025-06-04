
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchKpiPorPaciente(pacienteId) {
  await delay(200);


  const randomBetween = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  return {
    calorias: randomBetween(1500, 3000),
    proteinas: randomBetween(50, 200),
    carboidratos: randomBetween(100, 400),
    gorduras: randomBetween(30, 120)
  };
}
