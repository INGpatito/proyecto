window.App = window.App || {};

// Estado global de la aplicacion
App.state = {
  scrollProgress: 0,
  targetRotationY: 0,
  targetRotationX: 0.15,
  currentRotationY: 0,
  currentRotationX: 0.15,
  dragOffsetX: 0,
  dragOffsetY: 0,
  isDragging: false,
  previousMouseX: 0,
  previousMouseY: 0,
  autoSpin: false,
  modelLoaded: false
};
