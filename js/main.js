window.App = window.App || {};

(function() {
  const clock = new THREE.Clock();

  // Bucle de animacion continuo
  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    if (App.state && App.state.modelLoaded && App.tacoPivot) {
      if (App.state.autoSpin) {
        App.tacoPivot.rotation.y += 0.015;
        App.tacoPivot.rotation.x = 0.2 + Math.sin(elapsedTime * 0.8) * 0.08;
      } else {
        // Interpolacion suave hacia la posicion objetivo del scroll y arrastre
        const targetY = App.state.targetRotationY + App.state.dragOffsetX;
        const targetX = App.state.targetRotationX + App.state.dragOffsetY;

        App.state.currentRotationY += (targetY - App.state.currentRotationY) * 0.07;
        App.state.currentRotationX += (targetX - App.state.currentRotationX) * 0.07;

        App.tacoPivot.rotation.y = App.state.currentRotationY;
        App.tacoPivot.rotation.x = App.state.currentRotationX;
      }

      // Movimiento de flotacion suave
      const floatOffset = Math.sin(elapsedTime * 1.8) * 0.045;
      App.tacoPivot.position.y = floatOffset;

      // Escala de sombra segun flotacion
      if (App.shadow) {
        const shadowScale = 1 - floatOffset * 0.4;
        App.shadow.scale.set(shadowScale, shadowScale, 1);
      }
    }

    if (App.renderer && App.scene && App.camera) {
      App.renderer.render(App.scene, App.camera);
    }
  }

  // Redimensionamiento de ventana
  function onWindowResize() {
    if (!App.camera || !App.renderer) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    App.camera.aspect = width / height;
    App.camera.updateProjectionMatrix();

    App.renderer.setSize(width, height);
    App.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  // Inicializacion
  function init() {
    if (App.initControls) App.initControls();
    if (App.initModelLoading) App.initModelLoading();

    window.addEventListener('resize', onWindowResize);
    animate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
