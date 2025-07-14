// 📁 views/events-create.js

export function renderCreateEvent(container) {
  container.innerHTML = `
    <h2>Crear nuevo evento</h2>
    <form id="createEventForm">
      <input type="text" id="title" placeholder="Título" required />
      <input type="date" id="date" required />
      <input type="text" id="location" placeholder="Lugar" required />
      <input type="number" id="capacity" placeholder="Capacidad" required />
      <button type="submit">Crear evento</button>
    </form>
    <p id="createMsg"></p>
  `;

  const form = document.getElementById('createEventForm');
  const msg = document.getElementById('createMsg');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const newEvent = {
      title: form.title.value.trim(),
      date: form.date.value,
      location: form.location.value.trim(),
      capacity: parseInt(form.capacity.value),
      registered: 0
    };

    fetch('http://localhost:3000/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvent)
    })
      .then(() => {
        msg.textContent = 'Evento creado correctamente.';
        location.hash = '#/dashboard';
      })
      .catch(() => {
        msg.textContent = 'Hubo un error al crear el evento.';
      });
  });
}
