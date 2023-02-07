import * as THREE from 'three';
import {setSize} from "../../utils/setSize";
import {draw02} from "../../utils/draw";

// ----- 주제: 기본 장면
export default function lec02_example () {
  // Renderer
  
  
  // ###################### Create CANVAS ######################
  const canvas = document.createElement( 'canvas' );
  canvas.id = "three-canvas";
  const renderer = new THREE.WebGLRenderer( {
    canvas,
    antialias: true,
    alpha: true
  } );
  
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setPixelRatio( window.devicePixelRatio > 1 ? 2 : 1 );
  renderer.setClearColor('darkslategray'); // 반투명 효과
  renderer.setClearAlpha(0.1); // setClearColor 의 Alpha 값 세팅
  // ###################################################
  
  
  // ###################### SCENE ######################
  const scene = new THREE.Scene();
  scene.background = new THREE.Color( 'darkslategray' ); // 배경 색상 => CSS 배경색상 효과와 동일
  scene.fog = new THREE.Fog( 'blue', 3 ,7 ); // near: 카메라와 얼마나 가까우면, fog를 적용할 것인가.
  // ###################################################
  
  
  
  // ###################### Perspective CAMERA (원근법 O) ######################
  // const camera = new THREE.PerspectiveCamera(
  //   75, // 시야각(field of view)
  //   (window.innerWidth / 1) / (window.innerHeight / 1), // 종횡비(aspect)
  //   0.1, // near
  //   1000 // far
  // );
  //
  // camera.position.x = -1;
  // camera.position.y = 2;
  // camera.position.z = 20;
  // scene.add( camera );
  // ###################################################
  
  
  
  // ###################### Orthographic CAMERA (원근법 X) ######################
  const camera = new THREE.OrthographicCamera(
  	-(window.innerWidth / window.innerHeight), // left
  	window.innerWidth / window.innerHeight, // right,
  	1, // top
  	-1, // bottom
  	0.1,
  	10000
  );
  camera.position.x = 1;
  camera.position.y = -4;
  camera.position.z = 2;
  camera.lookAt(0, 0, 0);
  camera.zoom = 0.1;
  camera.updateProjectionMatrix();
  scene.add(camera);
  // ###################################################
  
  
  
  
  // ###################### LIGHT ######################
  const light = new THREE.DirectionalLight( 0xffffff, 1 );
  light.position.x = 1;
  light.position.y = 1;
  light.position.z = 5;
  scene.add( light );
  // ###################################################
  
  
  // ###################### MESH ######################
  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  // * THREE.MeshBasicMaterial <-- Light 적용되지 않는 재질.
  const material = new THREE.MeshStandardMaterial( {
    color: 'darkslategray',
    transparent: true,
    opacity: .8,
    depthWrite: true,
  } );
  // MESH 1개 일 때
  // const mesh = new THREE.Mesh(geometry, material);
  // scene.add(mesh);
  const meshes = [];
  let mesh;
  for (let i = 0; i < 20; i++) {
    mesh = new THREE.Mesh( geometry, material );
    mesh.position.x = Math.random() * 5 - 2.5;
    mesh.position.z = Math.random() * 5 - 2.5;
    mesh.position.y = Math.random() * 5 - 2.5;
    scene.add( mesh );
    meshes.push( mesh );
  }
  // ###################################################
  
  
  // ###################### EVENT ######################
  // 윈도우 화면 크기에 따른 Canvas 사이즈 조절
  window.addEventListener( 'resize', setSize.bind( window, {renderer, camera, scene} ) )
  // ###################################################
  
  
  // ###################### APPEND CANVAS TO DOC ######################
  document.querySelector( "#root" ).appendChild( renderer.domElement );
  
  
  // ###################### RENDER ######################
  // renderer.render(scene, camera);
  // ! 애니메이션 성능 보정 > Device마다 Animatnion 움직임 속도를 동일하게 유지시킴
  //  단, 고성능은 더 부드럽게 움직일 것이다. (Frame이 더 많기 때문)
  
  const clock = new THREE.Clock(); //
  let oldTime = Date.now();
  if ( Array.isArray( meshes ) ) {
    draw02( {clock, meshes, renderer, scene, camera, oldTime} )
  } else {
    draw02( {clock, mesh, renderer, scene, camera, oldTime} );
  }
  
  
}
