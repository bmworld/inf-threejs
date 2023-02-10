import * as THREE from 'three';
import {CanvasClass} from "../../class/canvasClass";
import {setSize} from "../../utils/setSize";
import {GuiHelperClass} from "../../class/guiHelperClass";
import {draw_05, draw_06} from "../../utils/draw";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {TrackballControls} from "three/examples/jsm/controls/TrackballControls";
import {FlyControls} from "three/examples/jsm/controls/FlyControls";
import {PointerLockControls} from "three/examples/jsm/controls/PointerLockControls";
import {FirstPersonControls} from "three/examples/jsm/controls/FirstPersonControls";
import {DragControls} from "three/examples/jsm/controls/DragControls";
import {KeyController} from "./KeyController";

// ----- 주제:

export default function lec06_example() {
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
  camera.position.y = 1.5; // # GridHelper line color: GREEN
  camera.position.z = 10; // # GridHelper line color: BLUE
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
  
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const geometry = new THREE.SphereGeometry(5, 64, 64);
  let meshes = [];
  let mesh;
  let material;
  for (let i = 0; i < 20; i++) {
    material = new THREE.MeshStandardMaterial({
      color: `rgb(
				${ 50 + Math.floor(Math.random() * 205) },
				${ 50 + Math.floor(Math.random() * 205) },
				${ 50 + Math.floor(Math.random() * 205) }
			)`
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 5;
    mesh.position.y = (Math.random() - 0.5) * 5;
    mesh.position.z = (Math.random() - 0.5) * 5;
    mesh.name = `box-${i}`;
    scene.add(mesh);
    meshes.push( mesh );
  }
  // ###################################################
  
  
  
  // ! 특정 대상을 중심으로 카메라 포지션 조절 가능
  // camera.lookAt( box1.position );
  
  
  // ###################### canvas event ######################
  c.appendChild( renderer.domElement);
  c.resizeHandler( setSize.bind(window, {renderer, camera, scene}) );
  // ###################################################
  
  // ! ######################################################
  // ! ###################### Controls ######################
  const ctrls = {
    orbit: () => new OrbitControls(camera, renderer?.domElement),
    trackball: () => new TrackballControls(camera, renderer.domElement), // 전방위 회전 가능.
    fly: () => new FlyControls(camera, renderer.domElement), // 방향키 조작 가능 // draw 힘수 내에서 "delta" 값을 args로 넣어줘야함.
    person: () => new FirstPersonControls(camera, renderer.domElement),
    pointerLock: () => new PointerLockControls( camera, renderer.domElement), // 마우스 포인터 사라지게 함.
    drag: () => new DragControls(meshes, camera, renderer.domElement), // mesh를 드래그앤 드랍 가능하게 됨.
  };
  
  const controls = ctrls.pointerLock();
  // ########################################
  controls.enableDamping = true; // 관성이 적용되어, 부드러운 움직임 적용/
  // controls.enableZoom = false;
  controls.maxDistance = 50;
  controls.minDistance = 6;
  // controls.minPolarAngle = Math.PI / 4; // 45도
  // controls.minPolarAngle = THREE.MathUtils.degToRad(45);
  // controls.maxPolarAngle = THREE.MathUtils.degToRad(135);
  // controls.target.set(2, 2, 2);
  // controls.autoRotate = true;
  // controls.autoRotateSpeed = 5;
  
  // ########## ONLY-fly controls ##########
  // docs: https://threejs.org/docs/index.html?q=fly#examples/en/controls/FlyControls
  // controls.rollSpeed = 0.01; // 마우스 위치에 따라서 자동으로 카메라 시점 전환
  // controls.dragToLook = true; // 자동 시점전환 끄고, drag 이벤트로만 시점 전환
  // controls.movementSpeed = 10;
  
  // ########## ONLY-PointerLockControls #########
  // controls.domElement.addEventListener( 'click', pointerLockControlHandler.bind(this, {controls}) );
  // controls.addEventListener('lock', () => {
  //   console.log('lock!');
  // });
  // controls.addEventListener('unlock', (event, a, b) => {
  // });
  //
  // ########## ONLY-drag controls ##########
  // controls.addEventListener('dragstart', e => {
  //   console.log(e.object.name);
  // });
  // ! ########## ONLY-DragControls #########
  const keyController = new KeyController({controls});
  
  // ! ######################################################
  
  // ######################## HELPER ##############################
  const helper = new GuiHelperClass({THREE, scene, mesh:mesh, camera});
  helper.init();
  helper.axesHelper();
  // helper.guiHelper();
  const stats = helper.fpsHelper();
  const clock = new THREE.Clock();
  draw_06({
    clock,
    meshes: [mesh],
    renderer,
    scene,
    camera,
    stats,
    geometry,
    controls,
    // callback: animationCallback.bind(null, {controls, clock}) <- 그 외
    callback: keyController.walk.bind(keyController) // <-- ! pointerLock controls 전용
  })
  
}



async function pointerLockControlHandler ({controls}, event) {
  if(!controls) return;
  await controls.lock();
}




const animationCallback = ({controls, clock}) => {
  if(controls.hasOwnProperty("update")){
    const delta = clock && clock.getDelta();
    controls.update(delta);
  }
};
