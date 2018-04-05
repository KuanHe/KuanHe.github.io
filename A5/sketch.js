var borough = ["0-10", "11-20", "21-30", "31-40", "41-50", "51-60","61-70"];
var people = [5, 5.5, 13, 11, 4.5, 4, 2.5];
var lengthMultiplier = 30; 

function setup(){
  createCanvas(1000,1000);
  noLoop();
}


function draw(){
  for (var i =0; i < borough.length; i++){
    fill(i* lengthMultiplier);
    rect(100 + 100 * i, 100, 20, people[i] * lengthMultiplier);

  }
  for (var i = 0; i < people.length; i++){
   text(people[i], 100 + 100 * i, 90);
}

for
    (var i = 0; i < people.length; i++){
    text(borough[i], 100 + 100 * i, 600); 
  }
}
