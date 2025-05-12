const transactions = [
    { nome: "Pedro", sobrenome: "Guilherme", codigo: "AC23XB216753", valor: "R$ 300", imposto: "R$ 15" },
    { nome: "Felipe", sobrenome: "José", codigo: "AC22YT216753", valor: "R$ 200", imposto: "R$ 10" }
  ];
  
  const tableBody = document.getElementById('transaction-table-body');
  
  transactions.forEach(t => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${t.nome}</td>
      <td>${t.sobrenome}</td>
      <td>${t.codigo}</td>
      <td>${t.valor}</td>
      <td>${t.imposto}</td>
    `;
    tableBody.appendChild(row);
  });
  
  // Adiciona linhas vazias para completar a tabela
  for (let i = 0; i < 8; i++) {
    const emptyRow = document.createElement('tr');
    emptyRow.innerHTML = `
      <td>....</td>
      <td>....</td>
      <td>....</td>
      <td>....</td>
      <td>....</td>
    `;
    tableBody.appendChild(emptyRow);
  }
  