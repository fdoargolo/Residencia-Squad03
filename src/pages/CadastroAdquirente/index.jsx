import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; // reaproveita o mesmo CSS de CadastroDeTaxas

const TIPOS_ADQUIRENTE = ['Crédito', 'Débito', 'Voucher'];
const STATUS          = ['Ativo', 'Inativo'];

export default function CadastroDeAdquirente() {
  const [form, setForm] = useState({
    identificacao: '',
    banco: '',
    tipo: 'Crédito',
    status: 'Ativo'
  });
  // ← estado para segurar o arquivo importado
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const atualizar = campo => e =>
    setForm(prev => ({ ...prev, [campo]: e.target.value }));

  const limpar = () =>
    setForm({ identificacao:'', banco:'', tipo:'Crédito', status:'Ativo' });

  const salvar = e => {
    e.preventDefault();
    alert('Adquirente cadastrado!\n' + JSON.stringify(form, null, 2));
    limpar();
  };

  // ← handler que captura o arquivo
  const handleFileChange = e => {
    const f = e.target.files[0];
    if (f) setFile(f);
  };

  return (
    <div className="cad-wrapper">
      <h1>Cadastro de Adquirente</h1>

      <form className="form-card" onSubmit={salvar}>
        <label>
          Identificação
          <input
            type="text"
            placeholder="Identificação"
            value={form.identificacao}
            onChange={atualizar('identificacao')}
            required
          />
        </label>

        <label>
          Banco Vinculado
          <input
            type="text"
            placeholder="Banco Vinculado"
            value={form.banco}
            onChange={atualizar('banco')}
            required
          />
        </label>

        <label>
          Tipo de Adquirente
          <select value={form.tipo} onChange={atualizar('tipo')} required>
            {TIPOS_ADQUIRENTE.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>

        <label>
          Status
          <select value={form.status} onChange={atualizar('status')} required>
            {STATUS.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
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
