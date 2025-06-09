// src/pages/AdministrarContas.jsx
import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import './style.css';

// seu ToggleButton continua igual
function ToggleButton() {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      className={`toggle${on ? ' on' : ''}`}
      onClick={() => setOn(o => !o)}
      aria-label={on ? 'Desligado' : 'Ligado'}
    />
  );
}

// seu CpfCnpjField continua igual
function CpfCnpjField({ name, value, onChange, required }) {
  const onlyDigits = value.replace(/\D/g, '');
  const mask = onlyDigits.length > 11
    ? '99.999.999/9999-99'
    : '999.999.999-99';

  return (
    <InputMask mask={mask} value={value} onChange={onChange}>
      {props => (
        <input
          {...props}
          name={name}
          type="text"
          inputMode="numeric"
          placeholder="CPF ou CNPJ"
          required={required}
        />
      )}
    </InputMask>
  );
}

export default function AdministrarContas() {
  const [form, setForm] = useState({ name: '', id: '' });
  const [users, setUsers] = useState([
    { name: 'Pedro',  id: '123.456.789-00',      active: true },
    { name: 'Felipe', id: '12.345.678/0001-95', active: false },
  ]);
  const [searchName, setSearchName] = useState('');
  const [searchId, setSearchId] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const addUser = e => {
    e.preventDefault();
    // ao adicionar, já começa ativo
    setUsers(u => [...u, { ...form, active: true }]);
    setForm({ name: '', id: '' });
  };

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(searchName.toLowerCase()) &&
    u.id.replace(/\D/g, '').includes(searchId.replace(/\D/g, ''))
  );

  return (
    <div className="cad-wrapper">
      <h1>Administrar Contas</h1>
      <div className="admin-container">
        {/* formulário lateral */}
        <form className="admin-add-form" onSubmit={addUser}>
          <h2>Adicionar Usuário</h2>
          <input
            name="name"
            placeholder="Nome"
            value={form.name}
            onChange={handleChange}
            required
          />
          <CpfCnpjField
            name="id"
            value={form.id}
            onChange={handleChange}
            required
          />
          <button type="submit">Adicionar</button>
        </form>

        {/* tabela de colunas */}
        <div className="admin-table">
          {/* coluna Nome */}
          <div className="col">
            <div className="col-header">Nome</div>
            <input
              className="col-filter"
              placeholder="Filtrar..."
              value={searchName}
              onChange={e => setSearchName(e.target.value)}
            />
            {filtered.map((u, i) => (
              <div key={i} className="col-item">{u.name}</div>
            ))}
          </div>

          {/* coluna CPF/CNPJ */}
          <div className="col">
            <div className="col-header">CPF/CNPJ</div>
            <input
              className="col-filter"
              placeholder="Filtrar..."
              value={searchId}
              onChange={e => setSearchId(e.target.value)}
            />
            {filtered.map((u, i) => (
              <div key={i} className="col-item">{u.id}</div>
            ))}
          </div>

          {/* nova coluna "Usuário Ativo" */}
          <div className="col">
            <div className="col-header">Usuário Ativo</div>
            {/* mantém o filtro invisível pra alinhar linhas */}
            <div className="col-filter" aria-hidden="true" style={{ visibility: 'hidden' }} />
            {filtered.map((u, i) => (
              <div key={i} className="col-item">
                {u.active ? 'Sim' : 'Não'}
              </div>
            ))}
          </div>

          {/* coluna Acesso com toggle */}
          <div className="col">
            <div className="col-header">Acesso</div>
            <div className="col-filter" aria-hidden="true" style={{ visibility: 'hidden' }} />
            {filtered.map((_, i) => (
              <div key={i} className="col-item">
                <ToggleButton />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
