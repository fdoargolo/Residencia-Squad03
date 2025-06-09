// src/pages/Home.jsx
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import './style.css';

/* 🔸 Dados-exemplo mais variados */
const lastmonth = [
  { dia: '01/04', gasto: 1200, fat: 2500 },
  { dia: '02/04', gasto:  900, fat: 1800 },
  { dia: '03/04', gasto: 1500, fat: 3000 },
  { dia: '04/04', gasto:  800, fat: 2200 },
  { dia: '05/04', gasto: 1100, fat: 2700 },
  { dia: '06/04', gasto: 1400, fat: 3200 },
  { dia: '07/04', gasto: 1300, fat: 2900 },
  { dia: '08/04', gasto: 1000, fat: 2600 },
  { dia: '09/04', gasto: 1600, fat: 3400 },
  { dia: '10/04', gasto:  900, fat: 2100 },
  { dia: '11/04', gasto: 1250, fat: 2800 },
  { dia: '12/04', gasto:  950, fat: 2300 },
  { dia: '13/04', gasto: 1450, fat: 3100 },
  { dia: '14/04', gasto: 1350, fat: 3000 },
  { dia: '15/04', gasto: 1150, fat: 2700 },
  { dia: '16/04', gasto: 1050, fat: 2400 },
  { dia: '17/04', gasto: 1550, fat: 3300 },
  { dia: '18/04', gasto:  980, fat: 2200 },
  { dia: '19/04', gasto: 1120, fat: 2600 },
  { dia: '20/04', gasto: 1420, fat: 3200 },
  { dia: '21/04', gasto: 1320, fat: 3000 },
  { dia: '22/04', gasto: 1020, fat: 2500 },
  { dia: '23/04', gasto: 1580, fat: 3500 },
  { dia: '24/04', gasto:  970, fat: 2100 },
  { dia: '25/04', gasto: 1190, fat: 2800 },
  { dia: '26/04', gasto: 1010, fat: 2400 },
  { dia: '27/04', gasto: 1510, fat: 3300 },
  { dia: '28/04', gasto: 1410, fat: 3100 },
  { dia: '29/04', gasto:  990, fat: 2200 },
  { dia: '30/04', gasto: 1210, fat: 2900 },
];

export default function Home() {
  // Cálculos dinâmicos
  const totalBanco       = lastmonth.reduce((s, d) => s + d.fat, 0);
  const totalAdquirente  = lastmonth.reduce((s, d) => s + d.gasto, 0);
  const diferenca        = totalBanco - totalAdquirente;

  // Formatadores
  const fmtCurrency = v =>
    v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const kpis = [
    { label: 'Total recebido de banco',    value: fmtCurrency(totalBanco) },
    { label: 'Total recebido adquirente',  value: fmtCurrency(totalAdquirente) },
    { label: 'Qtd. Transações',            value: "122"},
    { label: 'Diferença Adquirente-Banco', value: fmtCurrency(diferenca)     },
  ];

  return (
    <div className="home-wrapper">
      <h1 className="page-title">Gestão de Taxas</h1>

      {/* gráfico de 30 dias */}
      <div className="row-2">
        <div className="card">
          <h3>Últimos 30 Dias</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={lastmonth}>
              <CartesianGrid strokeOpacity={0.1} />
              <XAxis dataKey="dia"   tick={{ fill: '#9b8ac7' }} />
              <YAxis   tick={{ fill: '#9b8ac7' }} />
              <Tooltip formatter={v => fmtCurrency(v)} />
              <Legend />
              {/* laranja no gasto */}
              <Bar
                barSize={28}
                dataKey="gasto"
                name="Total Recebido dos Adquirentes"
                fill="#ff8c00"
                radius={[4, 4, 0, 0]}
              />
              {/* verde no banco */}
              <Bar
                barSize={28}
                dataKey="fat"
                name="Total Recebido dos Bancos"
                fill="#38b000"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* KPIs */}
      <div className="row-2">
        <div className="card kpi-block">
          <h3>Média Mensal</h3>
          <div className="kpi-grid">
            {kpis.map(k => (
              <div key={k.label} className="kpi">
                <span>{k.label}</span>
                <strong>{k.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
