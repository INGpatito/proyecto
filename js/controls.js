window.App = window.App || {};

(function() {
  const progressBar = document.getElementById('progress-bar');

  // Actualizacion de rotacion segun posicion del scroll
  function updateScroll() {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;
    App.state.scrollProgress = progress;

    if (progressBar) {
      progressBar.style.width = (progress * 100) + '%';
    }

    if (!App.state.autoSpin) {
      App.state.targetRotationY = progress * Math.PI * 4;
      App.state.targetRotationX = 0.2 + Math.sin(progress * Math.PI * 2) * 0.35;
    }
  }

  // Manejo de eventos de raton y pantalla tactil para arrastre
  function onPointerDown(e) {
    App.state.isDragging = true;
    App.state.previousMouseX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    App.state.previousMouseY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
  }

  function onPointerMove(e) {
    if (!App.state.isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

    const deltaX = clientX - App.state.previousMouseX;
    const deltaY = clientY - App.state.previousMouseY;

    App.state.dragOffsetX += deltaX * 0.008;
    App.state.dragOffsetY += deltaY * 0.008;

    // Limitar inclinacion vertical
    App.state.dragOffsetY = Math.max(Math.min(App.state.dragOffsetY, 0.8), -0.8);

    App.state.previousMouseX = clientX;
    App.state.previousMouseY = clientY;
  }

  function onPointerUp() {
    App.state.isDragging = false;
  }

  function initControls() {
    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

    window.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    window.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);
  }

  App.initControls = initControls;
  App.updateScroll = updateScroll;
})();
