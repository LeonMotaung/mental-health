const tf = require('@tensorflow/tfjs-node');  // Import TensorFlow.js for Node.js

// Sample training data (one-hot encoded features)
const inputs = [
    // Hobby (Reading, Working Out, Videogames, Listening to Music, Poetry, Painting, Crocheting)
    [1, 0, 0, 0, 0, 0, 0],  // Reading
    [0, 1, 0, 0, 0, 0, 0],  // Working Out
    [0, 0, 1, 0, 0, 0, 0],  // Videogames
    [0, 0, 0, 1, 0, 0, 0],  // Listening to Music
    [0, 0, 0, 0, 1, 0, 0],  // Poetry
    [0, 0, 0, 0, 0, 1, 0],  // Painting
    [0, 0, 0, 0, 0, 0, 1],  // Crocheting

    // Personality (Introvert, Extrovert, Ambivert)
    [1, 0, 0],  // Introvert
    [0, 1, 0],  // Extrovert
    [0, 0, 1],  // Ambivert
];

// Labels (output groups as one-hot encoded values for each group)
const labels = [
    [1, 0, 0, 0, 0],  // Knowledge Seekers (Bookworms)
    [0, 1, 0, 0, 0],  // Fitness Enthusiasts (Gymworms)
    [0, 0, 1, 0, 0],  // Music Lovers (Music Enthusiasts)
    [0, 0, 0, 1, 0],  // Tech Innovators (Geeks)
    [0, 0, 0, 0, 1],  // Creative Minds (Artists)
];

// Convert data to tensors
const xs = tf.tensor2d(inputs);  // Input tensor (features)
const ys = tf.tensor2d(labels);  // Output tensor (labels)

// Define a simple neural network model
const model = tf.sequential();

// First hidden layer with 64 units
model.add(tf.layers.dense({
    units: 64,
    activation: 'relu',
    inputShape: [inputs[0].length],  // Number of input features
}));

// Output layer with 5 units (for 5 classes)
model.add(tf.layers.dense({
    units: 5,  // 5 output classes (groups)
    activation: 'softmax',  // Softmax for multi-class classification
}));

// Compile the model
model.compile({
    loss: 'categoricalCrossentropy',  // Loss function for multi-class classification
    optimizer: 'adam',  // Optimizer to minimize the loss
    metrics: ['accuracy'],  // Evaluation metrics
});

// Train the model
async function trainModel() {
    console.log("Training started...");
    
    // Train the model for 100 epochs
    await model.fit(xs, ys, {
        epochs: 100,
        batchSize: 4,  // Number of samples per batch
        callbacks: {
            onEpochEnd: async (epoch, log) => {
                console.log(`Epoch: ${epoch}, Loss: ${log.loss}, Accuracy: ${log.acc}`);
            },
        },
    });
    
    console.log("Training complete.");
    
    // Save the model to a file
    await model.save('file://model');  // Save model in the current directory
    console.log("Model saved!");
}

// Run the training function
trainModel();
