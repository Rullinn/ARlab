import './style.css';
import * as THREE from 'three';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let camera, scene, renderer;
let currentObjects = new THREE.Group(); // Контейнер для поточного завдання 

init();
animate();

function init() {
  scene = new THREE.Scene();
  scene.add(currentObjects); // Додаємо групу на сцену [cite: 176]

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);

  // ВИПРАВЛЕННЯ СВІТЛА: додаємо яскраве направлене світло
  const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
  scene.add(light);
  const dirLight = new THREE.DirectionalLight(0xffffff, 2); // Потужне світло 
  dirLight.position.set(5, 5, 5);
  scene.add(dirLight);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  document.body.appendChild(renderer.domElement);
  document.body.appendChild(ARButton.createButton(renderer));

  // Кнопки перемикання
  document.getElementById('task1').onclick = () => runTask1();
  document.getElementById('task2').onclick = () => runTask2();
  
  runTask1(); // Починаємо з першого
}

function clearTask() {
  currentObjects.clear(); // Видаляємо всі об'єкти попереднього завдання [cite: 170]
}

// --- ЗАВДАННЯ 1: Примітиви ---
function runTask1() {
  clearTask();
  // Додекаедр, Кільце, Тетраедр (Вар 6) [cite: 2]
  const geo1 = new THREE.DodecahedronGeometry(0.08);
  const mesh1 = new THREE.Mesh(geo1, new THREE.MeshStandardMaterial({ color: 0xffd700 }));
  mesh1.position.set(-0.2, 0, -0.5);
  currentObjects.add(mesh1);

  const geo2 = new THREE.RingGeometry(0.04, 0.08, 32);
  const mesh2 = new THREE.Mesh(geo2, new THREE.MeshPhongMaterial({ color: 0xc0c0c0, side: THREE.DoubleSide }));
  mesh2.position.set(0, 0, -0.5);
  currentObjects.add(mesh2);
}

// --- ЗАВДАННЯ 2: Прикраса ---
function runTask2() {
  clearTask();
  const loader = new GLTFLoader();
  // ПЕРЕВІР ПОСИЛАННЯ: воно має бути прямим на файл [cite: 438]
  loader.load('public/trisector_chain__posthuman.lab.glb', (glb) => {
    const model = glb;scene;
    model.position.set(0, 0, -0.5);
    model.scale.set(0.2, 0.2, 0.2);
    
    model.traverse((child) => {
      if (child.isMesh) {
        // Якщо модель чорна, спробуй зменшити metalness
        child.material.metalness = 0.5; 
        child.material.roughness = 0.2;
      }
    });
    currentObjects.add(model);
  });
}

function animate() {
  renderer.setAnimationLoop((time) => {
    currentObjects.rotation.y = time * 0.0005; // Анімація всієї групи [cite: 176, 415]
    renderer.render(scene, camera);
  });
}