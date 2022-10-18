// Some Math functions
function sigmoid(x){
  return 1/(1+Math.exp(-x));
}

function gaussianRand() {
  let rand = 0;
  for (let i = 0; i < 6; i += 1) {
    rand += Math.random();
  }
  return rand / 6;
}

/**
 * Neural Network class. Implements Matrix operations in methods to create NN.
 */
class NeuralNetwork {
  // a, b, c are either Matrix obects or no of nodes in each layer
  constructor(a, b, c){
    if(a instanceof NeuralNetwork){
      this.noOfInputNodes = a.noOfInputNodes;
      this.noOfHiddenNodes = a.noOfHiddenNodes;
      this.noOfOutputNodes = a.noOfOutputNodes;

      this.weightsItoH = a.weightsItoH.copy();
      this.weightsHtoO = a.weightsHtoO.copy();

      this.biasH = a.biasH.copy();
      this.biasO = a.biasO.copy();
    }else{
      this.noOfInputNodes = a;
      this.noOfHiddenNodes = b;
      this.noOfOutputNodes = c;

      this.weightsItoH = new Matrix(this.noOfHiddenNodes, this.noOfInputNodes);  //inputs to hidden layer weights
      this.weightsHtoO = new Matrix(this.noOfOutputNodes, this.noOfHiddenNodes);
      this.weightsItoH.randomize();
      this.weightsHtoO.randomize();

      this.biasH = new Matrix(this.noOfHiddenNodes, 1);
      this.biasO = new Matrix(this.noOfOutputNodes, 1);
      this.biasH.randomize();
      this.biasO.randomize();
    }

  }

  /**
   * Creates NN(layers, sets weights and biases) based on inputs
   * @param  {[array]} input_array
   * @return {[array]}
   */
  predict(input_array) {

    let inputs = Matrix.fromArray(input_array);

    let hidden = Matrix.multiply(this.weightsItoH, inputs);
    hidden = Matrix.add(this.biasH, hidden);
    hidden.map(sigmoid);

    let output = Matrix.multiply(this.weightsHtoO, hidden);
    output = Matrix.add(this.biasO, output);
    output.map(sigmoid);

    return output.toArray();
  }

  /**
   * Copies this NN if NeuralNetwork object is passed in a constructor
   * @return {[NeuralNetwork]}
   */
  copy() {
    return new NeuralNetwork(this);
  }

  /**
   * Applies mutation(tweaks weights and biases by the rate) to the NeuralNetwork
   * @param  {[number]} rate [Amount by which mutation is done(Range: 0-1)]
   * @return none
   */
  mutate(rate) {
    function mutate(val) {
      if (Math.random() < rate) {
        // return 2 * Math.random() - 1;
        return val + gaussianRand()/10;
      } else {
        return val;
      }
    }
    this.weightsItoH.map(mutate);
    this.weightsHtoO.map(mutate);
    this.biasH.map(mutate);
    this.biasO.map(mutate);
  }

}
