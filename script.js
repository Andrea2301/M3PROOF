const app = document.getElementById('script');

const routes = {
  '/': '/src/html/home.html',
  '/register': '/src/html/register.html',
  '/login':'/src/html/login.html',
};

async function router() {
  const hash = window.location.hash || '#/';
  const route = hash.slice(1);
  const view = routes[route];

  if (view) {
    try {
      const res = await fetch(view);
      const html = await res.text();
      app.innerHTML = html;
    } catch (err) {
      app.innerHTML = `<h1>Error</h1><p>No se pudo cargar la vista: ${route}</p>`;
    }
  } else {
    app.innerHTML = '<h1>404</h1><p>Página no encontrada</p>';
  }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
