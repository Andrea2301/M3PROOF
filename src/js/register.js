// 📁 views/register.js

export function renderRegisterView(container) {
  container.innerHTML = `
    <section class="register">
      <h2>Registro de Usuario</h2>
      <form id="registerForm">
        <input type="text" id="username" placeholder="Usuario" required />
        <input type="password" id="password" placeholder="Contraseña" required />
        <button type="submit">Registrarse</button>
      </form>
      <p id="registerMsg"></p>
      <p>¿Ya tienes cuenta? <a href="#/login">Inicia sesión</a></p>
    </section>
  `;

  const form = document.getElementById('registerForm');
  const msg = document.getElementById('registerMsg');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = form.username.value.trim();
    const password = form.password.value.trim();

    // Validar si ya existe
    fetch(`http://localhost:3000/users?username=${username}`)
      .then(res => res.json())
      .then(users => {
        if (users.length > 0) {
          msg.textContent = 'Ese usuario ya existe.';
          return;
        }

        // Crear nuevo usuario visitante
        const newUser = {
          username,
          password,
          role: 'visitor'
        };

        fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser)
        })
        .then(() => {
          msg.textContent = 'Registro exitoso. Inicia sesión.';
          form.reset();
        });
      });
  });
}
