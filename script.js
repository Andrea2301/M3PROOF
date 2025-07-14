<!-- Panel admin -->
<div id="adminPanel" style="display: none;">
  <h3>Crear evento</h3>
  <form id="eventForm">
    <input type="text" id="eventTitle" placeholder="Título del evento" required />
    <input type="date" id="eventDate" required />
    <input type="text" id="eventLocation" placeholder="Lugar" required />
    <input type="number" id="eventCapacity" placeholder="Capacidad máxima" min="1" required />
    <button type="submit">Crear evento</button>
  </form>
  <p id="eventMsg" style="color: green;"></p>
</div>


const eventForm = document.getElementById('eventForm');
const eventMsg = document.getElementById('eventMsg');

eventForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newEvent = {
    title: document.getElementById('eventTitle').value.trim(),
    date: document.getElementById('eventDate').value,
    location: document.getElementById('eventLocation').value.trim(),
    capacity: parseInt(document.getElementById('eventCapacity').value),
    registered: 0
  };

  fetch('http://localhost:3000/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newEvent)
  })
    .then(() => {
      eventMsg.textContent = 'Evento creado correctamente.';
      eventForm.reset();
      loadEvents(); // si tienes una función para actualizar la lista
    })
    .catch(() => {
      eventMsg.textContent = 'Error al crear el evento.';
      eventMsg.style.color = 'red';
    });
});
