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




export function draw_04 ({clock, renderer, scene, camera, meshes, stats}) {
  if(stats){
    stats.update();
  }
  
  const delta = clock.getDelta();
  const [obj1, obj2, obj3, ...rest] = meshes;
  obj1.rotation.y += delta;
  obj2.rotation.y += delta;
  obj3.rotation.y += delta;
  
  
  renderer.render( scene, camera );
  renderer.setAnimationLoop(
    draw_04.bind(this, {
      clock, renderer, scene, camera, meshes, stats
    })
  );
}



export function draw_05({
                          clock,
                          meshes,
                          renderer,
                          scene,
                          camera,
                          stats,
                          geometry,
                          callback
}) {
  if(stats){
    stats.update();
  }
  
  if(callback && typeof callback === 'function'){
    callback();
  }
  if ( geometry ) {
    geometry.attributes.position.needsUpdate = true;
  }
  renderer.render( scene, camera );
  renderer.setAnimationLoop(
    draw_05.bind( this,
      {
        clock,
        meshes,
        renderer,
        scene,
        camera,
        stats,
        geometry,
        callback
    
      })
  );
}



export function draw_06({
                          clock,
                          meshes,
                          renderer,
                          scene,
                          camera,
                          stats,
                          geometry,
                          callback
                        }) {
  if(stats){
    stats.update();
  }
  if(callback && typeof callback === 'function'){
    callback();
  }
  
  
  renderer.render( scene, camera );
  renderer.setAnimationLoop(
    draw_06.bind( this,
      {
        clock,
        meshes,
        renderer,
        scene,
        camera,
        stats,
        geometry,
        callback
      })
  );
}
