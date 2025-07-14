// 📁 router.js

import { renderLoginView } from './views/login.js';
import { renderRegisterView } from './views/register.js';
import { renderDashboard } from './views/dashboard.js';
import { renderCreateEvent } from './views/events-create.js';
import { renderEditEvent } from './views/events-edit.js';
import { renderNotFound } from './views/not-found.js';

export function router() {
  const path = window.location.hash || '#/login';
  const app = document.getElementById('app');
  const user = JSON.parse(localStorage.getItem('user'));

  const authRoutes = ['#/dashboard', '#/dashboard/events/create', '#/dashboard/events/edit'];

  if (!user && authRoutes.includes(path)) {
    location.hash = '#/not-found';
    return;
  }

  if (user && (path === '#/login' || path === '#/register')) {
    location.hash = '#/dashboard';
    return;
  }

  if (user?.role === 'visitor' && path.startsWith('#/dashboard/events')) {
    location.hash = '#/not-found';
    return;
  }

  switch (path) {
    case '#/login':
      renderLoginView(app);
      break;
    case '#/register':
      renderRegisterView(app);
      break;
    case '#/dashboard':
      renderDashboard(app);
      break;
    case '#/dashboard/events/create':
      renderCreateEvent(app);
      break;
    case '#/dashboard/events/edit':
      renderEditEvent(app);
      break;
    case '#/not-found':
      renderNotFound(app);
      break;
    default:
      location.hash = '#/not-found';
  }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
