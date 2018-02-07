function setup() {
  createCanvas(300, 300);
}

function draw() {
  background('yellow');
  fill(255, 204, 0);

  rect(40, 40, 60, map(second(), 0, 60, 0, 100));

  push(); 
  scale(second(), second()); 
  ellipse( map(second(), 0, 60, 0, 10),  map(second(), 0, 60, 0, 10),  map(second(), 0, 60, 0, 10), map(second(), 0, 60, 0, 10));
  pop(); 
  angleMode(DEGREES);
  rotate(map(minute(), 0, 60, 0, 360));
  }
