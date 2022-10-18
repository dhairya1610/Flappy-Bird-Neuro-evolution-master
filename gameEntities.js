/**
 * Bird class
 * Takes 'brain' as an argument(optional) if this needs to copy another bird's brain
 */

class Bird {
  constructor(brain) {
    this.y = HEIGHT / 2;
    this.x = 64;
    this.height = 30;
    this.width = 30;

    this.gravity = 0.8;
    this.lift = -12;
    this.velocity = 0;

    this.score = 0;
    this.fitness = 0;

    this.inputs = [];
    this.outputs = [];

    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(5, 8, 2);
    }

    this.birdImg = new Image();
    this.birdImg.src = "images/bird.png";
  }

  show(ctx) {
    ctx.beginPath();
    ctx.drawImage(this.birdImg, this.x, this.y, this.width, this.height);
    ctx.closePath();
  }

  goUp() {
    this.velocity += this.lift;
  }

  mutate() {
    this.brain.mutate(0.1);
  }

  think(pipes) {
    // To find the closest pipe
    let closest = null;
    let closestD = Infinity;
    for (let i = 0; i < pipes.length; i++) {
      let d = (pipes[i].x + pipes[i].w) - this.x;
      if (d < closestD && d > 0) {
        closest = pipes[i];
        closestD = d;
      }
    }

    //let inputs = [];
    this.inputs[0] = this.y / HEIGHT;
    this.inputs[1] = closest.top / HEIGHT;
    this.inputs[2] = closest.bottom / HEIGHT;
    this.inputs[3] = closest.x / WIDTH;
    this.inputs[4] = this.velocity / 10;

    this.outputs = this.brain.predict(this.inputs);

    if (this.outputs[0] > this.outputs[1]) {
      this.goUp();
    }

  }

  offScreen() {
    return (this.y > HEIGHT || this.y < 0);
  }

  update() {
    this.score++;
    // console.log(this.score);
    this.velocity += this.gravity;
    this.y += this.velocity;
  }

}



/**
 * Pipe Class
 */
class Pipe {

  constructor() {

    this.spacing = 125;
    this.top = Math.floor((Math.random() * (1 / 2 * HEIGHT)) + (HEIGHT / 8));
    this.bottom =  (this.top + this.spacing);
    this.x = WIDTH;
    this.w = 80;
    this.height = 5000;
    this.speed = 6;

    this.pipeNorthImg = new Image();
    this.pipeNorthImg.src = 'images/pipeNorthLarge.png';
    this.pipeSouthImg = new Image();
    this.pipeSouthImg.src = 'images/pipeSouthLarge.png';

  }

  collides(bird){
    if((bird.x >= this.x && bird.x <= this.x+this.w) || (bird.x+bird.width >= this.x && bird.x+bird.width <= this.x+this.w)){
      if(bird.y < this.top || bird.y+bird.height >= this.bottom){
        return true;
      }
    }
    return false;
  }

  show(ctx) {
    ctx.beginPath();
    ctx.drawImage(this.pipeNorthImg, this.x, this.top-this.height, this.w, this.height);
    ctx.drawImage(this.pipeSouthImg, this.x, this.bottom, this.w, this.height);
    ctx.closePath();
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }
}
