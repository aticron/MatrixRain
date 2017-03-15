var symbolSize = 26;
var streams = [];
var fadeInterval = 1.6;


function setup()
{
  //Variables to create a dynamic size window canvas
  createCanvas(window.innerWidth,window.innerHeight);
  background(0);
  var x = 0;


  for(var i = 0; i <= width / symbolSize; i++)
  {
    var stream = new Stream();
    //populate stream with symbols and a location, y location randomized off top of screen
    stream.generateSymbols(x , random(-650,0));
    streams.push(stream);
    x += symbolSize;
  }
  textFont('Consolas');
  textSize(symbolSize);

}

function draw()
{
  background(0,150);
  streams.forEach(function(stream)
  {
    stream.render();
  });
}

function Symbol(x, y, speed, first, opacity)
{
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.value;
  this.opacity = opacity;
  //sets the integer to divide against framerate and create the char switch randomness
  this.switchInterval = round(random(10,32));
  //console.log(this.switchInterval);
  // Generates a random number between 0-96 that's appended to the Unicode
  // at the range that generates Katakana characters and assigns to this.value
  this.first = first;
  this.setToRandomSymbol = function()
    {
      var numericalMod = round(random(1,10));
      var alphas = ['Z','X','C','A','Q','G'];
      //based on frame divided by switch interval randomness, randomize the symbol
        if (frameCount % this.switchInterval == 0)
        { //small change set to a number
          if (numericalMod <= 1)
          {
            this.value = round(random(0,9));
          } //small chance set to alpha in alpha array
          if (numericalMod == 2)
          {
            this.value = alphas[round(random(0,5))];
          }
          else
          {//otherwise set it to a random katakana
            this.value = String.fromCharCode
            (
              0x30A0 + round(random(0,96))
            );
          }
        }

    }



// Make the symbols go down the screen by incrementing y value and resetting
// To the top of the page after hitting the bottom
  this.rain = function()
  {
    if(this.y > height)
    {
      this.y= 0;
    }
    else
    {
      this.y += this.speed;
    }
  }

}

function Stream()
{
  this.symbols =[];
  this.totalSymbols = round(random(5,20));
  this.speed = random(3,12);
  this.generateSymbols = function(x , y)
  {
    //Setting flag to 25% chance first char in stream being whiteish and will evaluate
    //down to true or false, I don't understand this lines syntax
    var first = round(random(0,4)) == 1;
    var opacity = 255;
    //Populate stream array with symbols and generate randomness in them
    for (var i = 0; i <= this.totalSymbols; i++)
    {
      symbol = new Symbol(x, y, this.speed, first, opacity);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      opacity -= (255 / this.totalSymbols) / fadeInterval;
      y -= symbolSize;
      first = false;

    }

  }

  this.render = function()
  {
      this.symbols.forEach(function(symbol)
      {
        if (symbol.first)
         {
           fill(180, 255, 180, symbol.opacity);
         }
         else
         {
           fill(0,255,100, symbol.opacity);
         }

        text(symbol.value, symbol.x, symbol.y);
        textAlign(CENTER);
        symbol.rain();
        symbol.setToRandomSymbol();
      });

  }
}
