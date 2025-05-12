function calcularPorcentagens() {
  const linhas = document.querySelectorAll("#tabela-transacoes tr");

  linhas.forEach(linha => {
    const atualInput = linha.querySelector(".valor-atual");
    const anteriorInput = linha.querySelector(".valor-anterior");
    const percentualInput = linha.querySelector(".percentual");

    if (!atualInput || !anteriorInput || !percentualInput) return;

    const atual = parseFloat(atualInput.value);
    const anterior = parseFloat(anteriorInput.value);

    if (!isNaN(atual) && !isNaN(anterior) && anterior !== 0) {
      const variacao = ((atual - anterior) / anterior) * 100;
      percentualInput.value = `${variacao.toFixed(2)}%`;
    } else {
      percentualInput.value = "-";
    }
  });
}

// Atualiza porcentagens quando qualquer input é alterado
document.querySelectorAll(".valor-atual, .valor-anterior").forEach(input => {
  input.addEventListener("input", calcularPorcentagens);
});

function calcularPorcentagensFixas() {
  const linhas = document.querySelectorAll("#tabela-transacoes tr");

  linhas.forEach(linha => {
    const atual = parseFloat(linha.querySelector(".valor-atual").textContent);
    const anterior = parseFloat(linha.querySelector(".valor-anterior").textContent);
    const percentualCell = linha.querySelector(".percentual");

    if (!isNaN(atual) && !isNaN(anterior) && anterior !== 0) {
      const variacao = ((atual - anterior) / anterior) * 100;
      const valorFormatado = `${Math.abs(variacao).toFixed(2)}%`;

      percentualCell.textContent = valorFormatado;

      if (variacao >= 0) {
        percentualCell.classList.add("positivo");
        percentualCell.classList.remove("negativo");
      } else {
        percentualCell.classList.add("negativo");
        percentualCell.classList.remove("positivo");
      }
    } else {
      percentualCell.textContent = "-";
      percentualCell.classList.remove("positivo", "negativo");
    }
  });
}

document.addEventListener("DOMContentLoaded", calcularPorcentagensFixas);
