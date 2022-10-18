# Flappy-Bird-Neuro-evolution
A flappy-bird bot that plays the game using machine learning(Neuroevolution).

## Description
The bot uses genetic algorithm(GA) to train the neural network(NN) which is called neuroevolution. In every generation or iteration, 500 birds are created, each bird having its own brain(NN). The NN takes inputs like bird's velocity, nearest distance from the pipe, etc and produces two outputs in our case.The bird jumps if one of the outputs is greater than the other. The genetic algorithm then calculates each bird's fitness and selects the best one.Now the selected bird's brain is slightly modified(weights and biases) using operations like crossover and mutation.In the next generation, this bird's brain is used to create other birds.Eventually after some generations, few birds start to play well.

## Demo
👉 Watch it <a href="https://kishorliv.github.io/js-experiments/FlappyBotML/index.html">here.</a>
<br>

<img src="https://github.com/kishorliv/Flappy-Bird-Neuro-evolution/blob/master/images/screenshots/flappyOne.png">
<img src="https://github.com/kishorliv/Flappy-Bird-Neuro-evolution/blob/master/images/screenshots/flappyTwo.png">

## Usage
Clone the source
```
git clone https://github.com/kishorliv/Flappy-Bird-Neuro-evolution.git
cd Flappy-Bird-Neuro-evolution
```
Open ```index.html``` in the browser.

## References
<a href="https://www.askforgametask.com/tutorial/machine-learning-algorithm-flappy-bird/">https://www.askforgametask.com/tutorial/machine-learning-algorithm-flappy-bird/</a>
<br>
<a href="https://threads-iiith.quora.com/Neuro-Evolution-with-Flappy-Bird-Genetic-Evolution-on-Neural-Networks">https://threads-iiith.quora.com/Neuro-Evolution-with-Flappy-Bird-Genetic-Evolution-on-Neural-Networks</a>
<br>
<a href="https://thecodingtrain.com/CodingChallenges/">https://thecodingtrain.com/CodingChallenges/</a>
