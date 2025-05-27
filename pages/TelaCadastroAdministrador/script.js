const usuarios = [];

function renderTabela() {
  const tabela = document.getElementById('tabelaUsuarios');
  tabela.innerHTML = '';

  usuarios.forEach((usuario, index) => {
    const row = document.createElement('div');
    row.classList.add('user-row');
    row.setAttribute('data-index', index);

    row.innerHTML = `
      <div>${usuario.nome}</div>
      <div>${usuario.cnpj}</div>
      <div>${usuario.razao}</div>
      <div>${usuario.ramo}</div>
      <div>${usuario.numero}</div>
      <div>${usuario.email}</div>
    `;

    const toggle = document.createElement('div');
    toggle.classList.add('toggle-btn');
    if (usuario.acesso) toggle.classList.add('active');
    toggle.addEventListener('click', () => {
      usuario.acesso = !usuario.acesso;
      renderTabela();
    });

    row.appendChild(toggle);
    tabela.appendChild(row);
  });
}

function adicionarUsuario() {
  const nome = document.getElementById('nome').value;
  const cnpj = document.getElementById('cpfcnpj').value;
  const razao = document.getElementById('razao').value;
  const ramo = document.getElementById('ramo').value;
  const numero = document.getElementById('numero').value;
  const email = document.getElementById('email').value;

  if (!nome || !cnpj || !razao || !ramo || !numero || !email) return;

  usuarios.push({ nome, cnpj, razao, ramo, numero, email, acesso: false });

  document.getElementById('nome').value = '';
  document.getElementById('cpfcnpj').value = '';
  document.getElementById('razao').value = '';
  document.getElementById('ramo').value = '';
  document.getElementById('numero').value = '';
  document.getElementById('email').value = '';

  renderTabela();
  filtrarTabela();
}

function filtrarTabela() {
  const nomeFiltro = document.getElementById('filtroNome').value.toLowerCase();
  const cnpjFiltro = document.getElementById('filtroCnpj').value.toLowerCase();
  const emailFiltro = document.getElementById('filtroEmail').value.toLowerCase();

  const linhas = document.querySelectorAll('.user-row');

  linhas.forEach(linha => {
    const index = linha.getAttribute('data-index');
    const usuario = usuarios[index];

    const matchNome = usuario.nome.toLowerCase().includes(nomeFiltro);
    const matchCnpj = usuario.cnpj.toLowerCase().includes(cnpjFiltro);
    const matchEmail = usuario.email.toLowerCase().includes(emailFiltro);

    linha.style.display = matchNome && matchCnpj && matchEmail ? 'grid' : 'none';
  });
}

renderTabela();
