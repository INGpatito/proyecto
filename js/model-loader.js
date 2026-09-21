window.App = window.App || {};

(function() {
  const loader = new THREE.GLTFLoader();

  function onModelLoaded(gltf) {
    const model = gltf.scene;

    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    model.position.x = -center.x;
    model.position.y = -center.y;
    model.position.z = -center.z;

    const maxDim = Math.max(size.x, size.y, size.z);
    const targetScale = 2.8 / maxDim;
    App.tacoPivot.scale.set(targetScale, targetScale, targetScale);

    model.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.roughness = Math.max(child.material.roughness, 0.45);
        child.material.envMapIntensity = 1.2;
        if (child.material.map) {
          child.material.map.anisotropy = 8;
        }
      }
    });

    App.tacoPivot.add(model);
    App.state.modelLoaded = true;

    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
      }, 300);
    }
  }

  function loadFromBase64(base64Data) {
    try {
      let b64 = base64Data;
      const commaIdx = b64.indexOf(',');
      if (commaIdx !== -1) {
        b64 = b64.substring(commaIdx + 1);
      }
      const binaryString = window.atob(b64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      loader.parse(bytes.buffer, '', onModelLoaded, (err) => {
        console.error('Error al parsear modelo GLB desde base64:', err);
        showLoadError();
      });
    } catch (err) {
      console.error('Error procesando base64:', err);
      showLoadError();
    }
  }

  function showLoadError() {
    const loadingLabel = document.getElementById('loading-label');
    if (loadingLabel) {
      loadingLabel.innerHTML = 'No se pudo cargar el modelo automaticamente.<br><small>Arrastra el archivo <b>loaded_fish_taco.glb</b> aqui</small>';
    }
  }

  const modelUrl = window.location.pathname.includes('/html/')
    ? '../assets/models/loaded_fish_taco.glb'
    : 'assets/models/loaded_fish_taco.glb';

  function initModelLoading() {
    if (window.location.protocol.startsWith('http')) {
      loader.load(
        modelUrl,
        onModelLoaded,
        (xhr) => {
          const loadingLabel = document.getElementById('loading-label');
          if (loadingLabel && xhr.lengthComputable && xhr.total > 0) {
            const pct = Math.round((xhr.loaded / xhr.total) * 100);
            loadingLabel.textContent = 'Cargando taco en 3D (' + pct + '%)...';
          }
        },
        (error) => {
          console.warn('Fallo al cargar modelo via HTTP, probando fallback base64...', error);
          if (window.TACO_GLB_BASE64) {
            loadFromBase64(window.TACO_GLB_BASE64);
          } else {
            showLoadError();
          }
        }
      );
    } else {
      if (window.TACO_GLB_BASE64) {
        loadFromBase64(window.TACO_GLB_BASE64);
      } else {
        loader.load(modelUrl, onModelLoaded, null, () => {
          showLoadError();
        });
      }
    }
  }

  // Soporte de arrastrar y soltar archivo GLB
  window.addEventListener('dragover', (e) => e.preventDefault());
  window.addEventListener('drop', (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith('.glb') || file.name.endsWith('.gltf'))) {
      const loadingScreen = document.getElementById('loading-screen');
      const loadingLabel = document.getElementById('loading-label');
      if (loadingScreen) loadingScreen.classList.remove('hidden');
      if (loadingLabel) loadingLabel.textContent = 'Cargando archivo arrastrado...';
      const reader = new FileReader();
      reader.onload = (event) => {
        loader.parse(event.target.result, '', onModelLoaded, console.error);
      };
      reader.readAsArrayBuffer(file);
    }
  });

  App.initModelLoading = initModelLoading;
})();
