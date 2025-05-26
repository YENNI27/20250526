let video;
let handPose;
let hands = [];
let circleX, circleY;
let noseX, noseY;
let isHandOpenFlag = false;

function preload() {
  // Initialize HandPose model
  handPose = ml5.handPose({ flipped: true });
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // Start detecting hands
  handPose.detectStart(video, gotHands);

  // Set initial positions
  circleX = width / 2; // Forehead position
  circleY = height / 4;
  noseX = width / 2; // Nose position
  noseY = height / 3;

  // Debugging: Check initial positions
  console.log("Initial circle position:", circleX, circleY);
  console.log("Nose position:", noseX, noseY);
}

function draw() {
  image(video, 0, 0);

  // Draw the red circle
  fill(255, 0, 0);
  ellipse(circleX, circleY, 20);

  // Check if the hand is open
  if (isHandOpen()) {
    isHandOpenFlag = true;
  }

  // Debugging: Check if the hand is open and circle position
  console.log("isHandOpenFlag:", isHandOpenFlag);

  // Move the circle to the nose if the hand is open
  if (isHandOpenFlag) {
    circleX = noseX;
    circleY = noseY;
    console.log("Circle moved to nose position:", circleX, circleY);
  }

  // Draw hand keypoints for debugging
  drawHandKeypoints();
}

function gotHands(results) {
  hands = results;
  console.log("Hands data:", hands); // Debugging: Check hands data
}

function isHandOpen() {
  if (hands.length > 0) {
    const hand = hands[0]; // Use the first detected hand
    const keypoints = hand.keypoints;

    // Extract wrist and fingertip positions
    const wrist = keypoints.find(k => k.part === "wrist");
    const thumbTip = keypoints.find(k => k.part === "thumb_tip");
    const indexTip = keypoints.find(k => k.part === "index_finger_tip");
    const middleTip = keypoints.find(k => k.part === "middle_finger_tip");
    const ringTip = keypoints.find(k => k.part === "ring_finger_tip");
    const pinkyTip = keypoints.find(k => k.part === "pinky_tip");

    if (wrist && thumbTip && indexTip && middleTip && ringTip && pinkyTip) {
      const threshold = 50; // Adjust this threshold as needed
      const isOpen =
        dist(wrist.position.x, wrist.position.y, thumbTip.position.x, thumbTip.position.y) > threshold &&
        dist(wrist.position.x, wrist.position.y, indexTip.position.x, indexTip.position.y) > threshold &&
        dist(wrist.position.x, wrist.position.y, middleTip.position.x, middleTip.position.y) > threshold &&
        dist(wrist.position.x, wrist.position.y, ringTip.position.x, ringTip.position.y) > threshold &&
        dist(wrist.position.x, wrist.position.y, pinkyTip.position.x, pinkyTip.position.y) > threshold;

      console.log("Hand open status:", isOpen); // Debugging: Check hand open status
      return isOpen;
    }
  }
  return false;
}

function drawHandKeypoints() {
  for (let hand of hands) {
    if (hand.confidence > 0.1) {
      for (let i = 0; i < hand.keypoints.length; i++) {
        let keypoint = hand.keypoints[i];
        fill(0, 255, 0);
        noStroke();
        circle(keypoint.position.x, keypoint.position.y, 10);
      }
    }
  }
}
