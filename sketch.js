let video;
let handpose;
let predictions = [];
let noseX = 0;
let noseY = 0;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // Load the handpose model
  handpose = ml5.handpose(video, modelReady);

  // Listen for handpose predictions
  handpose.on("predict", results => {
    predictions = results;
  });

  // Set a fixed nose position (for simplicity)
  noseX = width / 2;
  noseY = height / 3;
}

function modelReady() {
  console.log("Handpose model ready!");
}

function draw() {
  image(video, 0, 0, width, height);

  // Draw the nose position
  fill(0, 255, 0);
  ellipse(noseX, noseY, 20);

  // Check if the hand is open
  if (isHandOpen()) {
    // Draw a red circle on the nose
    fill(255, 0, 0);
    ellipse(noseX, noseY, 20);
  }

  // Draw hand keypoints for debugging
  drawHandKeypoints();
}

function isHandOpen() {
  if (predictions.length > 0) {
    const hand = predictions[0];
    const landmarks = hand.landmarks;

    // Calculate distances between the wrist and fingertips
    const wrist = landmarks[0];
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    const middleTip = landmarks[12];
    const ringTip = landmarks[16];
    const pinkyTip = landmarks[20];

    const threshold = 50; // Adjust this threshold as needed
    return (
      dist(wrist[0], wrist[1], thumbTip[0], thumbTip[1]) > threshold &&
      dist(wrist[0], wrist[1], indexTip[0], indexTip[1]) > threshold &&
      dist(wrist[0], wrist[1], middleTip[0], middleTip[1]) > threshold &&
      dist(wrist[0], wrist[1], ringTip[0], ringTip[1]) > threshold &&
      dist(wrist[0], wrist[1], pinkyTip[0], pinkyTip[1]) > threshold
    );
  }
  return false;
}

function drawHandKeypoints() {
  for (let i = 0; i < predictions.length; i++) {
    const hand = predictions[i];
    const landmarks = hand.landmarks;

    for (let j = 0; j < landmarks.length; j++) {
      const [x, y, z] = landmarks[j];
      fill(0, 0, 255);
      noStroke();
      ellipse(x, y, 10);
    }
  }
}
