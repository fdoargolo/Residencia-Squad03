const ctx = document.getElementById('barChart').getContext('2d');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['01/04', '02/04', '03/04', '04/04', '05/04', '06/04', '07/04'],
    datasets: [
      {
        label: 'Valor Gasto',
        data: [1000, 1200, 1400, 1200, 1000, 1500, 1400],
        backgroundColor: 'red'
      },
      {
        label: 'Faturamento',
        data: [2000, 1500, 2000, 700, 500, 2500, 2000],
        backgroundColor: 'green'
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

const funnelCtx = document.getElementById('funnelChart').getContext('2d');
new Chart(funnelCtx, {
  type: 'bar',
  data: {
    labels: ['Landing Page', 'Carrinho', 'Compras', 'Reembolso'],
    datasets: [{
      label: 'Conversão',
      data: [100, 85, 47, 10],
      backgroundColor: ['#9370DB', '#8A2BE2', '#4B0082', '#2E0854']
    }]
  },
  options: {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        max: 100
      }
    }
  }
});
