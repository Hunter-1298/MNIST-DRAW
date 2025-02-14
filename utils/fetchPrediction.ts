import * as ort from 'onnxruntime-web';
import { Tensor, InferenceSession } from "onnxruntime-web";

// Softmax function
const softmax = (logits: number[]): number[] => {
  const maxLogit = Math.max(...logits);  // To prevent overflow
  const expValues = logits.map((logit) => Math.exp(logit - maxLogit));
  const sumExpValues = expValues.reduce((acc, val) => acc + val, 0);
  return expValues.map((expValue) => expValue / sumExpValues);  // Normalize
};

const fetchPrediction = async (data: number[]) => {
  console.log('Inside of the prediction file', data);

  // Create a new inference session for each prediction
  const session = await InferenceSession.create(
    "/mnist-12.onnx",
    {
      executionProviders: ["webgl"],
    }
  );

  // Log the model's input names (to verify it's correct)
  const inputNames = session.inputNames;
  console.log('Model Input Names:', inputNames);

  // Ensure that input data is normalized properly
  const scaledData = data.map(pixel => pixel / 255.0);  // Normalize pixel values to [0, 1]
  const tensor = new ort.Tensor('float32', scaledData, [1, 1, 28, 28]);  // 28x28 grayscale image
  console.log("Tensor:", tensor);

  // Prepare the feeds with the correct input name
  const feeds = {
    "Input3": tensor, // Make sure 'Input3' is the correct input name
  };
  console.log("Feeds:", feeds);

  // Run inference
  const outputMap = await session.run(feeds);
  console.log('Model Output:', outputMap);

  // Access the output tensor
  const outputTensor = outputMap['Plus214_Output_0'];
  console.log('Output Tensor:', outputTensor);

  // Extract probabilities from the tensor's data
  const logits = Array.from(outputTensor.data as Float32Array);  // Explicitly type as Float32Array
  console.log('Logits:', logits);

  // Apply softmax to logits to get probabilities
  const probabilities = softmax(logits);
  console.log('Probabilities:', probabilities);

  // Return the softmaxed probabilities
  return probabilities;
};

export default fetchPrediction;
