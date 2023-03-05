let neuronNetworkClassifier;
let canvas;
let resultsDiv;
let inputImage;
let clearBtn;

function setup() {
  pixelDensity(1);
  canvas = createCanvas(400, 400);
  let properties = {
    inputs: [64, 64, 4],
    task: 'imageClassification'
  };
  neuronNetworkClassifier = ml5.neuralNetwork(properties);
  
  const model = {
    model: 'model/model.json',
    metadata: 'model/model_meta.json',
    weights: 'model/model.weights.bin'
  };
  
  background(255);
  clearBtn = createButton('clear');
  clearBtn.mousePressed(function() {
    background(255);
  });
  resultsDiv = createDiv('loading model');
  inputImage = createGraphics(64, 64);
  neuronNetworkClassifier.load(model, modelLoaded);
}

function modelLoaded() {
  console.log('You can start drawing..');
  shapeClassifier();
}

function shapeClassifier() {
  inputImage.copy(canvas, 0, 0, 400, 400, 0, 0, 64, 64);
  neuronNetworkClassifier.classify(
    {
      image: inputImage
    },
    gotResults
  );
}

function gotResults(err, results) {
  if (err) {
    console.error(err);
    return;
  }

  let label = results[0].label;
  let confidence = nf(100 * results[0].confidence, 2, 0);

  resultsDiv.html(`${label} ${confidence}%`);

  shapeClassifier();
}

function draw() {
  if (mouseIsPressed) {
    strokeWeight(8);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}