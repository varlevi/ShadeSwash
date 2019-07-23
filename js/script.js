//variables
var html = '';
var rgbColor;
var red = parseInt(prompt('What is your red value for your RGB color?'));
//these if-else clauses make sure the user enters valid numbers
if (red >= 0 && red < 256) {
  ;
} else {
  while (red <= 0 || red > 256) {
  var red = parseInt(prompt('Try again. Make sure you enter an integer between 0 and 255'))
  }
}
var green = parseInt(prompt('What is your green value for your RGB color?'));
if (green >= 0 && green < 256) {
  ;
} else {
  while (green <= 0 || green > 256) {
  var green = parseInt(prompt('Try again. Make sure you enter an integer between 0 and 255'))
  }
}
var blue = parseInt(prompt('What is your blue value for your RGB color?'));
if (blue >= 0 && blue < 256) {
  ;
} else {
  while (blue <= 0 || blue > 256) {
  var blue = parseInt(prompt('Try again. Make sure you enter an integer between 0 and 255'))
  }
}


//functions

function baseColor() {
 var color = 'rgb(';
  color += red + ',';
  color += green + ',';
  color += blue + ')';
  return color;
}

function print( message ) {
  document.write( message );
}

function printRGB() {
  print( '<p>RGB: ' + red + ', ' + green + ', ' + blue + '<br></p>' );
}

//Initial Color Print
rgbColor = baseColor();
html += '<div style="background-color:' + rgbColor + '"></div>';


print( '<h3>Base Color: <br></h3>' );
print( ' </br>' );
printRGB();
print( ' </br>' );
print( html );
for (i = 0; i < 5; i += 1) {
  print( ' </br>' );
}

//Sets Color to the Darkest Shade
while ( red > 0 && green > 0 && blue > 0 ) {
  red -= 1;
  green -= 1;
  blue -= 1;
}

//Prints all Shades
print( '<h3>Shades: <br></h3><section class="colors">' );

while (red < 256 && green < 256 && blue < 256) {

  rgbColor = baseColor();
  html = '<div style="background-color:' + rgbColor + '"></div>';

  print( ' </br>' );
  printRGB();
  print( ' </br>' );
  print( html );
  print( ' </br>' );

  red += 2;
  blue += 2;
  green += 2;
}

print('</section>');
