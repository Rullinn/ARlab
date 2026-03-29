import './style.css';
import * as THREE from 'three';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Глобальні змінні
let camera, scene, renderer;
let mesh1, mesh2, mesh3; // Об'єкти для Завдання 1
let jewelryModel;         // Об'єкт для Завдання 2

init();
animate();

function init() {
  // 1. Створення сцени [cite: 163, 167]
  scene = new THREE.Scene();

  // 2. Налаштування камери [cite: 167]
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);

  // 3. Додавання освітлення (HemisphereLight створює м'яке світло) [cite: 169, 179]
  const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
  scene.add(light);

  // 4. Ініціалізація рендерера [cite: 167]
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true; // Активація підтримки WebXR [cite: 190]
  document.body.appendChild(renderer.domElement);

  // 5. Додавання кнопки запуску AR [cite: 193, 374]
  document.body.appendChild(ARButton.createButton(renderer));

  // --- ЗАВДАННЯ №1 (Варіант 6) --- [cite: 379, 380]
  
  // Додекаедр (Золотистий)
  const geo1 = new THREE.DodecahedronGeometry(0.08);
  const mat1 = new THREE.MeshStandardMaterial({ color: 0xffd700 });
  mesh1 = new THREE.Mesh(geo1, mat1);
  mesh1.position.set(-0.2, 0, -0.5); // 0.5м від камери [cite: 381]
  scene.add(mesh1);

  // Кільце (Сріблясте)
  const geo2 = new THREE.RingGeometry(0.04, 0.08, 32);
  const mat2 = new THREE.MeshPhongMaterial({ color: 0xc0c0c0, side: THREE.DoubleSide });
  mesh2 = new THREE.Mesh(geo2, mat2);
  mesh2.position.set(0, 0, -0.5);
  scene.add(mesh2);

  // Тетраедр (Напівпрозорий синій)
  const geo3 = new THREE.TetrahedronGeometry(0.08);
  const mat3 = new THREE.MeshLambertMaterial({ color: 0x0000ff, transparent: true, opacity: 0.6 });
  mesh3 = new THREE.Mesh(geo3, mat3);
  mesh3.position.set(0.2, 0, -0.5);
  scene.add(mesh3);

  // --- ЗАВДАННЯ №2 (Ювелірний виріб) --- [cite: 416, 418]
  const loader = new GLTFLoader();
  // ЗАМІНИ ПОСИЛАННЯ нижче на своє пряме посилання з GitHub Pages
  const jewelryUrl = '/trisector_chain__posthuman.lab.glb'; 

  loader.load(jewelryUrl, (gltf) => {
    jewelryModel = gltf.scene;
    jewelryModel.position.set(0, -0.2, -0.7); // Трохи далі та нижче фігур
    jewelryModel.scale.set(0.1, 0.1, 0.1);    // Масштабування моделі
    
    // Налаштування матеріалів моделі [cite: 442]
    jewelryModel.traverse((child) => {
      if (child.isMesh) {
        child.material.metalness = 1;
        child.material.roughness = 0.2;
      }
    });
    scene.add(jewelryModel);
  });

  // --- ЗАВДАННЯ №3 ТА №4 (Закоментовано) ---
  /*
  // Тут мала бути логіка Hit Test та розміщення ікосаедра/динозавра [cite: 464, 474]
  // Для їх роботи потрібна мітка (reticle) та обробка подій контролера.
  */

  // Обробка зміни розміру вікна
  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  // Спеціальний цикл для WebXR [cite: 197, 200]
  renderer.setAnimationLoop(render);
}

function render(time) {
  const speed = time * 0.001;

  // Анімація об'єктів Завдання 1 [cite: 376, 378]
  if (mesh1) mesh1.rotation.y = speed;
  if (mesh2) mesh2.rotation.z = speed;
  if (mesh3) {
    mesh3.rotation.x = speed;
    mesh3.rotation.y = speed;
  }

  // Анімація моделі Завдання 2 [cite: 415]
  if (jewelryModel) {
    jewelryModel.rotation.y = speed * 0.5;
  }

  renderer.render(scene, camera); // Малювання кадру [cite: 218, 220]
}