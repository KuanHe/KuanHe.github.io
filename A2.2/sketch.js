var x1 = 150;
var y1 = 20;
var x2 = 150;
var y2 = 20
var x3 = 200;
var y3 = 70;
var x4 = 200;
var y4 = 70
var x3 = 200;
var y3 = 70;
var x4 = 200;
var y4 = 70

function setup(){
  createCanvas(900,900);
}

function draw(){
  noStroke();
  background(100);
  var s = second()/5;
  var m = minute()/5;
  var h = hour()/5;

  fill(255,0,0,150) // green
  rect(x1,y1,x2,20*map(s, 0, 60, 0,400));
  fill(255,255,0,150) // yellow
  rect(x3,y3,20*map(s, 0, 60, 0,400),10*map(s, 0, 60, 0,400));
  fill(0,0,255,150) // blue
  rect(2*x3,2*y3,2*x4,5*map(s, 0, 60, 0,400));
}

