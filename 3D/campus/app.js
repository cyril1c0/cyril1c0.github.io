import { OrbitControls } from "../scripts/OrbitControls.js";

let container, camera, renderer, scene, floor, controls;

function init() {
	container = document.querySelector(".scene");
  
	scene = new THREE.Scene();
  
	const fov = 60;
	const aspect = container.clientWidth / container.clientHeight;
	const near = 0.1;
	const far = 1000;

	camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.set(90,10,0);
  
	const ambient = new THREE.AmbientLight(0x040404, 2);
	scene.add(ambient);
  
	const light_f = new THREE.DirectionalLight(0x404040, 1);
	light_f.position.set(90,180,40);
	scene.add(light_f)

	const light_b = new THREE.DirectionalLight(0x404040, 1);
	light_b.position.set(-90,180,40);
	scene.add(light_b)

	renderer = new THREE.WebGLRenderer({ antialias: true });//, alpha: true
	renderer.setSize(container.clientWidth, container.clientHeight);
	renderer.setPixelRatio(window.devicePixelRatio);
  
	container.appendChild(renderer.domElement);
  
	controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.enablePan = true;
	controls.maxPolarAngle = Math.PI / 2;

	let loader = new THREE.GLTFLoader();
	loader.load("./assets/scene.glb", function(gltf) {
	  scene.add(gltf.scene);
	  floor = gltf.scene.children[0];
	  animate();
	});

	container.addEventListener( 'resize', onWindowResize );
  }
  
  function animate(){
	controls.update();
	requestAnimationFrame( animate );
	floor.rotation.z -= 0.0003;
	renderer.render(scene, camera);
  }
  init();
  
  function onWindowResize() {
	camera.aspect = container.clientWidth / container.clientHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(container.innerHeight, container.innerWidth);
  }