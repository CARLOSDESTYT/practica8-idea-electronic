// Inicializar íconos de Lucide
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
});

// Control del menú móvil (iPhone / pantallas pequeñas)
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Cerrar menú móvil al hacer clic en un enlace
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

// Función para agregar productos destacados directo al formulario de cotización
function agregarACotizacion(producto) {
  const textarea = document.getElementById('mensaje');
  const lineaNueva = `- 1x ${producto}`;

  if (textarea.value.trim() === '') {
    textarea.value = `Hola, me gustaría cotizar los siguientes artículos:\n${lineaNueva}`;
  } else if (!textarea.value.includes(producto)) {
    textarea.value += `\n${lineaNueva}`;
  }

  document.getElementById('cotizacion').scrollIntoView({ behavior: 'smooth' });
  textarea.focus();
}

// Validación y envío del formulario funcional
const quoteForm = document.getElementById('quote-form');
const formError = document.getElementById('form-error');
const formErrorText = document.getElementById('form-error-text');
const formSuccess = document.getElementById('form-success');

quoteForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const tipo = document.getElementById('tipo').value;
  const mensaje = document.getElementById('mensaje').value.trim();

  // Validaciones
  if (!nombre || !telefono || !correo || !mensaje) {
    mostrarError('Por favor completa todos los campos marcados con asterisco (*).');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    mostrarError('Ingresa un correo electrónico válido.');
    return;
  }

  if (telefono.replace(/\D/g, '').length < 8) {
    mostrarError('Ingresa un número telefónico válido de al menos 8 dígitos.');
    return;
  }

  // Ocultar errores y mostrar confirmación con folio aleatorio
  formError.classList.add('hidden');
  const folio = `COT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  document.getElementById('folio-generado').textContent = folio;
  document.getElementById('resumen-envio').innerHTML = `
    <strong>Cliente:</strong> ${nombre} (${tipo})<br/>
    <strong>Contacto:</strong> ${correo} | ${telefono}<br/>
    <strong>Detalle enviado:</strong> ${mensaje.replace(/\n/g, '<br/>')}
  `;

  quoteForm.classList.add('hidden');
  formSuccess.classList.remove('hidden');
});

function mostrarError(texto) {
  formErrorText.textContent = texto;
  formError.classList.remove('hidden');
}

function reiniciarFormulario() {
  quoteForm.reset();
  formSuccess.classList.add('hidden');
  quoteForm.classList.remove('hidden');
}