var x1 = 150;
var y1 = 70;
var x2 = 150;
var y2 = 70
var x3 = 200;
var y3 = 100;
var x4 = 200;
var y4 = 100

function setup(){
  createCanvas(600,600);
}

function draw(){
  noStroke();
  background(200);

  var s = second();
  var m = minute();
  var h = hour();

  fill(255,255,0,150) 
  rect(2*x3,2*y3,-10*map(s, 0, 60,0, 40),10*map(s, 0, 60,0, 40));
  fill(0,0,255,150)  
  rect(x3,y3,x4,100*map(s, 0, 60,0, 5));
  fill(255,0,0,150) 
  rect(x1,y1,x2,5*map(s, 0, 60,0, 80));
}