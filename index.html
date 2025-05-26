<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Face + Hand Detection</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.2/p5.js"></script>
    <script src="https://unpkg.com/ml5@0.12.2/dist/ml5.min.js"></script>
  </head>
  <body>
    <script>
      let video;
      let facemesh;
      let handpose;
      let facePredictions = [];
      let handPredictions = [];

      let circleTarget = "forehead";
      let facemeshReady = false;
      let handposeReady = false;

      function setup() {
        createCanvas(640, 480);
        video = createCapture(VIDEO);
        video.size(width, height);
        video.hide();

        facemesh = ml5.facemesh(video, () => {
          console.log("FaceMesh is ready!");
          facemeshReady = true;
        });
        facemesh.on("predict", (results) => {
          facePredictions = results;
        });

        handpose = ml5.handpose(video, () => {
          console.log("HandPose is ready!");
          handposeReady = true;
          handpose.detectStart(video, (results) => {
            handPredictions = results;
          });
        });
      }

      function draw() {
        image(video, 0, 0, width, height);

        // 若尚未載入模型則不處理
        if (!facemeshReady || !handposeReady) return;

        // 如果有手部並張開
        if (handPredictions.length > 0) {
          for (let hand of handPredictions) {
            if (hand.confidence > 0.5 && isHandOpen(hand)) {
              circleTarget = "nose";
              break;
            }
          }
        }

        // 畫紅色圓圈在臉上
        if (facePredictions.length > 0) {
          const keypoints = facePredictions[0].scaledMesh;
          let index = circleTarget === "forehead" ? 10 : 4;
          if (keypoints[index]) {
            const [x, y] = keypoints[index];
            noFill();
            stroke(255, 0, 0);
            strokeWeight(4);
            ellipse(x, y, 100, 100);
          }
        }
      }

      // 根據手的 keypoints 判斷是否張開
      function isHandOpen(hand) {
        const kp = hand.keypoints;
        if (!kp || kp.length < 21) return false;

        const thumbTip = kp.find((k) => k.name === "thumb_tip");
        const pinkyTip = kp.find((k) => k.name === "pinky_tip");

        if (!thumbTip || !pinkyTip) return false;

        const d = dist(thumbTip.x, thumbTip.y, pinkyTip.x, pinkyTip.y);
        return d > 100;
      }
    </script>
  </body>
</html>
