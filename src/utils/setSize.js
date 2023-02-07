// ###################################################
// ###################################################
export function setSize ({renderer, camera, scene}) {
  // 카메라
  camera.aspect = window.innerWidth / window.innerHeight;
  // updateProjectionMatrix 카메라 투영에 관련된 값에 변화가 있을 경우 실행해야 함
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.render( scene, camera );
}
