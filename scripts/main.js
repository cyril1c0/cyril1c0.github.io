import { OrbitControls } from "../3D/scripts/OrbitControls.js";


let camera, renderer, scene, controls, container, loader, cube;

function init() {

    container = document.querySelector(".scene");

    scene = new THREE.Scene();

    const fov = 74
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 1000;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 15)

    const ambient = new THREE.AmbientLight(0x040404, 11);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0x404040, 2);
    light.position.set(180, 180, 270);
    scene.add(light);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha:true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = true;
    controls.enableDamping = true;

    loader = new THREE.GLTFLoader();
    loader.load("./assets/3D/scene.gltf", function (gltf) {
        scene.add(gltf.scene);
        cube = gltf.scene.children[0];
        animate();
    })
}

init();

function animate() {
    controls.update();
    requestAnimationFrame(animate);
    cube.rotation.z = 0.001;
    renderer.render(scene, camera);
}