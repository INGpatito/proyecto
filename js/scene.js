window.App = window.App || {};

(function() {
  const container = document.getElementById('webgl-container');
  if (!container) return;

  // Escena principal
  const scene = new THREE.Scene();

  // Camara
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1.2, 5.2);

  // Renderizador WebGL
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  if (renderer.outputColorSpace !== undefined) {
    renderer.outputColorSpace = THREE.SRGBColorSpace;
  } else {
    renderer.outputEncoding = THREE.sRGBEncoding;
  }
  container.appendChild(renderer.domElement);

  // Grupo pivote para rotar el modelo sobre su centro
  const tacoPivot = new THREE.Group();
  scene.add(tacoPivot);

  // Sombra de contacto suave
  function createGroundShadow() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 120);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
    grad.addColorStop(0.4, 'rgba(0, 0, 0, 0.3)');
    grad.addColorStop(0.8, 'rgba(0, 0, 0, 0.08)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    const texture = new THREE.CanvasTexture(canvas);
    const shadowGeo = new THREE.PlaneGeometry(3.5, 3.5);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.05;
    scene.add(shadowMesh);
    return shadowMesh;
  }
  const shadow = createGroundShadow();

  // Iluminacion
  const ambientLight = new THREE.AmbientLight(0xfff7ea, 1.4);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xfffaed, 2.2);
  mainLight.position.set(5, 8, 5);
  scene.add(mainLight);

  const fillLight = new THREE.DirectionalLight(0xffedd5, 1.2);
  fillLight.position.set(-6, 4, 4);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0x93c5fd, 1.4);
  rimLight.position.set(0, 6, -7);
  scene.add(rimLight);

  const bounceLight = new THREE.DirectionalLight(0xf59e0b, 0.8);
  bounceLight.position.set(0, -5, 2);
  scene.add(bounceLight);

  // Exportar al espacio de nombres de la aplicacion
  App.scene = scene;
  App.camera = camera;
  App.renderer = renderer;
  App.tacoPivot = tacoPivot;
  App.shadow = shadow;
})();
