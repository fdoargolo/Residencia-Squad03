import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const ADQUIRENTES = ['Cielo', 'Stone', 'PagSeguro'];
const BANDEIRAS   = ['Visa', 'Master', 'Elo', 'Amex'];
const TIPOS       = ['Débito', 'Crédito', 'Voucher'];
const STATUS_OP   = ['Ativo', 'Inativo'];

export default function CadastroDeTaxas() {
  const [form, setForm] = useState({
    adquirente: '', bandeira: '', tipo: '',
    parcelas: '', percentual: '', fixa: '', status: 'Ativo',
  });

  // ← estado para segurar o arquivo importado
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const atualizar = (campo) => (e) =>
    setForm({ ...form, [campo]: e.target.value });

  const limpar = () =>
    setForm({ adquirente:'', bandeira:'', tipo:'', parcelas:'', percentual:'', fixa:'', status:'Ativo' });

  const salvar = (e) => {
    e.preventDefault();
    alert('Taxa cadastrada!\n' + JSON.stringify(form, null, 2));
    limpar();
  };

  // ← handler que captura o arquivo
  const handleFileChange = e => {
    const f = e.target.files[0];
    if (f) setFile(f);
  };

  return (
    <div className="cad-wrapper">
      <h1>Cadastro de Taxas</h1>

      <form className="form-card" onSubmit={salvar}>
        <label>
          Adquirente
          <select value={form.adquirente} onChange={atualizar('adquirente')} required>
            <option value="">Selecione</option>
            {ADQUIRENTES.map(a => <option key={a}>{a}</option>)}
          </select>
        </label>

        <label>
          Bandeira
          <select value={form.bandeira} onChange={atualizar('bandeira')} required>
            <option value="">Selecione</option>
            {BANDEIRAS.map(b => <option key={b}>{b}</option>)}
          </select>
        </label>

        <label>
          Tipo de Transação
          <select value={form.tipo} onChange={atualizar('tipo')} required>
            <option value="">Selecione</option>
            {TIPOS.map(t => <option key={t}>{t}</option>)}
          </select>
        </label>

        <label>
          Número de Parcelas
          <input
            type="number"
            min="1"
            placeholder="Ex: 1, 2, 3…"
            value={form.parcelas}
            onChange={atualizar('parcelas')}
          />
        </label>

        <label>
          Taxa Percentual (%)
          <input
            type="number"
            step="0.01"
            placeholder="Ex: 2.99"
            value={form.percentual}
            onChange={atualizar('percentual')}
          />
        </label>

        <label>
          Taxa Fixa (R$)
          <input
            type="number"
            step="0.01"
            placeholder="Ex: 0.49"
            value={form.fixa}
            onChange={atualizar('fixa')}
          />
        </label>

        <label>
          Status
          <select value={form.status} onChange={atualizar('status')}>
            {STATUS_OP.map(s => <option key={s}>{s}</option>)}
          </select>
        </label>

        {/* ← BLOCO DE IMPORTAÇÃO DE ARQUIVO */}
        <div className="import-file">
          <input
            id="file-input"
            type="file"
            accept=".csv,.xlsx"
            onChange={handleFileChange}
          />
          <label htmlFor="file-input" className="btn-import">
            Importar arquivo
          </label>
          {file && <span className="file-name">{file.name}</span>}
        </div>
        {/* ↑↑↑ */}

        <div className="botoes">
          <button type="submit" className="salvar">Salvar</button>
          <button type="button" className="limpar" onClick={limpar}>Limpar</button>
          <button
            type="button"
            className="cancelar"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
