var t = 0;
let delta = 0.001;
let noiseDelta = 1;
let seed;
let hash;

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;
let DIM = Math.min(WIDTH, HEIGHT);
let BASEDIM = 2000;

function setup() {

  // canvas setup
  createCanvas(DIM, DIM);
  noFill();
  stroke(255);
  strokeWeight(2*DIM/BASEDIM);
  background(0);
  noLoop();
  
  // entropy
  hash = random_hash();
  seed = parseInt(hash.slice(0, 16), 16);
  noiseSeed(seed);
  noiseDelta = 100 * drand(seed);
}

// deterministic random function
function drand(seed) {
    seed ^= seed << 13;
    seed ^= seed >> 17;
    seed ^= seed << 5;
    return ((seed < 0 ? ~seed + 1 : seed) % 1000) / 1000
  }

function plan0(offsetPx) {
  return  [(DIM + offsetPx) * noise(t + noiseDelta) - offsetPx/2,
          DIM * noise(t + noiseDelta),
          DIM * noise(t + noiseDelta),
          (DIM + offsetPx) * noise(t + noiseDelta*300) - offsetPx/2,
          (DIM + offsetPx) * noise(t + noiseDelta*300) - offsetPx/2,
          DIM * noise(t + noiseDelta),
          DIM * noise(t + noiseDelta),
          (DIM + offsetPx) * noise(t + noiseDelta) - offsetPx/2];
}

function plan1(offsetPx) {
  return  [-DIM/2, 0,
          -DIM/2 * noise(t + noiseDelta), DIM * noise(t + noiseDelta*300) - DIM/2,
          DIM/2 * noise(t + noiseDelta), DIM * noise(t + noiseDelta*300) - DIM/2,
          DIM/2, 0];
}

function drawPlan(spins=10) {
  
  push();
  fill(255);
  circle(-DIM/2, 0, 5, 5);
  circle(DIM/2, 0, 5, 5);
  pop();
  
  //  bezier(-DIM/2, 0, -DIM/2, -100, DIM/2, -100, DIM/2, 0);
  for (let i = 0; i < spins; i++) {
    var r = 255 * noise(t+noiseDelta*1000);
    var g = 255 * noise(t+noiseDelta*20);
    var b = 255 * noise(t+noiseDelta*120);
    stroke(r, g, b, 40);
    let [x1, y1, x2, y2, x3, y3, x4, y4] = plan1(300);
    bezier(x1, y1, x2, y2, x3, y3, x4, y4);
    t += delta;
  }
}

function draw() {
  // center
  translate(DIM/2, DIM/2);

  // draw
  drawPlan(spins=1000); 

  rotate(PI/4);
  drawPlan(spins=1000); 
  rotate(PI/4);
  drawPlan(spins=1000); 
  rotate(PI/4);
  drawPlan(spins=1000); 
  rotate(PI/4);
  drawPlan(spins=1000); 

}

function keyTyped() {
  if (key === 's') {
    save();
  }
}

// example function for hash
function random_hash() {
  let chars = "0123456789abcdef";
  let result = '0x';
  for (let i = 64; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}