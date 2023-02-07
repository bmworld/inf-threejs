export class CanvasClass {
  canvas = document.createElement( 'canvas' );
  parentId;
  
  constructor (id) {
    this.parentId = `#${id}`;
    this.canvas.id = "three-canvas";
  }
  
  appendChild (renderer) {
    const parent = document.querySelector( this.parentId );
    if ( parent ) {
      parent.appendChild( renderer );
    }
  }
  
  resizeHandler(cb){
    if(typeof cb === 'function'){
      window.addEventListener( 'resize', cb );
    }
  }
}
