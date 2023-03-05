let cr = [];
let sq = [];
let tr = [];

function preload() {
  for (let i = 0; i < 100; i++) {
    let index = nf(i + 1, 4, 0);
    cr[i] = loadImage(`data/circle${index}.png`);
    sq[i] = loadImage(`data/square${index}.png`);
    tr[i] = loadImage(`data/triangle${index}.png`);
  }
}

let neuralNetworkClassifier;

function setup() {
  createCanvas(400, 400);

  let properties = {
    inputs: [64, 64, 4],
    task: 'imageClassification',
    debug: true
  };

  neuralNetworkClassifier = ml5.neuralNetwork(properties);

  for (let i = 0; i < cr.length; i++) {
    let input = {image: cr[i]};
    let target = {label: "circle"};
    neuralNetworkClassifier.addData(input, target);
  }
  for (let i = 0; i < sq.length; i++) {
    let input = {image: sq[i]};
    let target = {label: "square"};
    neuralNetworkClassifier.addData(input, target);
  }
  for (let i = 0; i < tr.length; i++) {
    let input = {image: tr[i]};
    let target = {label: "triangle"};
    neuralNetworkClassifier.addData(input, target);
  }

  neuralNetworkClassifier.normalizeData();
  
  neuralNetworkClassifier.train({ epochs: 50 }, endOfTraining);
}

function endOfTraining() {
  console.log('Training has been done successfully!');
  neuralNetworkClassifier.save();
}

    // neuralNetworkClassifier.addData({ image: cr[i] }, { label: 'circle' });
    // neuralNetworkClassifier.addData({ image: sq[i] }, { label: 'square' });
    // neuralNetworkClassifier.addData({ image: tr[i] }, { label: 'triangle' });