import * as THREE from 'three';
import {CanvasClass} from "../../class/canvasClass";
import {setSize} from "../../utils/setSize";
import {draw_03} from "../../utils/draw";
import {GuiHelperClass} from "../../class/guiHelperClass";


export default function lec03_example () {
  
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
  // renderer.setClearAlpha(0.1); // setClearColor 의 Alpha 값 세팅
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
  camera.position.x = 3; // GridHelper 파란색
  camera.position.y = 10; // GridHelper 연두색
  camera.position.z = -1;
  scene.add( camera );
  // ###################################################
  
  
  // ###################### light ######################
  const ambientLight = new THREE.AmbientLight( 'white', 0.3 );
  scene.add( ambientLight );
  
  const directionalLight = new THREE.DirectionalLight( 'white', 3 );
  directionalLight.position.x = 1;
  directionalLight.position.z = 2;
  scene.add( directionalLight );
  // ###################################################
  
  
  
  // ###################### mesh ######################
  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshStandardMaterial( {
    color: 'seagreen'
  } );
  const mesh = new THREE.Mesh( geometry, material );
  // mesh.position.x = 0;
  // mesh.position.y = 0;
  // mesh.position.z = 0;
  scene.add( mesh );
  // ###################################################
  
  // ! 카메라 포지션 조절
  camera.lookAt( mesh.position );
  
  
  
  // ###################### canvas event ######################
  c.appendChild( renderer.domElement);
  c.resizeHandler( setSize.bind(window, {renderer, camera, scene}) );
  // ###################################################
  
  
  // ######################## HELPER ##############################
  const helper = new GuiHelperClass({THREE, scene, mesh, camera});
  helper.init();
  helper.axesHelper();
  helper.guiHelper();
  const stats = helper.fpsHelper();
  const clock = new THREE.Clock();
  draw_03({clock, mesh, renderer, scene, camera, stats})
  // ###################################################
}
