// router.js

// Importa las vistas que quieras mostrar:
import { renderLoginView } from './views/login.js';
import { renderDashboard } from './views/dashboard.js';
import { renderCreateEvent } from './views/events-create.js';
import { renderEditEvent } from './views/events-edit.js';
import { renderNotFound } from './views/not-found.js';

// Función principal del router
export function router() {
  const app = document.getElementById('app');
  const path = window.location.hash || '#/login';
  const user = JSON.parse(localStorage.getItem('user'));

  // Proteger rutas si no está logueado
  const authRequired = path.startsWith('#/dashboard');
  if (!user && authRequired) {
    location
