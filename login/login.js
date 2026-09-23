// Ruta al servidor PHP
const ruta = window.location.hostname === '192.168.100.61' 
  ? '../coneccion usuarios' 
  : 'http://192.168.100.61/coneccion%20usuarios';

// Cambiar entre la pestana de Login y la de Registro
function cambiarTab(tipo) {
  const formLogin = document.getElementById('formLogin');
  const formRegistro = document.getElementById('formRegistro');
  const tabLogin = document.getElementById('tabLogin');
  const tabRegistro = document.getElementById('tabRegistro');
  const mensaje = document.getElementById('mensaje');

  mensaje.textContent = '';

  if (tipo === 'login') {
    formLogin.style.display = 'flex';
    formRegistro.style.display = 'none';
    tabLogin.classList.add('active');
    tabRegistro.classList.remove('active');
    document.getElementById('titulo').textContent = 'Iniciar Sesion';
  } else {
    formLogin.style.display = 'none';
    formRegistro.style.display = 'flex';
    tabRegistro.classList.add('active');
    tabLogin.classList.remove('active');
    document.getElementById('titulo').textContent = 'Registrarse';
  }
}

// Iniciar sesion
document.getElementById('formLogin').addEventListener('submit', async (e) => {
  e.preventDefault();
  const usuario = document.getElementById('loginUser').value;
  const contrasena = document.getElementById('loginPass').value;
  const mensaje = document.getElementById('mensaje');

  const res = await fetch(ruta + '/login.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, contrasena })
  });

  const datos = await res.json();

  if (res.ok) {
    mensaje.className = 'status-msg success';
    mensaje.textContent = datos.message;
    window.location.href = '../index.html';
  } else {
    mensaje.className = 'status-msg error';
    mensaje.textContent = datos.error;
  }
});

// Registrar usuario
document.getElementById('formRegistro').addEventListener('submit', async (e) => { //buscar que hacia esto porque no recuerdo
  e.preventDefault();
  const usuario = document.getElementById('regUser').value;
  const contrasena = document.getElementById('regPass').value;
  const mensaje = document.getElementById('mensaje');

  const res = await fetch(ruta + '/registro.php', { //este ve registro php ebvidentemente :v
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, contrasena }) // ve que se anadieron los dato
  });

  const datos = await res.json();

  if (res.ok) {
    mensaje.className = 'status-msg success';
    mensaje.textContent = datos.message;
    document.getElementById('loginUser').value = usuario;
    cambiarTab('login');
  } else {
    mensaje.className = 'status-msg error'; //este envia el mensaje que que llene el campo (no se como hacer para ponerlo al espaniol :v)
    mensaje.textContent = datos.error;
  }
});
