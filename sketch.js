var t = 0;
let spins = 100;
let delta = 0.001;
let noiseDelta = 10;
let seed;
let hash;

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;
let DIM = Math.min(WIDTH, HEIGHT);
let BASEDIM = 2000;

function setup() {

  // canvas setup
  createCanvas(DIM, DIM);
  stroke(0, 120);
  noFill();
  background(0);
  translate(DIM/2, DIM/2);
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

function plan1(offsetPx) {
  return  [(DIM + offsetPx) * noise(t + noiseDelta) - offsetPx/2,
          DIM * noise(t + noiseDelta),
          DIM * noise(t + noiseDelta),
          (DIM + offsetPx) * noise(t + noiseDelta*100) - offsetPx/2,
          (DIM + offsetPx) * noise(t + noiseDelta*100) - offsetPx/2,
          DIM * noise(t + noiseDelta),
          DIM * noise(t + noiseDelta),
          (DIM + offsetPx) * noise(t + noiseDelta) - offsetPx/2];
}

function drawPlan() {
  spins = 2000;
  let offsetPx = DIM/BASEDIM * 300;
  if (drand(seed) > .95) {
    offsetPx = 3000 * DIM/BASEDIM;
  }
  for (let i = 0; i < spins; i++) { 
    plan = plan1(offsetPx);
    var r = 255 * noise(t + 10);
    var g = 255 * noise(t + 20);
    var b = 255 * noise(t + 102);
    stroke(r, g, b, 20);
    strokeWeight(2*DIM/BASEDIM);
    bezier(plan[0], plan[4], plan[1], plan[5], plan[2], plan[6], plan[3], plan[7]);
    t += delta;
  }
}


function draw() {
  drawPlan();
//  drawPlan();
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