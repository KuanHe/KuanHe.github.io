var headlines = [];
var sections = [];

function preload() {

  var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
  var apikey = "bc6681ec7124443e84ef0cda61e09a69"; 
  url += "?api-key=" + apikey;

  nytResponse = loadJSON(url);

}

function setup() {
  createCanvas(500, 1000);
  background(0);

  textSize(10);
  textAlign(LEFT);

  noLoop(); 

  extractHeadlines();
  extractSections();
}

function draw() {
  background(0);

  var lineheight = 50;
  var margin = 10;
  translate(margin, margin);

  for (var i = 0; i < headlines.length; i++) {
    var words = split(headlines[i], ' ');

    var nextX = 0;

    for (var j=0; j<words.length; j++) {

      if (sections[i] == 'U.S.') {
        fill(150,150,150);
      } else {
        fill(150, 0, 0);
      }
      text(words[j]+ ' ', nextX, i*lineheight);
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

function extractSections() {
  for (var i = 0; i < nytResponse.results.length; i++) {
    var section = nytResponse.results[i].section;
    append(sections, section);
  }

}