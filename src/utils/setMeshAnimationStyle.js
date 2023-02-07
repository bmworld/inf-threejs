export const setMeshAnimationStyle = (mesh, deltaTime) => {
  // ###################################################
  // # ROTATION
  // mesh.rotation.x = 1 * deltaTime;
  // mesh.rotation.y += 0.1;
  // mesh.rotation.y = 1 * deltaTime;
  // mesh.rotation.y += THREE.MathUtils.degToRad(5); // degToRad: degree -> Radian 변환
  // mesh.rotation.z = 1 * deltaTime;
  mesh.rotation.y += deltaTime * 0.005;
  // # POSITION
  mesh.position.x += Math.random() * -0.01;
  mesh.position.y += Math.random() * deltaTime * 0.002;
  mesh.position.z += Math.random() * deltaTime * 0.017;
  const limitValue = 4;
  if ( mesh.position.y > limitValue || mesh.position.z > limitValue * 3 ) {
    mesh.position.x = Math.random() * 5 - 2.5;
    mesh.position.z = Math.random() * 5 - 2.5;
    mesh.position.y = Math.random() * 5 - 2.5;
  }
  // ###################################################
  // # GSAP VERSION.
  /* GSAP */
  // gsap.to(
  //   mesh.position,
  //   {
  //     duration: 1,
  //     y: 2,
  //     z: 3
  //   }
  // );
  
};
