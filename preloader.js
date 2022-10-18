// images
let allImages = ['images/bird.png', 'images/bg.png', 'images/fg.png', 'images/pipeNorthLarge.png', 'images/pipeSouthLarge.png'];
let loaded = 0;

function preloader(initFn, allImages){

  for(let elem of allImages){
    let img = new Image();
    img.src = elem;
    img.onload = function(){
      loaded++;
      if(loaded === allImages.length){
        initFn();
        //console.log('preloader inside');
      }else{
        //console.log((loaded/allImages.length)*100);
      }
    }
  }
  Game.imgLoaded = true;
}
