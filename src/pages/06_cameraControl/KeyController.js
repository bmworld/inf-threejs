export class KeyController {
  keys = [];
  controls = null;
  constructor({controls}) {
  
    this.keys = [];
    this.init();
    this.controls = controls;
  }
  
  init () {
    if (!window || typeof window === "undefined")  return;
    window.addEventListener('keydown',(e) => {
      console.log("keydown: ",e.code);
      this.keys[e.code] = true;
    });
  
    window.addEventListener('keyup',(e) => {
      console.log("keyup: ",e.code);
      delete this.keys[e.code];
    });
  
  }
  
  walk () {
    if(!this.controls) return;
    
    if (this.keys['KeyW'] || this.keys['ArrowUp']) {
      this.controls.moveForward(0.02);
    }
    if (this.keys['KeyS'] || this.keys['ArrowDown']) {
      this.controls.moveForward(-0.02);
    }
    if (this.keys['KeyA'] || this.keys['ArrowLeft']) {
      this.controls.moveRight(-0.02);
    }
    if (this.keys['KeyD'] || this.keys['ArrowRight']) {
      this.controls.moveRight(0.02);
    }
  
    if (this.keys['Enter']) {
      this.controls.lock();
    }
  
    if (this.keys['Escape']) {
      this.controls.unlock();
    }
  }
  
}
