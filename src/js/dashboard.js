// views/dashboard.js

export function renderDashboard(container) {
  const user = JSON.parse(localStorage.getItem('user'));

  container.innerHTML = `
    <h2>Bienvenido, ${user.username} (${user.role})</h2>
    <button id="logoutBtn">Cerrar sesión</button>
    ${user.role === 'admin' ? '<a href="#/dashboard/events/create">Crear nuevo evento</a>' : ''}
    <h3>Eventos disponibles</h3>
    <div id="eventosContainer"></div>
  `;

  // Cerrar sesión
  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('user');
    location.hash = '#/login';
  });

  // Mostrar eventos
  fetch('http://localhost:3000/events')
    .then(res => res.json())
    .then(eventos => {
      const contenedor = document.getElementById('eventosContainer');
      if (eventos.length === 0) {
        contenedor.innerHTML = '<p>No hay eventos aún.</p>';
        return;
      }

      eventos.forEach(ev => {
        const div = document.createElement('div');
        div.innerHTML = `
          <strong>${ev.title}</strong> - ${ev.date} - ${ev.location} <br>
          Capacidad: ${ev.capacity} - Registrados: ${ev.registered || 0}
          <br>
          ${
            user.role === 'admin'
              ? `<a href="#/dashboard/events/edit?id=${ev.id}">Editar</a> | <button data-id="${ev.id}" class="btn-delete">Eliminar</button>`
              : `<button data-id="${ev.id}" class="btn-register">Registrarme</button>`
          }
          <hr/>
        `;
        contenedor.appendChild(div);
      });

      // Agregar evento delete o register según rol
      if (user.role === 'admin') {
        document.querySelectorAll('.btn-delete').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            fetch(`http://localhost:3000/events/${id}`, {
              method: 'DELETE'
            }).then(() => location.reload());
          });
        });
      } else {
        document.querySelectorAll('.btn-register').forEach(btn => {
          btn.addEventListener('click', () => {
            const eventId = Number(btn.dataset.id);
            fetch('http://localhost:3000/registrations', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: user.id,
                eventId
              })
            }).then(() => alert('Registro exitoso'));
          });
        });
      }
    });
}
