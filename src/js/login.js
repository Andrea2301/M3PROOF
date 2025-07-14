const routes = {
  '/': '/src/html/home.html',
  '/register': '/src/html/visitorview.html',
  '/login':'/src/html/login.html',
};

// Escucha clics en enlaces internos con data-link
document.body.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    navigate(e.target.getAttribute("href"));
  }
});

export async function navigate(hash) {
  const user = JSON.parse(localStorage.getItem("loggedUser"));

  const route = (hash || location.hash || "#/").slice(1).toLowerCase(); // "/users"

  // Protección de rutas
  if (route === "/" && user) return navigate("#/users");
  if (!user && route !== "/") {
    Swal.fire("Ups", "Primero iniciá sesión", "warning");
    return navigate("#/");
  }
  if (route === "/newuser" && user?.role !== "admin") {
    Swal.fire("Acceso denegado", "No tienes permisos para entrar aquí", "error");
    return navigate("#/users");
  }

  const viewPath = routes[route];
  if (!viewPath) return navigate("#/");

  try {
    const html = await fetch(viewPath).then(res => res.text());

    if (route === "/") {
      document.getElementById("app").style.display = "none";
      document.getElementById("login-content").innerHTML = html;

      const { setupLogin } = await import("./login.js");
      setupLogin();
    } else {
      document.getElementById("login-content").innerHTML = "";
      document.getElementById("app").style.display = "flex";
      document.getElementById("content").innerHTML = html;

      if (route === "/users") {
        const { setupUsers } = await import("./users.js");
        setupUsers();
      }

      if (route === "/visitorView") {
        const { setupNewUser } = await import("./newuser.js");
        setupNewUser();
      }

      if (route === "/about") {
        const { setupAbout } = await import("./about.js");
        setupAbout?.();
      }
    }

    // Actualiza el hash en la URL
    location.hash = route;

  } catch (err) {
    console.error("Error navegando:", err);
    Swal.fire("Ups", "Algo salió mal al cargar la ruta", "error");
    if (route !== "/") navigate("#/");
  }
}

// Logout
document.addEventListener("click", (e) => {
  if (e.target.id === "logout-btn") {
    Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Tu sesión actual se cerrará",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("loggedUser");
        navigate("#/");
      }
    });
  }
});

// Detecta cuando el hash cambia (navegación con el botón "atrás")
window.addEventListener("hashchange", () => navigate(location.hash));

// Ejecuta la navegación inicial al cargar la página
navigate(location.hash);
