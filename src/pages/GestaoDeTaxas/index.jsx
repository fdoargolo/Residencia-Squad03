import React, { useState, useMemo } from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, Tooltip, YAxis, CartesianGrid
} from 'recharts';
import './style.css';

// Mock de dados com divergências de exemplo
const linhasVendas = [
  { data: '03/04/2024', valor: 100, valorDebitado:  95,   forma: 'Débito',  bandeira: 'Visa',       operadora: 'Cielo'   },
  { data: '21/03/2024', valor: 200, valorDebitado: 189,  forma: 'Ticket',  bandeira: 'Ticket',     operadora: 'Edenred' },
  { data: '19/03/2024', valor: 600, valorDebitado: 570,  forma: 'Débito',  bandeira: 'Elo',        operadora: 'Cielo'   },
  { data: '03/03/2024', valor: 200, valorDebitado: 190,  forma: 'Crédito', bandeira: 'Visa',       operadora: 'Cielo'   },
  { data: '27/02/2024', valor: 500, valorDebitado: 475,  forma: 'Crédito', bandeira: 'Elo',        operadora: 'Elo'     },
  { data: '15/02/2024', valor: 350, valorDebitado: 334.25, forma: 'Débito',  bandeira: 'MasterCard', operadora: 'Edenred' },
  { data: '10/02/2024', valor: 450, valorDebitado: 430.00, forma: 'Crédito', bandeira: 'Visa',       operadora: 'Elo'     },
  { data: '05/02/2024', valor: 250, valorDebitado: 237.50, forma: 'Débito',  bandeira: 'Elo',        operadora: 'Cielo'   },
  { data: '01/02/2024', valor: 300, valorDebitado: 285.00, forma: 'Ticket',  bandeira: 'Edenred',   operadora: 'Edenred' },
  { data: '28/01/2024', valor: 150, valorDebitado: 144.00, forma: 'Crédito', bandeira: 'Visa',       operadora: 'Elo'     },
  { data: '20/01/2024', valor: 700, valorDebitado: 660.00, forma: 'Débito',  bandeira: 'MasterCard', operadora: 'Cielo'   },
  { data: '15/01/2024', valor: 400, valorDebitado: 384.00, forma: 'Crédito', bandeira: 'Elo',        operadora: 'Elo'     }
];

// Taxas por operadora (ex.: 0.05 = 5%)
const operatorFees = {
  Cielo:   0.05,
  Edenred: 0.045,
  Elo:     0.04,
};

export default function GestaoDeTaxas() {
  const [filter, setFilter] = useState('');

  // Adiciona valor esperado e divergências
  const linhasComValores = useMemo(
    () => linhasVendas.map(l => {
      const feeRate       = operatorFees[l.operadora] || 0;
      const valorComTaxas = +(l.valor * (1 - feeRate)).toFixed(2);
      const divergencia   = +(valorComTaxas - l.valorDebitado).toFixed(2);
      return { ...l, valorComTaxas, divergencia };
    }),
    []
  );

  // Totais para KPIs e gráficos
  const totalBruto       = useMemo(() => linhasVendas.reduce((sum, l) => sum + l.valor, 0), []);
  const totalTaxas       = useMemo(() => linhasComValores.reduce((sum, l) => sum + (l.valor - l.valorComTaxas), 0), [linhasComValores]);
  const totalLiquido     = useMemo(() => linhasComValores.reduce((sum, l) => sum + l.valorComTaxas, 0), [linhasComValores]);
  const totalDivergencia = useMemo(() => linhasComValores.reduce((sum, l) => sum + l.divergencia, 0), [linhasComValores]);
  const avgTaxRate       = totalTaxas / totalBruto * 100;

  // KPIs superiores
  const kpisTopo = [
    { titulo: 'Total de Vendas no Cartão', valor: `R$ ${totalBruto.toLocaleString(undefined, { minimumFractionDigits: 2 })}` },
    { titulo: 'Total de Taxas Pagas',      valor: `R$ ${totalTaxas.toLocaleString(undefined, { minimumFractionDigits: 2 })}` },
    { titulo: 'Taxa Média por Operadora',  valor: `${avgTaxRate.toFixed(2)} %` }
  ];

  // Pie chart: líquido recebido vs taxas vs divergência
  const pieDados = useMemo(
    () => [
      { name: 'Recebido',    valor: totalLiquido },
      { name: 'Taxas',       valor: totalTaxas   },
      { name: 'Divergência', valor: totalDivergencia }
    ],
    [totalLiquido, totalTaxas, totalDivergencia]
  );

  // Bar chart: taxa por operadora
  const barrasOperadora = useMemo(
    () => Object.entries(operatorFees).map(([operadora, rate]) => ({
      operadora,
      perc: +(rate * 100).toFixed(1)
    })),
    []
  );

  // Filtro de tabela
  const filteredVendas = useMemo(
    () => linhasComValores.filter(l =>
      [l.data, l.forma, l.bandeira, l.operadora, l.valorComTaxas, l.valorDebitado, l.divergencia]
        .some(f => String(f).toLowerCase().includes(filter.toLowerCase()))
    ),
    [filter, linhasComValores]
  );

  return (
    <div className="tax-wrapper">
      <h1>Home</h1>
      <section className="kpi-row">
        {kpisTopo.map(k => (
          <div key={k.titulo} className="kpi-card">
            <h3>{k.titulo}</h3>
            <p>{k.valor}</p>
          </div>
        ))}
      </section>

      <section className="main-grid">

        <div className="card table-card">
          <h3>Vendas</h3>
          <input
            className="filter-input"
            type="text"
            placeholder="Filtrar..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Valor Bruto</th>
                <th>Forma</th>
                <th>Bandeira</th>
                <th>Operadora</th>
                <th>Valor com Taxas</th>
                <th>Valor Debitado</th>
                <th>Divergência</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendas.map((l, i) => (
                <tr key={i}>
                  <td>{l.data}</td>
                  <td>R$ {l.valor.toFixed(2)}</td>
                  <td>{l.forma}</td>
                  <td>{l.bandeira}</td>
                  <td>{l.operadora}</td>
                  <td>R$ {l.valorComTaxas.toFixed(2)}</td>
                  <td>R$ {l.valorDebitado.toFixed(2)}</td>
                  <td className={l.divergencia !== 0 ? 'divergencia' : ''}>
                    R$ {l.divergencia.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card bar-card">
          <h3>Taxa por Operadora</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={barrasOperadora} layout="vertical">
              <CartesianGrid strokeOpacity={0.1} />
              <XAxis type="number" domain={[0, 10]} tickFormatter={v => `${v}%`} />
              <YAxis type="category" dataKey="operadora" width={90} />
              <Tooltip formatter={v => `${v}%`} />
              <Bar dataKey="perc" fill="#7dc67d" barSize={18} radius={[0,10,10,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card pie-card">
          <h3>Valor Líquido Recebido</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={pieDados}
                dataKey="valor"
                nameKey="name"
                innerRadius={60}
                outerRadius={100}
                label={({ name, percent }) => `${name} ${(percent*100).toFixed(2)}%`}
              >
                {pieDados.map((_, i) => (
                  <Cell
                    key={i}
                    fill={
                      i === 0 ? '#4fe07e' :   // Recebido: verde
                      i === 1 ? '#f0b429' :   // Taxas: laranja
                                '#d62828'    // Divergência: vermelho
                    }
                  />
                ))}
              </Pie>
              <Tooltip formatter={v => `R$ ${v.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </section>
    </div>
  );
}
