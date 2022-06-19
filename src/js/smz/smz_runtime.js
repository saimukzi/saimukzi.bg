'use strict';

export const SmzRuntime = (function(){

class SmzRuntime {
  constructor(app, fps){
    const self=this;
    self.actBusy = false;
    self.app = app;
    self.fps = fps;
    
    self.app.ticker.maxFPS = self.fps;
    
    self.scene = null;
  };
  
  act(func,callback=null){
    const self = this;

    if(self.actBusy){
      if(callback){self.app.ticker.addOnce(callback);}
      return false;
    }
    self.actBusy = true;

    Promise.resolve()
    .then(()=>{return new Promise(func);})
    .catch((reason)=>{
      //console.error(`LEMLPBUV act error, reason=${reason}`);
      console.error(reason);
    })
    .finally(()=>{
      self.actBusy = false;
      if(callback){self.app.ticker.addOnce(callback);}
    });
    
    return true;
  };

  setScene(scene){
    const self=this;
    if(self.scene!=null){
      self.scene.destroy();
      self.scene = null;
    }
    if(scene!=null){
      self.scene = scene;
      self.app.stage.addChild(self.scene);
    }
  };
};

return SmzRuntime;

})();
