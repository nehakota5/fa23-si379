let mySound;
let fft;
let isSoundPlaying = false;

function setup() {
  createCanvas(windowWidth, windowHeight).parent("canvas-container");
  angleMode(DEGREES);
  fft = new p5.FFT();
  background(0, 0);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  const wave = fft.waveform();
  let prevX, prevY;

  for (let i = 0; i <= 360; i++) {
    const index = floor(map(i, 0, 360, 0, wave.length - 1));
    const r = map(wave[index], -1, 1, 150, 350);
    const x = r * cos(i);
    const y = r * sin(i);

    // Calculate a color gradient based on your request
    let gradientColor;
    if (i <= 90) {
      gradientColor = lerpColor(color(255), color(194, 30, 86), i / 90);
    } else if (i <= 180) {
      gradientColor = lerpColor(color(194, 30, 86), color(128, 0, 128), (i - 90) / 90);
    } else if (i <= 270) {
      gradientColor = lerpColor(color(128, 0, 128), color(255, 192, 203), (i - 180) / 90);
    } else {
      gradientColor = lerpColor(color(255, 192, 203), color(255), (i - 270) / 90);
    }

    stroke(gradientColor);
    strokeWeight(4);

    if (i > 0) {
      line(prevX, prevY, x, y);
    }

    prevX = x;
    prevY = y;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
  if (!mySound) {
    mySound = loadSound('moonriver.mp3', soundLoaded);
  }
  if (isSoundPlaying) {
    mySound.pause();
    noLoop();
    isSoundPlaying = false;
  } else {
    mySound.play();
    isSoundPlaying = true;
    loop();
  }
}

function soundLoaded() {
  console.log("Sound loaded!");
}


