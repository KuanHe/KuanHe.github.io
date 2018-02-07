function setup() {
  createCanvas(640, 480);
}

function draw() {
	//see https://p5js.org/reference/#/p5/background
 background(255, 204, 0);
 //see https://p5js.org/reference/#/p5/fill
 colorMode(HSB);
fill(205, 105, 100);
rect(20, 20, 60, 60);
 //see https://p5js.org/reference/#/p5/ellipse
 ellipse(56, 46, 55, 55);
 //see https://p5js.org/reference/#/p5/text
 var s = 'Kuan says hi';
fill(90);
text(s, 10, 10, 70, 80);
}
