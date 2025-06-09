import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import './signup.css';
import logo from '../../assets/image6.svg';

// Campo com máscara para CPF/CNPJ
function CpfCnpjField({ name, value, onChange, required }) {
  const onlyDigits = value.replace(/\D/g, '');
  const mask = onlyDigits.length > 11
    ? '99.999.999/9999-99'  // CNPJ
    : '999.999.999-99';      // CPF

  return (
    <InputMask mask={mask} value={value} onChange={onChange}>
      {inputProps => (
        <input
          {...inputProps}
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

export default function SignUp({ onSignup }) {
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: integração com API de cadastro
    onSignup();
    navigate('/home');
  };

  return (
    <div className="signup-container">
      <div className="signup-overlay">
        <img src={logo} alt="Duby Logo" className="signup-logo" />
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Cadastro</h2>
          <input
            type="text"
            name="name"
            placeholder="Seu Nome Completo"
            value={form.name}
            onChange={handleChange}
            required
          />
          {/* CPF/CNPJ em vez de Nome de Usuário */}
          <CpfCnpjField
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Crie sua senha"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Criar minha conta</button>
          <p className="signup-footer">
            Já tem conta? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
