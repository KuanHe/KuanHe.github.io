var headlines = [];
var sign = [
"?", "!"];
var punc = [
".", ","];

function preload() {

  var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
  var apikey = "bc6681ec7124443e84ef0cda61e09a69"; 
  url += "?api-key=" + apikey;

  nytResponse = loadJSON(url);
}

function setup() {
  createCanvas(2000, 2000);
  background(0);

   noLoop(); 

  extractHeadlines();
}

function draw() {

  var lineheight = 100;
  
  translate(100, lineheight);

  for (var i = 0; i < headlines.length; i++) {
    var words = split(headlines[i], '');

    var nextX = 0;

      var rectheight = 2;


    for (var j = 0; j < words.length; j++) {
      stroke(255);
      strokeWeight(0.1);
      line(nextX,0, 0, i*lineheight);

      //text
      noFill();
      noStroke();
      text(words[j]+' ', nextX, i*lineheight);
      nextX += textWidth(words[j]+'  ');
    

      //define size of alphabets
      var str1 = 'abcdefghijklmnopqrstuvwxyz';
      var str2 = split(str1, '');
      var size = (str2.indexOf(words[j])+1);

    
      var str3 = '0123456789';
      var str4 = split(str3, '');
      var sizen = (str4.indexOf(words[j])+1);


      if (sign.includes(words[j].toLowerCase())) {
        noStroke();
        fill(51,204,204,50);
        ellipse(nextX,i*lineheight,50,50);
        
      } else if (punc.includes(words[j])){
        noStroke();
        fill(51,204,204,50);
        ellipse(nextX,i*lineheight,20,20);
       
      } else if (str2.includes(words[j].toLowerCase())){
        noStroke();
        fill(255,153,11,15);
        ellipse(nextX,i*lineheight,size,size);

      };
      
    }
  }


}




function extractHeadlines() {


  for (var i = 0; i < nytResponse.results.length; i++) {
    var h = nytResponse.results[i].title;


    append(headlines, h);
  }

}