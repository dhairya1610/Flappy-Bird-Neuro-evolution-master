/**
 * Class that handles some basic matrix operations
 */
class Matrix{
  constructor(rows, cols){
    this.rows = rows;
    this.cols = cols;
    this.matrix = [];

    this._initZeros();
  }

  /**
   * Initialize new matrix with zeros
   * @return none
   */
  _initZeros(){
    //checking if rows and cols values are given or not in the constructor
    if(this.rows===undefined || this.cols===undefined){
      console.log('Error! Initialize Matrix with rows and cols number!');
      return undefined;
    }

    for(let i=0; i<this.rows;i++){
      this.matrix[i] = [];
      for(let j=0; j<this.cols; j++){
        this.matrix[i][j] = 0;
      }
    }
  }

  /**
   * Copies a matrix
   * @return {[Matrix]}
   */
  copy() {
    let m = new Matrix(this.rows, this.cols);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        m.matrix[i][j] = this.matrix[i][j];
      }
    }
    return m;
  }

  /**
   * Generate random values in a matrix
   * @param  {Number} [start=2]
   * @param  {Number} [end=-1]
   * @return none
   */
  randomize(start=-1, end=2){
    for(let i=0; i<this.rows;i++){
      for(let j=0; j<this.cols; j++){
        this.matrix[i][j] += Math.floor(Math.random() * end + start);
      }
    }
  }

  /**
   * Converts array into column vector
   * @param  {[array]} arr
   * @return {[Matrix]}
   */
  static fromArray(arr){
    let m = new Matrix(arr.length, 1);
    for(let i=0; i<arr.length; i++){
      m.matrix[i][0] = arr[i];
    }
    return m;
  }

  /**
   * Converts Matrix to array
   * @return {[array]}
   */
  toArray(){
    let arr = [];
    for(let i=0; i<this.rows;i++){
      for(let j=0; j<this.cols; j++){
        arr.push(this.matrix[i][j]);
      }
    }
    return arr;
  }

  /**
   * Addition of two matices
   * @param {[Matrix]} m1
   * @param {[Matrix]} m2
   * @return {[Matrix]}
   */
  static add(m1, m2){
    if(m1.rows !== m2.rows || m1.cols !== m2.cols){
      console.log('Error! Rows and cols number mismatch for matrix addition!');
      return undefined;
    }
    let resMat = new Matrix(m1.rows, m1.cols);

    for(let i=0; i<m1.rows;i++){
      for(let j=0; j<m1.cols; j++){
        resMat.matrix[i][j] = m1.matrix[i][j] + m2.matrix[i][j];
      }
    }
    return resMat;
  }

  /**
   * Scalar addition
   * @param {[Matrix or a number]} num
   * @return none
   */
  addScalar(num){
    for(let i=0; i<this.rows;i++){
      for(let j=0; j<this.cols; j++){
        this.matrix[i][j] += num;
      }
    }
  }

  /**
   * Multiplies two matrices
   * @param  {[Matrix]} m1
   * @param  {[Matrix]} m2
   * @return {[Matrix]}
   */
  static multiply(m1, m2){
    if(m1.cols !== m2.rows){
      console.log('Error! Rows and cols number mismatch for matrix multiplication!');
      return undefined;
    }
    let resMat = new Matrix(m1.rows, m2.cols);

    for(let i=0; i<resMat.rows; i++){
      for(let j=0; j<resMat.cols; j++){
        let sum = 0;
        for(let k=0; k<m1.cols; k++){
          sum += m1.matrix[i][k] * m2.matrix[k][j];
        }
        resMat.matrix[i][j] = sum;
      }
    }
    return resMat;
  }

  /**
   * Scalar multiplication
   * @param  {[number]} num
   * @return none
   */
  multiplyScalar(num){
    for(let i=0; i<this.rows;i++){
      for(let j=0; j<this.cols; j++){
        this.matrix[i][j] *= num;
      }
    }
  }

  /**
   * Transpose operation of a Matrix
   * @param  {[Matrix]} m1
   * @return {[Matrix]}
   */
  static transpose(m1){
    let resMat = new Matrix(m1.cols, m1.rows);
    for(let i=0; i<m1.rows; i++){
      for(let j=0; j<m1.cols; j++){
        resMat.matrix[j][i] = m1.matrix[i][j];
      }
    }
    return resMat;
  }

  /**
   * Transpose operation of this Matrix
   * @return {[Matrix object]}
   */
  transpose(){
    let resMat = new Matrix(this.cols, this.rows);
    for(let i=0; i<this.rows; i++){
      for(let j=0; j<this.cols; j++){
        resMat.matrix[j][i] = this.matrix[i][j];
      }
    }
    return resMat;
  }

  /**
   * Applies a function 'func' to this.matrix elements
   * @param  {[Function]} func
   * @return none
   */
  map(func){
    for(let i=0; i<this.rows;i++){
      for(let j=0; j<this.cols; j++){
        let arrVal = this.matrix[i][j]
        this.matrix[i][j] = func(arrVal);
      }
    }
  }

  /**
   * Displays matrix
   * @return none
   */
  display(){
    console.table(this.matrix);
  }


}
