import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import TopBar from './components/TopBar.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';
import Login from './pages/Login/Login.jsx';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.jsx';
import Home from './pages/GestaoDeTaxas/index.jsx';
import GestaoDeTaxas from './pages/Home/index.jsx';
import RelatorioFinanceiro from './pages/RelatorioFinanceiro/index.jsx';
import Transacoes from './pages/Transacoes/index.jsx';
import Cadastros from './pages/CadastroTaxas/index.jsx';
import CadastroDeAdquirente from './pages/CadastroAdquirente/index.jsx';
import CadastroBanco from './pages/CadastroBanco';
import Admin from './pages/Admin';


export default function App() {
  const [open, setOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  // Chama ao finalizar cadastro ou login
  const handleAuth = () => setAuthenticated(true);

  return (
    <div className="layout">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="main-area">
        <TopBar onMenuClick={() => setOpen(o => !o)} />
        <Routes>
          {/* Se não autenticado, exibe SignUp como rota raiz */}
          <Route
            path="/"
            element={
              authenticated
                ? <Navigate to="/home" replace />
                : <Navigate to="/signup" replace />
            }
          />

          <Route path="/signup" element={<SignUp onSignup={handleAuth} />} />
          <Route path="/login" element={<Login onLogin={handleAuth} />} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />

          {/* Rotas protegidas */}
          <Route
            path="/home"
            element={authenticated ? <Home /> : <Navigate to="/signup" replace />}
          />
          <Route
            path="/relatorio-financeiro"
            element={authenticated ? <RelatorioFinanceiro /> : <Navigate to="/signup" replace />}
          />
          <Route
            path="/transacoes"
            element={authenticated ? <Transacoes /> : <Navigate to="/signup" replace />}
          />
          <Route
            path="/gestao-de-taxas"
            element={authenticated ? <GestaoDeTaxas /> : <Navigate to="/signup" replace />}
          />
          <Route
            path="/cadastros"
            element={authenticated ? <Cadastros /> : <Navigate to="/signup" replace />}
          />
          <Route
           path="/cadastro-adquirente"
            element={authenticated ? <CadastroDeAdquirente /> : <Navigate to="/signup" replace />}/>

          <Route
           path="/cadastro-banco"
            element={authenticated ? <CadastroBanco /> : <Navigate to="/signup" replace />}/>

          <Route
           path="/admin"
            element={authenticated ? <Admin /> : <Navigate to="/signup" replace />}/>
            
          {/* Redireciona rotas inválidas */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}
