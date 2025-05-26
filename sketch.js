let video;
let facemesh;
let facePredictions = [];

let handPose;
let handPredictions = [];

let circleTarget = 'forehead'; // 初始目標位置

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, { flipped: true });
  video.size(width, height);
  video.hide();

  // 啟動 facemesh
  facemesh = ml5.facemesh(video, () => {
    console.log("FaceMesh ready");
  });
  facemesh.on("predict", results => {
    facePredictions = results;
  });

  // 啟動 handpose
  handPose = ml5.handPose({ flipped: true }, () => {
    console.log("HandPose ready");
    handPose.detectStart(video, gotHands);
  });
}

function gotHands(results) {
  handPredictions = results;
}

function draw() {
  image(video, 0, 0, width, height);

  // 判斷手掌是否張開
  if (handPredictions.length > 0) {
    for (let hand of handPredictions) {
      if (hand.confidence > 0.5 && isHandOpen(hand)) {
        circleTarget = 'nose'; // 張開手，移到鼻子
        break;
      }
    }
  }

  // 根據目標畫紅圈（額頭 or 鼻子）
  if (facePredictions.length > 0) {
    const keypoints = facePredictions[0].scaledMesh;
    let index = circleTarget === 'forehead' ? 10 : 4;
    const [x, y] = keypoints[index];

    noFill();
    stroke(255, 0, 0);
    strokeWeight(4);
    ellipse(x, y, 100, 100);
  }
}

// 判斷手是否張開（拇指和小指距離遠）
function isHandOpen(hand) {
  const landmarks = hand.landmarks;
  if (!landmarks || landmarks.length < 21) return false;

  const thumbTip = landmarks[4];   // 拇指尖端
  const pinkyTip = landmarks[20];  // 小指尖端

  const d = dist(thumbTip[0], thumbTip[1], pinkyTip[0], pinkyTip[1]);
  return d > 100; // 如果距離超過100，判定為張開手掌
}

