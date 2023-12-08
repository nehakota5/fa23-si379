let song;
let fft;
let img;
let particles = [];
let amp;
let volumeSlider;

function preload() {
  song = loadSound('hans.mp3');
  img = loadImage('cool.jpeg');
}

let playPauseButtonX;
let playPauseButtonY;
let playPauseButtonWidth = 100;
let playPauseButtonHeight = 50;
let isPlaying = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  imageMode(CENTER);
  fft = new p5.FFT();
  img.filter(BLUR, 3);

  // Select the volume slider from the DOM
  // volumeSlider = document.querySelector('input[type="range"]');
  // // Add an event listener to the volume slider to adjust the volume
  // volumeSlider.addEventListener('input', setVolume);

  const volumeSlider = document.querySelector('input[type="range"]');
  const progressBar = document.querySelector('progress');

  // Add an event listener to the volume slider for input events
  volumeSlider.addEventListener('input', function(event) {
    // Update the progress bar's value to match the volume slider's value
    progressBar.value = event.target.value;
    const volume = map(volumeSlider.value, 0, 100, 0, 1); // Map the slider's value to the volume range (0-1)
    song.setVolume(volume);
    
  });

}

function setVolume() {
  // Map the range of the slider (0-100) to the volume range (0-1)
  const volume = map(volumeSlider.value, 0, 100, 0, 1);
  // Set the volume of the song
  song.setVolume(volume);
}

function draw() {
  background(0);
  image(img, width / 2, height / 2, width, height);

  push();
  translate(width / 2, (height / 2)-50);


  stroke(255);
  noFill();

  fft.analyze();
  amp = fft.getEnergy(20, 200);
  
  //push();
  if (amp > 200) {
    rotate(random(-0.5, 0.5));
  }
  
  //pop();

  const wave = fft.waveform();

  strokeWeight(8);

  for (let t = -1; t <= 1; t += 2) {
    beginShape();
    for (let i = 0; i <= 180; i += 0.5) {
      const index = floor(map(i, 0, 180, 0, wave.length - 1));
      const r = map(wave[index], -1, 1, 150, 350);
      const x = r * sin(i) * t;
      const y = r * cos(i);
      vertex(x, y);
    }
    endShape();
  }

  beginShape();
  for (let i = 0; i <= 180; i++) {
    const index = floor(map(i, 0, 180, 0, wave.length - 1));
    const r = map(wave[index], -1, 1, 150, 350);
    const x = r * -sin(i);
    const y = r * -cos(i);
    vertex(x, y);
  }
  endShape();
  

  const p = new Particle();
  particles.push(p);

  for (let i = particles.length - 1; i >= 0; i--) {
    if (!particles[i].edges()) {
      particles[i].update(amp > 230);
      particles[i].show();
    } else {
      particles.splice(i, 1);
    }
  }
  pop();
  fill(255);
  rect(playPauseButtonX, playPauseButtonY, playPauseButtonWidth, playPauseButtonHeight);

  // Add a 'Play / Pause' label in the button
  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(isPlaying ? 'Pause' : 'Play', playPauseButtonX + playPauseButtonWidth / 2, playPauseButtonY + playPauseButtonHeight / 2);

}

function mouseClicked() {
  // Trigger play/pause only when clicking inside the play/pause button
  const isInPlayPauseButton = mouseX > playPauseButtonX && mouseX < playPauseButtonX + playPauseButtonWidth &&
    mouseY > playPauseButtonY && mouseY < playPauseButtonY + playPauseButtonHeight;

  if (isInPlayPauseButton) {
    togglePlayPause();
  }
}

function togglePlayPause() {
  if (isPlaying) {
    song.pause();
    noLoop();
  } else {
    song.play();
    loop();
  }
  isPlaying = !isPlaying;
}

class Particle {
  constructor() {
    this.pos = p5.Vector.random2D().mult(250);
    this.vel = createVector(0, 0);
    this.acc = this.pos.copy().mult(random(0.0001, 0.00001));

    this.w = random(3, 5);

    this.color = [random(200, 255), random(200, 255), random(200, 255)];
  }

  update(cond) {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    if (cond) {
      this.pos.add(this.vel);
      this.pos.add(this.vel);
      this.pos.add(this.vel);
    }
  }

  edges() {
    return (
      this.pos.x < -width / 2 ||
      this.pos.x > width / 2 ||
      this.pos.y < -height / 2 ||
      this.pos.y > height / 2
    );
  }

  show() {
    noStroke();
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.w);
  }
}







// let song;
// let fft;
// let img;
// let particles = [];
// let amp;

// function preload() {
//   song = loadSound('hans.mp3');
//   img = loadImage('cool.jpeg');
// }

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   angleMode(DEGREES);
//   imageMode(CENTER);
//   fft = new p5.FFT();
//   img.filter(BLUR, 3);

//   // Select the volume slider from the DOM
//   // volumeSlider = document.querySelector('input[type="range"]');
//   // // Add an event listener to the volume slider to adjust the volume
//   // volumeSlider.addEventListener('input', setVolume);

//   const volumeSlider = document.querySelector('input[type="range"]');
//   const progressBar = document.querySelector('progress');

//   // Add an event listener to the volume slider for input events
//   volumeSlider.addEventListener('input', function(event) {
//     // Update the progress bar's value to match the volume slider's value
//     progressBar.value = event.target.value;
//     const volume = map(volumeSlider.value, 0, 100, 0, 1); // Map the slider's value to the volume range (0-1)
//     song.setVolume(volume);
    
//   });

// }

// function setVolume() {
//   // Map the range of the slider (0-100) to the volume range (0-1)
//   const volume = map(volumeSlider.value, 0, 100, 0, 1);
//   // Set the volume of the song
//   song.setVolume(volume);
// }

// function draw() {
//   background(0);
//   stroke(255);
//   noFill();

//   translate(width / 2, height / 2);

//   push();
//   if (amp > 200) {
//     rotate(random(-0.5, 0.5));
//   }
//   image(img, 0, 0, width, height);
//   pop();

//   fft.analyze();
//   amp = fft.getEnergy(20, 200);

//   const wave = fft.waveform();

//   strokeWeight(4);

//   for (let t = -1; t <= 1; t += 2) {
//     beginShape();
//     for (let i = 0; i <= 180; i += 0.5) {
//       const index = floor(map(i, 0, 180, 0, wave.length - 1));
//       const r = map(wave[index], -1, 1, 150, 350);
//       const x = r * sin(i) * t;
//       const y = r * cos(i);
//       vertex(x, y);
//     }
//     endShape();
//   }

//   beginShape();
//   for (let i = 0; i <= 180; i++) {
//     const index = floor(map(i, 0, 180, 0, wave.length - 1));
//     const r = map(wave[index], -1, 1, 150, 350);
//     const x = r * -sin(i);
//     const y = r * -cos(i);
//     vertex(x, y);
//   }
//   endShape();

//   const p = new Particle();
//   particles.push(p);

//   for (let i = particles.length - 1; i >= 0; i--) {
//     if (!particles[i].edges()) {
//       particles[i].update(amp > 230);
//       particles[i].show();
//     } else {
//       particles.splice(i, 1);
//     }
//   }

// }



// function mouseClicked() {
//   if (song.isPlaying()) {
//     song.pause();
//     noLoop();
//   } else {
//     song.play();
//     loop();
//   }
// }

// class Particle {
//   constructor() {
//     this.pos = p5.Vector.random2D().mult(250);
//     this.vel = createVector(0, 0);
//     this.acc = this.pos.copy().mult(random(0.0001, 0.00001));

//     this.w = random(3, 5);

//     this.color = [random(200, 255), random(200, 255), random(200, 255)];
//   }

//   update(cond) {
//     this.vel.add(this.acc);
//     this.pos.add(this.vel);
//     if (cond) {
//       this.pos.add(this.vel);
//       this.pos.add(this.vel);
//       this.pos.add(this.vel);
//     }
//   }

//   edges() {
//     return (
//       this.pos.x < -width / 2 ||
//       this.pos.x > width / 2 ||
//       this.pos.y < -height / 2 ||
//       this.pos.y > height / 2
//     );
//   }

//   show() {
//     noStroke();
//     fill(255);
//     ellipse(this.pos.x, this.pos.y, this.w);
//   }
// }














