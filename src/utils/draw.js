import {setMeshAnimationStyle} from './setMeshAnimationStyle'

export function draw02 ({clock, renderer, scene, camera, oldTime, mesh, meshes,}) {
  // const time = clock.getElapsedTime();
  const newTime = Date.now();
  const deltaTime = newTime - oldTime; // deltaTime: 시간 간격
  oldTime = newTime;
  
  if ( !mesh && !Array.isArray( meshes ) ) return console.error( "Invalid" );
  
  if ( Array.isArray( meshes ) ) {
    meshes.forEach( (mesh) => {
      setMeshAnimationStyle( mesh, deltaTime );
    } );
  } else if ( mesh ) {
    setMeshAnimationStyle( mesh, deltaTime );
  }
  
  renderer.render( scene, camera );
  
  renderer.setAnimationLoop(
    draw02.bind( this,
    {
      clock, renderer, scene, camera, oldTime, mesh, meshes
    } )
  );
}


export function draw_03 ({clock, renderer, scene, camera, mesh, stats}) {
  if(stats){
    stats.update();
  }
  const time = clock.getElapsedTime();
  mesh.rotation.y = time;
  renderer.render( scene, camera );
  renderer.setAnimationLoop(
    draw_03.bind(this, {
      clock, renderer, scene, camera, mesh, stats
    })
  );
}

/*
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.render( scene, camera );
*
* */
