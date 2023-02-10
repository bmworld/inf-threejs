import dat from "dat.gui";
import Stats from "stats.js";

export class GuiHelperClass {
  
  THREE;
  scene;
  mesh;
  camera;
  gui = new dat.GUI();
  
  constructor ({THREE, scene, mesh, camera}) {
    this.THREE = THREE;
    this.scene = scene;
    this.mesh = mesh;
    this.camera = camera;
  }
  
  init () {
    // property 설정하는 2가지 방법 중 선택.
    if ( this.mesh ) {
      this.gui.add( this.mesh.position, 'x' ).min( -10 ).max( 10 ).step( 0.1 ).name( 'Mesh X' );
      this.gui.add( this.mesh.position, 'y' ).min( -10 ).max( 10 ).step( 0.1 ).name( 'Mesh Y' );
      this.gui.add( this.mesh.position, 'z' ).min( -10 ).max( 10 ).step( 0.1 ).name( 'Mesh Z' );
      
    }
    if ( this.camera ) {
      this.gui.add( this.camera.position, 'x', -50, 50, 0.1 ).name( 'Cam X' );
      this.gui.add( this.camera.position, 'y', -50, 50, 0.1 ).name( 'Cam Y' );
      this.gui.add( this.camera.position, 'z', -10, 50, 0.1 ).name( 'Cam Z' );
    }
  }
  
  fpsHelper () {
    // ! THREE JS renderer > setAnimationLoop > 재귀함수 args 내에 포함 시 정상작동
    const stats = new Stats();
    document.body.append( stats.domElement );
    return stats;
  }
  
  axesHelper () {
    const axesHelper = new this.THREE.AxesHelper( 3 );
    this.scene.add( axesHelper );
  }
  
  guiHelper () {
    const gridHelper = new this.THREE.GridHelper( 10 );
    this.scene.add( gridHelper );
  }
}
