// Certifique-se de ter exatamente isto
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import logo from '../../assets/image6.svg';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: integração com API de autenticação
    onLogin();
    navigate('/home');
  };

  return (
    <div className="login-container">
      <div className="login-overlay">
        <img src={logo} alt="Duby Logo" className="login-logo" />
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Entrar</h2>
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
            placeholder="Senha"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Entrar</button>
          <p className="login-footer">
            <Link to="/forgot-password">Esqueceu a senha?</Link>
          </p>
          <p className="login-footer">
            Primeiro acesso? <Link to="/signup">Crie sua conta</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
