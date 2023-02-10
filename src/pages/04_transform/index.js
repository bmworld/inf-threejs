import * as THREE from 'three';
import dat from 'dat.gui';
import {CanvasClass} from "../../class/canvasClass";
import {setSize} from "../../utils/setSize";
import {GuiHelperClass} from "../../class/guiHelperClass";
import {draw_04} from "../../utils/draw";

// ----- 주제:

export default function lec04_example() {
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
  camera.position.y = 1; // # GridHelper line color: GREEN
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
  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshStandardMaterial( {
    color: 'hotpink'
  } );
  
  
  //
  const group1 = new THREE.Group();
  const box1 = new THREE.Mesh( geometry, material );
  // box1.rotation.reorder('YXZ');
  // box1.rotation.y = THREE.MathUtils.degToRad(10);
  // box1.rotation.x = THREE.MathUtils.degToRad(20);
  
  //
  const group2 = new THREE.Group();
  const box2 = box1.clone();
  box2.scale.set(0.3,0.3,0.3)
  group2.position.x = 2;
  
  // group
  const group3 = new THREE.Group();
  const box3 = box2.clone();
  box3.scale.set( 0.1, .1 , .1);
  box3.position.x = 0.5;
  box3.position.y = 1;
  box3.rotation.x = THREE.MathUtils.degToRad( 45 );
  
  // groups
  const groups = [group1, group2, group3];
  
  group1.add(box1, group2); // box1 태양
  group2.add(box2, group3); // box2 지구
  group3.add(box3); // box 달
  scene.add(group1);
  // ###################################################
  
  
  
  // ! 특정 대상을 중심으로 카메라 포지션 조절 가능
  // camera.lookAt( box1.position );
  
  
  // ###################### canvas event ######################
  c.appendChild( renderer.domElement);
  c.resizeHandler( setSize.bind(window, {renderer, camera, scene}) );
  // ###################################################
  
  
  
  // ######################## HELPER ##############################
  const helper = new GuiHelperClass({THREE, scene, mesh:box1, camera});
  helper.init();
  helper.axesHelper();
  helper.guiHelper();
  const stats = helper.fpsHelper();
  const clock = new THREE.Clock();
  draw_04({clock, meshes: groups, renderer, scene, camera, stats})
  
}
