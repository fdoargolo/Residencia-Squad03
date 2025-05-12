document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('cadastroToggle');
    const submenu = document.getElementById('submenu');
  
    toggleButton.addEventListener('click', function (e) {
      e.preventDefault();
      submenu.classList.toggle('show');
    });
  });
  