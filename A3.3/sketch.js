var headlines = [];
var hitwords = [
  's',
  'a',
  'b',
  'c',
];
var textColorButton;
 
var textColor;

function preload() {

 
  var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
  var apikey = "bc6681ec7124443e84ef0cda61e09a69"; // see: https://developer.nytimes.com
  url += "?api-key=" + apikey;

  nytResponse = loadJSON(url);
 
}

function setup() {
  createCanvas(1000, 1000);
  background(0);

  textSize(15);
  textAlign(LEFT);

  extractHeadlines();

  textColor = color(255);
 
 
  textColorButton = createButton('click me');
  textColorButton.position(400, 400);
  textColorButton.mousePressed(changeColor);
}

function draw() {
  background('white');

  var lineheight = 60;
  var margin = 50;
  translate(margin, margin);

  for (var i = 0; i < headlines.length; i++) {
    var words = split(headlines[i], '');
   
    var nextX = 0;


    for (var j = 0; j < words.length; j++) {
      if (hitwords.includes(words[j].toLowerCase())) {
        fill(textColor);
      } else {
        fill('white');
      }



      text(words[j]+' ', nextX, i*lineheight);
      nextX += textWidth(words[j]+' ');

    }

  }

}

function extractHeadlines() {


  for (var i = 0; i < nytResponse.results.length; i++) {
    var h = nytResponse.results[i].title;
 
    append(headlines, h);
  }

}

function changeColor()
{
  textColor = color(random(255), random(255), random(255));
}