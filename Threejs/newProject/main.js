import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// scene is the container that holds the objects, lights etc
const scene = new THREE.Scene();

// args are in order: FOV, Aspect Ratio based off users browser window, View Frustrum (control which objects are visible relative to the camera)
// ORDER MATTERS FOR INNDERWIDTH AND INNERHEIGHT!!
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 100);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(0);

renderer.render( scene, camera);

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 ); 
// const material = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } );
const material = new THREE.MeshStandardMaterial( { color: 0x5f5f5f } ); 
const torus = new THREE.Mesh( geometry, material ); 

// add lighting to the scene for 

const pointLight = new THREE.PointLight( 0xffffff, 500 )
pointLight.position.set(0, 0, 0);

const pointLight2 = new THREE.PointLight( 0xffffff, 5000 )
pointLight2.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff)

// helpers
const lightHelper = new THREE.PointLightHelper(pointLight)
const lightHelper2 = new THREE.PointLightHelper(pointLight2)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, lightHelper2, gridHelper)


const controls = new OrbitControls(camera, renderer.domElement);

scene.add(pointLight,pointLight2,  torus)
// renderer.render(scene, camera)

function addStars() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff });
  const star = new THREE.Mesh( geometry, material );

  // helper function to generate random amount between 0 - 100
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star)

}

Array(200).fill().forEach(addStars)

// create a function to render every time page loads 
function animate() {
  requestAnimationFrame( animate);

  torus.rotation.x += 0.01
  torus.rotation.y += 0.003
  torus.rotation.z += 0.01

  controls.update();

  renderer.render(scene, camera)
}

animate()

