import './style.css';
import * as THREE from 'three';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';
// Імпортуємо завантажувач для моделей [cite: 456]
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let camera, scene, renderer;
let jewelryModel; // Змінна для твоєї моделі

init();
animate();

function init() {
  // 1. Сцена та Камера [cite: 167]
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);

  // 2. Освітлення - важливо для металевого блиску ювелірки [cite: 179]
  const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
  scene.add(light);

  // 3. Рендерер та активація WebXR [cite: 190]
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true; 
  document.body.appendChild(renderer.domElement);

  // Додаємо кнопку "Start AR" [cite: 197, 374]
  document.body.appendChild(ARButton.createButton(renderer));

  // 4. Завантаження моделі (Завдання №2) [cite: 419]
  const loader = new GLTFLoader();
  
  // ЗАМІНИ ЦЕ ПОСИЛАННЯ НА СВОЄ (з GitHub Pages)
  const modelUrl = 'public/trisector_chain__posthuman.lab.glb'; 

  loader.load(
    modelUrl,
    (gltf) => {
      jewelryModel = gltf.scene;
      
      // Початкове розміщення перед камерою [cite: 381]
      jewelryModel.position.set(0, 0, -0.5); 
      
      // Масштабування - ювелірні вироби зазвичай маленькі
      jewelryModel.scale.set(0.1, 0.1, 0.1); 

      // Налаштування матеріалів для кожної частини моделі [cite: 442]
      jewelryModel.traverse((child) => {
        if (child.isMesh) {
          // Робимо матеріал схожим на золото/срібло [cite: 183]
          child.material.metalness = 1;
          child.material.roughness = 0.2;
        }
      });

      scene.add(jewelryModel); // Додаємо на сцену [cite: 150]
    },
    (xhr) => { console.log((xhr.loaded / xhr.total * 100) + '% завантажено'); },
    (error) => { console.error('Помилка завантаження моделі:', error); }
  );
}

function animate() {
  // Використовуємо спеціальний цикл рендерера для WebXR [cite: 200]
  renderer.setAnimationLoop(render);
}

function render(time) {
  // Реалізація анімації моделі в реальному часі [cite: 415]
  if (jewelryModel) {
    jewelryModel.rotation.y = time * 0.001; // Повільне обертання [cite: 444]
  }
  
  renderer.render(scene, camera); // [cite: 223]
}