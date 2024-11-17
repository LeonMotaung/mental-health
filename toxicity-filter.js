const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

// Load the saved model
async function loadModel() {
  return await tf.loadLayersModel('file://model/toxicity-model/model.json');
}

// Function to preprocess the text (tokenization and removal of stopwords)
const stopwords = ['the', 'and', 'a', 'of', 'to', 'in', 'on', 'with', 'is', 'for'];

function preprocessText(text) {
  let tokens = text.toLowerCase().split(' ');
  tokens = tokens.filter(word => !stopwords.includes(word));
  return tokens.join(' ');
}

// Function to classify the text
async function predictToxicity(message) {
  const model = await loadModel();
  const preprocessedMessage = preprocessText(message);
  const sequence = preprocessedMessage.split(' ').map(word => wordIndex[word] || 0);
  const inputTensor = tf.tensor2d([sequence], [1, 50]);

  const prediction = model.predict(inputTensor);
  const isToxic = prediction.dataSync()[0] > 0.5;
  return isToxic;
}

module.exports = { predictToxicity };
