import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './forgotPassword.css';
import logo from '../../assets/image6.svg';

export default function ForgotPassword({ onConfirm, handleAuth }) {
  const [code, setCode] = useState(['', '', '', '']);
  const navigate = useNavigate();

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/\D/, '');
    setCode(prev => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
    if (val && idx < 3) {
      const nextInput = document.getElementById(`digit-${idx + 1}`);
      nextInput && nextInput.focus();
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    // chama confirmação (ex: validação de código)
    onConfirm && onConfirm(code.join(''));
    // realiza autenticação (simulado) após confirmar código
    handleAuth && handleAuth();
    navigate('/home');
  };

  return (
    <div className="forgot-container">
      <div className="forgot-overlay">
        <img src={logo} alt="Duby Logo" className="forgot-logo" />
        <form className="forgot-form" onSubmit={handleSubmit}>
          <h2>Recuperar Senha</h2>
          <p>Por favor, digite o código que enviamos agora para:</p>
          <p className="forgot-email">Exemplo@email.com</p>
          <div className="code-inputs">
            {code.map((d, i) => (
              <input
                key={i}
                id={`digit-${i}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={e => handleChange(e, i)}
                required
              />
            ))}
          </div>
          <button type="submit">Confirmar</button>
          <p className="forgot-footer">
            Não chegou? <Link to="/contact">Entre em contato</Link>
          </p>
        </form>
      </div>
    </div>
  );
}