import { useMemo } from 'react';
import './style.css';

/* ─── Dados de exemplo (substitua pelos seus) ───────────── */
const metricasChave = [
  { label: 'Faturamento',      value: 'R$ 123.365,00' },
  { label: 'Valor Gasto',      value: 'R$ 20.355,00' },
  { label: 'Impostos',         value: '5%' },
  { label: 'Lucro',            value: 'R$ 103.010,00' },
  { label: 'Margem Lucro',     value: '83.5%' },
  { label: 'Qtd. Transações',  value: '122' },
];

const todasMetricasRaw = [
  { metrica: 'Receitas',              atual: 123000, anterior: 100000 },
  { metrica: 'Despesas Operacionais', atual: 30000,  anterior: 25000  },
  { metrica: 'Lucro Operacional',     atual: 93000,  anterior: 75000  },
  { metrica: 'Depreciação',           atual: 4000,   anterior: 5000   },
  { metrica: 'Juros',                 atual: 2000,   anterior: 1500   },
  { metrica: 'Lucro Líquido',         atual: 87000,  anterior: 68500  },
  { metrica: 'Impostos',              atual: 6000,   anterior: 5500   },
  { metrica: 'Lucro Após Impostos',   atual: 81000,  anterior: 63000  },
];

/* Calcula % e classe de cor uma única vez */
const todasMetricas = todasMetricasRaw.map(r => {
  const delta = ((r.atual - r.anterior) / r.anterior) * 100;
  return {
    ...r,
    delta: delta.toFixed(1) + '%',
    cls: delta >= 0 ? 'positivo' : 'negativo',
  };
});

export default function RelatorioFinanceiro() {
  return (
    <div className="rel-wrapper">
      <h1>Métricas-Chave</h1>

      {/* blocos principais */}
      <section className="metricas">
        {metricasChave.map(m => (
          <div key={m.label}>
            <strong>{m.label}</strong>
            <p>{m.value}</p>
          </div>
        ))}
      </section>

      {/* tabela completa */}
      <section className="todas-metricas">
        <h2>Todas as Métricas</h2>
        <table>
          <thead>
            <tr>
              <th>Métrica</th>
              <th>Ano do Relatório</th>
              <th>Ano Anterior</th>
              <th>% Alteração</th>
            </tr>
          </thead>
          <tbody>
            {todasMetricas.map(r => (
              <tr key={r.metrica}>
                <td>{r.metrica}</td>
                <td>{r.atual.toLocaleString('pt-BR')}</td>
                <td>{r.anterior.toLocaleString('pt-BR')}</td>
                <td className={`percentual ${r.cls}`}>{r.delta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
