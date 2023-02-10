import * as THREE from 'three';
import {CanvasClass} from "../../class/canvasClass";
import {setSize} from "../../utils/setSize";
import {GuiHelperClass} from "../../class/guiHelperClass";
import {draw_05} from "../../utils/draw";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {CircleMesh} from "../../components/mesh/CircleMesh";

// ----- 주제:

export default function lec05_example() {
  // Renderer
  // ###################### Create CANVAS ######################
  // const canvas = document.createElement( 'canvas' );
  const c = new CanvasClass( 'root' );
  const canvas = c.canvas;
  // ###################################################
  
  
  
  // ###################### renderer ######################
  const renderer = new THREE.WebGLRenderer( {
    canvas,
    antialias: true,
    alpha: true
  } );
  
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setPixelRatio( window.devicePixelRatio > 1 ? 2 : 1 );
  renderer.setClearColor('black'); // 반투명 효과
  // ###################################################
  
  
  
  // ###################### scene ######################
  const scene = new THREE.Scene();
  // ###################################################
  
  
  
  // ###################### camera ######################
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.x = 0; // # GridHelper line color: RED
  camera.position.y = 0; // # GridHelper line color: GREEN
  camera.position.z = 5; // # GridHelper line color: BLUE
  scene.add( camera );
  // ###################################################
  
  
  // ###################### light ######################
  const ambientLight = new THREE.AmbientLight( 'white', 0.5 );
  scene.add( ambientLight );
  
  const directionalLight = new THREE.DirectionalLight( 'white', 1 );
  directionalLight.position.x = 1;
  directionalLight.position.z = 2;
  scene.add( directionalLight );
  // ###################################################
  
  
  // ###################### mesh ######################
  
  const geometry = new THREE.TorusKnotGeometry(10, 3, 100,3);
  // const geometry = new THREE.SphereGeometry(5, 64, 64);
  const {mesh, positionArray, randomArray} = CircleMesh({geometry});
  
  const meshes = [mesh]
  scene.add(...meshes);
  // ###################################################
  
  
  
  // ! 특정 대상을 중심으로 카메라 포지션 조절 가능
  // camera.lookAt( box1.position );
  
  
  // ###################### canvas event ######################
  c.appendChild( renderer.domElement);
  c.resizeHandler( setSize.bind(window, {renderer, camera, scene}) );
  // ###################################################
  
  
  // ###################### Controls ######################
  const controls = new OrbitControls(camera, renderer.domElement); // OrbitControls 선언 시, 마우스 이벤트를 먹일 수 있다.
  // ###################################################
  
  // ######################## HELPER ##############################
  const helper = new GuiHelperClass({THREE, scene, mesh:mesh, camera});
  helper.init();
  helper.axesHelper();
  // helper.guiHelper();
  const stats = helper.fpsHelper();
  const clock = new THREE.Clock();
  draw_05({
    clock,
    meshes: [mesh],
    renderer,
    scene,
    camera,
    stats,
    geometry,
    callback: animating.bind(null, {clock, positionArray, randomArray})
  })
  
}





const animating = ({clock, positionArray, randomArray}) => {
  const time = clock.getElapsedTime() * 5;
  
  const randomValue = val => (Math.sin(time + val * 1000) * 0.002);
  
  for (let i = 0; i < positionArray.length; i += 3) {
    positionArray[i] += randomValue(randomArray[i]);
    positionArray[i+1] += randomValue(randomArray[i+1]);
    positionArray[i+2] += randomValue(randomArray[i+2]);
  }
};
