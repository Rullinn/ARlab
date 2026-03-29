import './style.css'; 
import * as THREE from 'three'; 
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js'; 

let camera, scene, renderer;
let mesh1, mesh2, mesh3; // Наші фігури за 6 варіантом

init();
animate();

function init() {
  // 1. Сцена - контейнер для об'єктів [cite: 150, 167]
  scene = new THREE.Scene(); 

  // 2. Камера - точка огляду користувача [cite: 164, 167]
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);

  // 3. Світло - необхідне для відображення матеріалів [cite: 173, 179]
  const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
  scene.add(light);

  // 4. Рендерер з підтримкою WebXR [cite: 149, 190]
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true; // Активуємо WebXR сесію [cite: 59, 190]
  document.body.appendChild(renderer.domElement);

  // Додаємо кнопку "Start AR" [cite: 197, 378]
  document.body.appendChild(ARButton.createButton(renderer));

  // --- ОБ'ЄКТИ ЗА 6 ВАРІАНТОМ  ---

  // 1. Dodecahedron (Додекаедр) - Золотистий матовий матеріал [cite: 181, 183]
  const geo1 = new THREE.DodecahedronGeometry(0.08); 
  const mat1 = new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.5 });
  mesh1 = new THREE.Mesh(geo1, mat1);
  mesh1.position.set(-0.2, 0, -0.5); // 0.5 метра від камери [cite: 381]
  scene.add(mesh1);

  // 2. Ring (Кільце) - Сріблястий блискучий матеріал
  const geo2 = new THREE.RingGeometry(0.04, 0.08, 32);
  const mat2 = new THREE.MeshPhongMaterial({ color: 0xc0c0c0, shininess: 100, side: THREE.DoubleSide });
  mesh2 = new THREE.Mesh(geo2, mat2);
  mesh2.position.set(0, 0, -0.5); 
  scene.add(mesh2);

  // 3. Tetrahedron (Тетраедр) - Синій напівпрозорий матеріал
  const geo3 = new THREE.TetrahedronGeometry(0.08);
  const mat3 = new THREE.MeshLambertMaterial({ color: 0x0000ff, transparent: true, opacity: 0.7 });
  mesh3 = new THREE.Mesh(geo3, mat3);
  mesh3.position.set(0.2, 0, -0.5);
  scene.add(mesh3);
}

function animate() {
  // Цикл рендерингу WebXR [cite: 200, 214]
  renderer.setAnimationLoop(render);
}

function render(time) {
  const speed = time * 0.001;
  
  // Анімація обертання для кожного об'єкта [cite: 206, 380]
  mesh1.rotation.x = speed;
  mesh1.rotation.y = speed;

  mesh2.rotation.z = speed; // Кільце крутиться як диск

  mesh3.rotation.y = speed;
  mesh3.rotation.z = speed * 0.5;

  renderer.render(scene, camera); // Малюємо кадр [cite: 220, 222]
}