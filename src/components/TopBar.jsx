import logo from '../assets/image6.svg'
import './TopBar.css';

export default function TopBar({ onMenuClick }) {
  return (
    <header className="top-bar">
      <button className="hamburger" onClick={onMenuClick}>☰</button>
      <img src={logo} alt='Duby'></img>
      <input type="text" placeholder="Pesquisar..." />
    </header>
  );
}
