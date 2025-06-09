import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const TIPOS_CONTA = ['CPF', 'CNPJ'];
const STATUS     = ['Ativo', 'Inativo'];

export default function CadastroBanco() {
  const [form, setForm] = useState({
    nomeBanco: '',
    numeroConta: '',
    agencia: '',
    tipoConta: 'CNPJ',
    status: 'Ativo',
  });
  // ← estado para segurar o arquivo
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const onChange = campo => e =>
    setForm(f => ({ ...f, [campo]: e.target.value }));

  const limpar = () =>
    setForm({
      nomeBanco: '',
      numeroConta: '',
      agencia: '',
      tipoConta: 'CNPJ',
      status: 'Ativo',
    });

  const salvar = e => {
    e.preventDefault();
    alert('Banco cadastrado:\n' + JSON.stringify(form, null, 2));
    limpar();
  };

  // ← handler que captura o arquivo
  const handleFileChange = e => {
    const f = e.target.files[0];
    if (f) setFile(f);
  };

  return (
    <div className="cad-wrapper">
      <h1>Cadastro de Banco</h1>
      <form className="form-card" onSubmit={salvar}>
        <label>
          Nome do Banco
          <input
            type="text"
            placeholder="Nome do Banco"
            value={form.nomeBanco}
            onChange={onChange('nomeBanco')}
            required
          />
        </label>

        <div className="duplo-campo">
          <label>
            Número da Conta
            <input
              type="text"
              placeholder="Ex: 123456"
              value={form.numeroConta}
              onChange={onChange('numeroConta')}
              required
            />
          </label>
          <label>
            Agência
            <input
              type="text"
              placeholder="Ex: 1234"
              value={form.agencia}
              onChange={onChange('agencia')}
              required
            />
          </label>
        </div>

        <label>
          Tipo de Conta
          <select
            value={form.tipoConta}
            onChange={onChange('tipoConta')}
          >
            {TIPOS_CONTA.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>

        <label>
          Status
          <select
            value={form.status}
            onChange={onChange('status')}
          >
            {STATUS.map(s => <option key={s} value={s}>{s}</option>)}
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
