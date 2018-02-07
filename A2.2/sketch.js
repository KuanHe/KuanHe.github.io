function setup() {

  createCanvas(640, 360);
var radius = min(width, height) / 2; 
  secondsRadius = radius * 0.72;
  minutesRadius = radius * 0.60;
  hoursRadius = radius * 0.50;
  clockDiameter = radius * 1.8;

  cx = width / 2;
  cy = height / 2;
}

function draw() {
  background(0);

  // Draw the clock background
  fill(30);
  noStroke();
  ellipse(cx, cy, clockDiameter, clockDiameter);
  var s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
  var m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
  var h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;
  stroke(255);
  strokeWeight(2);
  line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);
  strokeWeight(2);
  line(cx, cy, cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius);
  strokeWeight(2);
  line(cx, cy, cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius);
}


