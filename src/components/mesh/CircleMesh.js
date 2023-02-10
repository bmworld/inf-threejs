import * as THREE from "three";

export const CircleMesh = ({geometry}) => {
  
  const material = new THREE.MeshStandardMaterial( {
    color: '#0d395d',
    side: THREE.DoubleSide,
    flatShading: true
  } );
  const mesh = new THREE.Mesh( geometry, material );
  mesh.scale.set( .1, .1, .1 );
  const positionArray = geometry.attributes.position.array;
  const randomArray = [];
  const randomValue = () => (Math.random() - 0.5) * 0.2;
  for (let i = 0; i < positionArray.length; i += 3) {
    // 정점(Vertex) 한 개의 x, y, z 좌표를 랜덤으로 조정
    // positionArray[i] = positionArray[i] + (Math.random() - 0.5) * 0.2;
    positionArray[i] += randomValue();
    positionArray[i + 1] += randomValue();
    positionArray[i + 2] += randomValue();
    
    randomArray[i] = randomValue();
    randomArray[i + 1] = randomValue();
    randomArray[i + 2] = randomValue();
  }
  
  return {mesh, positionArray, randomArray};
};
