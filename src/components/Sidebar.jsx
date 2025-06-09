import { NavLink } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar({ open, onClose }) {
  const links = [
    { to: '/home',                 label: 'Home' },
    { to: '/transacoes',          label: 'Transações' },
    { to: '/gestao-de-taxas',     label: 'Gestão de taxas' },
    { to: '/cadastros',           label: 'Cadastro de Taxas' },
    { to: '/cadastro-adquirente',  label: 'Cadastro de Adquirente' },
    { to: '/cadastro-banco',       label: 'Cadastro de Banco' },
    { to: '/admin',                label: 'Administrar Contas' },
  ];

  return (
    <>
      {/* overlay fecha menu ao clicar fora */}
      <div
        className={open ? 'overlay visible' : 'overlay'}
        onClick={onClose}
      />

      <aside className={open ? 'sidebar open' : 'sidebar'}>
        <header className="sidebar-header">
        </header>
        <nav className="nav-links" onClick={onClose}>
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
