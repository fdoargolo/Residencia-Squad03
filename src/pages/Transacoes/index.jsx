// src/pages/Transacoes.jsx
import React, { useState, useMemo } from 'react';
import './style.css';

// mesmo mock de vendas usado no Home
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

const operatorFees = {
  Cielo:   0.05,
  Edenred: 0.045,
  Elo:     0.04,
};

export default function Transacoes() {
  const [filtro, setFiltro] = useState('');

  // calcula valorComTaxas e divergência
  const linhasComValores = useMemo(
    () => linhasVendas.map(l => {
      const fee = operatorFees[l.operadora] || 0;
      const valorComTaxas = +(l.valor * (1 - fee)).toFixed(2);
      const divergencia   = +(valorComTaxas - l.valorDebitado).toFixed(2);
      return { ...l, valorComTaxas, divergencia };
    }),
    []
  );

  // filtra por qualquer campo
  const filtrado = useMemo(
    () => linhasComValores.filter(l =>
      [l.data, l.forma, l.bandeira, l.operadora, l.valor, l.valorComTaxas, l.valorDebitado, l.divergencia]
        .some(v => String(v).toLowerCase().includes(filtro.toLowerCase()))
    ),
    [filtro, linhasComValores]
  );

  return (
    <div className="trx-wrapper">
      <h1>Transações</h1>
      <input
        className="busca"
        placeholder="Filtrar tabela…"
        value={filtro}
        onChange={e => setFiltro(e.target.value)}
      />

      <div className="card">
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
            {filtrado.map((l, i) => (
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
            {filtrado.length === 0 && (
              <tr>
                <td colSpan={8} className="vazio">Nenhum resultado</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
