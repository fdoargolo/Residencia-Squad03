// Gráfico de Pizza
const ctx = document.getElementById('pieChart').getContext('2d');
new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['Visa', 'Mastercard', 'Outros'],
    datasets: [{
      label: 'Valor Líquido',
      data: [65, 25, 10],
      backgroundColor: ['#7dc67d', '#0f1626', '#4b0082'],
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'white'
        }
      }
    }
  }
});
