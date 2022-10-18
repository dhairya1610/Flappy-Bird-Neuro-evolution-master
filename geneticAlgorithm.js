/**
 * TO generate(perform selection) next population based on fitness
 * @param  {Game} [Game object]
 * @return none
 */
function nextGeneration(gameObj) {
  //console.log('next generation');
  calculateFitness(gameObj);
  for (let i = 0; i < gameObj.TOTAL; i++) {
    gameObj.birds[i] = selection(gameObj);
  }
  gameObj.savedBirds = [];
}

/**
 * Selection of a bird(NN) based on its fitness value
 * @param  {Game} [Game object]
 * @return {[Bird]} [Returns a mutated bird]
 */
function selection(gameObj) {
  let index = 0;
  let r = Math.random();
  while (r > 0) {
    r = r - gameObj.savedBirds[index].fitness;
    index++;
  }
  index--;
  let bird = gameObj.savedBirds[index];
  let child = new Bird(bird.brain);
  child.mutate();
  return child;
}

/**
 * Calculate fitness by normalizing: each birds score/ total score of all birds
 * @param  {Game} [Game object]
 * @return none
 */
function calculateFitness(gameObj) {
  let sum = 0;
  for (let bird of gameObj.savedBirds) {
    sum += bird.score;
  }
  for (let bird of gameObj.savedBirds) {
    bird.fitness = bird.score / sum;
  }
}
