// Cambia por tu IP o URL publicada (si pruebas en dispositivo usa IP local de tu PC)
const SERVER_BASE = "http://192.168.20.166:3000";; // <- cambia según tu red o servidor en la nube

// Captcha utilidad
function genCaptcha() {
  const a = Math.floor(Math.random()*9)+1;
  const b = Math.floor(Math.random()*9)+1;
  return { question: `${a} + ${b}`, answer: String(a+b) };
}

// login page captcha
let captcha = genCaptcha();
document.querySelector('#refreshCaptcha').addEventListener('click', () => {
  captcha = genCaptcha(); alert('Resuelve: ' + captcha.question);
});
document.getElementById('captchaInput').placeholder = '¿Cuánto es? (ej: ' + captcha.question + ')';

// register captcha
let regCap = genCaptcha();
document.getElementById('regRefresh').addEventListener('click', () => { regCap = genCaptcha(); alert('Resuelve: ' + regCap.question); });
document.getElementById('regCaptchaInput').placeholder = '¿Cuánto es? (ej: ' + regCap.question + ')';

// modals
const regModal = document.getElementById('registerModal');
const forgotModal = document.getElementById('forgotModal');
document.getElementById('openRegister').onclick = (e)=>{ e.preventDefault(); regModal.style.display='flex'; };
document.getElementById('closeRegister').onclick = ()=> regModal.style.display='none';
document.getElementById('openForgot').onclick = (e)=>{ e.preventDefault(); forgotModal.style.display='flex'; };
document.getElementById('closeForgot').onclick = ()=> forgotModal.style.display='none';

// LOGIN
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const correo = document.getElementById('correo').value.trim();
  const contrasena = document.getElementById('contrasena').value;
  const captchaVal = document.getElementById('captchaInput').value.trim();
  const errorEl = document.getElementById('mensaje-error');

  if (captchaVal !== captcha.answer) { errorEl.textContent = 'Captcha incorrecto'; return; }

  try {
    const res = await fetch(`${SERVER_BASE}/login`, {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ correo, contrasena })
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('usuarioActivo', data.usuario);
      // redirigir a gestion (ruta relativa)
      location.href = 'gestion.html';
    } else {
      errorEl.textContent = data.mensaje || 'Credenciales inválidas';
    }
  } catch(err) {
    errorEl.textContent = 'Error al conectar con el servidor. Revisa IP/red o servidor.';
  }
});

// REGISTER (autologin)
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('regNombre').value.trim();
  const correo = document.getElementById('regCorreo').value.trim();
  const password = document.getElementById('regPassword').value;
  const captchaVal = document.getElementById('regCaptchaInput').value.trim();
  const err = document.getElementById('reg-message');

  if (captchaVal !== regCap.answer) { err.textContent = 'Captcha incorrecto'; return; }

  try {
    const res = await fetch(`${SERVER_BASE}/register`, {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ name, correo, password })
    });
    const data = await res.json();
    if (res.ok) {
      // auto-login: pedir token o simplemente setear usuario y redirigir
      localStorage.setItem('usuarioActivo', data.usuario);
      regModal.style.display='none';
      location.href = 'gestion.html';
    } else {
      err.textContent = data.mensaje || 'Error registro';
    }
  } catch(err) {
    err.textContent = 'Error al conectar con el servidor.';
  }
});

// FORGOT (simulado)
document.getElementById('forgotForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('forgotCorreo').value.trim();
  const out = document.getElementById('forgot-message');
  try {
    // Si tienes endpoint real, úsalo; sino simulamos
    // const res = await fetch(`${SERVER_BASE}/forgot`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email })});
    out.style.color='lightgreen'; out.textContent = 'Se envió un correo (simulado) si existe la cuenta.';
  } catch(e) { out.textContent='Error al enviar.'; }
});
