// views/login.js

export function renderLoginView(container) {
  container.innerHTML = `
    <section class="login">
      <h2>Iniciar Sesión</h2>
      <form id="loginForm">
        <input type="text" id="username" placeholder="Usuario" required />
        <input type="password" id="password" placeholder="Contraseña" required />
        <button type="submit">Ingresar</button>
      </form>
      <p id="errorLogin" style="color:red;"></p>
    </section>
  `;

  const form = document.getElementById('loginForm');
  const errorMsg = document.getElementById('errorLogin');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = form.username.value.trim();
    const password = form.password.value.trim();

    fetch(`http://localhost:3000/users?username=${username}&password=${password}`)
      .then(res => res.json())
      .then(users => {
        if (users.length > 0) {
          localStorage.setItem('user', JSON.stringify(users[0]));
          location.hash = '#/dashboard';
        } else {
          errorMsg.textContent = 'Credenciales incorrectas.';
        }
      })
      .catch(() => {
        errorMsg.textContent = 'Error al conectar con el servidor.';
      });
  });
}
