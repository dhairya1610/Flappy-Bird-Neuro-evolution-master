// canvas height and width
const WIDTH = 600;
const HEIGHT = 400;

const FPS = 30;

class Game{
  constructor(){
    this.TOTAL = 5000; // number of birds(NN)
    this.savedBirds = [];
    this.birds = [];
    this.pipes = [];
    this.counter = 0; // to adjust the spacing between incoming pipes
    this.cycles = 1; //increase this value to increase the training or execution speed

    this.containerDiv;
    this.statsContainer;
    this.sliderContainer;
    this.statsDiv;
    this.table;
    this.canvas;
    this.ctx;
    this.table;
    this.slider;
    this.downloadJsonBtn;

    this.score = 0;
    this.noOfGenerations = 0;

    this.createCanvas();
    this.setup();
    this.createSlider();
    this.createStats();

    this.draw = this.draw.bind(this);
    this.init = this.init.bind(this);
    this.displayScore = this.displayScore.bind(this);

  }

  downloadJson(content, fileName, contentType) {
    console.log(content);
    content = JSON.stringify(content);
    console.log(content);

    let a = document.createElement("a");
    let file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }


  createCanvas(){
    this.containerDiv = document.createElement('div');
    document.body.appendChild(this.containerDiv);
    this.containerDiv.style.marginBottom = '20px';
    this.containerDiv.style.backgroundColor = '#edece8';
    this.containerDiv.style.paddingBottom = '10px';

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.containerDiv.appendChild(this.canvas);
    this.canvas.width = WIDTH;
    this.canvas.height = HEIGHT;
    this.canvas.style.display = 'block';
    this.canvas.style.margin = '0 auto';
    this.canvas.style.paddingTop = '10px';
  }

  createSlider(){
    this.sliderContainer = document.createElement('div');
    this.sliderContainer.setAttribute('class','slidecontainer');
    this.sliderContainer.style.width = WIDTH+'px';
    this.sliderContainer.style.marginTop = '10px';
    this.containerDiv.appendChild(this.sliderContainer);
    this.slider = document.createElement('input');
    this.sliderContainer.appendChild(this.slider);
    this.slider.setAttribute('class','slider');
    this.slider.type = 'range';
    this.slider.min = 1;
    this.slider.max = 30;
    this.slider.value = 1;

    let self = this;
    this.slider.oninput = function() {
      self.cycles = this.value;
    }
  }

  createStats(){
    this.statsContainer = document.createElement('div');
    this.containerDiv.appendChild(this.statsContainer);
    this.statsContainer.style.width = WIDTH + 'px';
    this.statsContainer.style.margin = '0 auto';
    this.statsContainer.style.marginTop = '10px';
    this.statsContainer.style.backgroundColor = '#edece8';

    this.statsBtn = document.createElement('button');
    this.statsContainer.appendChild(this.statsBtn);
    this.statsBtn.appendChild(document.createTextNode("View Stats"));

    this.statsDiv = document.createElement("stats-div");
    this.statsContainer.appendChild(this.statsDiv);
    this.statsDiv.style.display = 'none';

    let self = this;
    this.statsBtn.onclick = function(){
      if (self.statsDiv.style.display === 'none') {
        self.statsDiv.style.display = 'block';
        self.statsDiv.style.backgroundColor = '#8ac5c3';
        self.statsDiv.style.color = '#ffffff';
      } else {
        self.statsDiv.style.display = 'none';
      }
    };
    this.table = document.createElement('table');
    this.table.setAttribute('id','stat-table');
    this.statsDiv.appendChild(this.table);

    this.downloadJsonBtn = document.createElement('button');
    this.downloadJsonBtn.setAttribute('id', 'json-download');
    this.statsDiv.appendChild(this.downloadJsonBtn);
    this.downloadJsonBtn.appendChild(document.createTextNode("Download JSON"));

    this.jsonData = this.birds[0];
    self = this;
    this.downloadJsonBtn.addEventListener('click', function(){
      self.downloadJson(self.jsonData, 'bird_json.json', 'text/plain');
    });

    this.scoreRow;
    this.generationRow;
    this.fitnessRow;
    let tempCol1 = this.createRow(this.scoreRow, 'Score : ');
    this.updateScoreStat(this, tempCol1);
    let tempCol2 = this.createRow(this.generationRow, 'No Of Generations : ');
    this.updateGenerationStat(this, tempCol2);
  }

  createRow(row, col1Val){
    row = this.table.insertRow();
    let col1 = row.insertCell();
    let col2 = row.insertCell();
    col1.innerHTML = col1Val;
    return col2;
  }

  updateScoreStat(ref, col){
    setInterval(function(){
      col.innerHTML = ref.score;
    },FPS);;
  }

  updateGenerationStat(ref, col){
    setInterval(function(){
      col.innerHTML = ref.noOfGenerations;
    },FPS);;
  }

  displayScore(){
    this.ctx.beginPath();
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '25px sans-serif';
    this.ctx.fillText('Score : '+this.score,10,30);
    this.ctx.closePath();
  }

  play(){
    if(Game.imgLoaded){this.init();return;}
    preloader(this.init, allImages);
  }

  init(){
    setInterval(this.draw, FPS);
  }

  setup(){
    for (let i = 0; i < this.TOTAL; i++) {
      this.birds[i] = new Bird();
    }
  }

  draw(){
    this.ctx.clearRect(0, 0, WIDTH, HEIGHT);//clearing the canvas


    for (let n = 0; n < this.cycles; n++) {
      if (this.counter % 75 == 0) {
        this.pipes.push(new Pipe(this));
      }
      this.counter++;

      for (let i = this.pipes.length - 1; i >= 0; i--) {
        this.pipes[i].update();


        for (let j = this.birds.length - 1; j >= 0; j--) {
          if (this.pipes[i].collides(this.birds[j])) {
            this.savedBirds.push(this.birds.splice(j, 1)[0]);
          }
        }

        if (this.pipes[i].offscreen()) {
          this.pipes.splice(i, 1);
          this.score++;
          //console.log(this.score);
        }
      }

      for (let i = this.birds.length - 1; i >= 0; i--) {
        if (this.birds[i].offScreen()) {
          this.savedBirds.push(this.birds.splice(i, 1)[0]);
        }
      }

      for (let bird of this.birds) {
        bird.think(this.pipes);
        bird.update();
      }

      if (this.birds.length === 0) {
        this.counter = 0;
        nextGeneration(this);
        this.noOfGenerations++;
        this.pipes = [];
        this.score = 0;
      }
    }

    // All the drawing

    this.bgImg = new Image();
    this.bgImg.src = 'images/bg.png';
    this.ctx.drawImage(this.bgImg, 0, 0, WIDTH, HEIGHT);

    for (let bird of this.birds) {
      bird.show(this.ctx);
    }

    for (let pipe of this.pipes) {
      pipe.show(this.ctx);
    }

    this.displayScore();
  }

}
// static property
// signifies if preloader has been called once
Game.imgLoaded = false;
