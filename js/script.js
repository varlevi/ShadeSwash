//variables
var html;
var rgbColor;
var red;
var green;
var blue;
//these if-else clauses make sure the user enters valid numbers
var getRed = () => {
  red = parseInt(prompt("What is your red value for your RGB color?"));
  if (!(red >= 0 && red < 256)) return alert("Your integer needs to be between 0 and 255.");
  while (red <= 0 || red > 256) {
    red = parseInt(
      prompt(
        "Try again. Make sure you enter an integer between 0 and 255 for the red value."
      )
    );
  }
}
getRed()

var getGreen = () => {
  green = parseInt(prompt("What is your green value for your RGB color?"));
  if (!(green >= 0 && green < 256)) return alert("Your integer needs to be between 0 and 255.");
  while (green <= 0 || green > 256) {
    green = parseInt(
      prompt(
        "Try again. Make sure you enter an integer between 0 and 255 for the green value."
      )
    );
  }
};
getGreen();

var getBlue = () => {
  blue = parseInt(prompt("What is your blue value for your RGB color?"));
  if (!(blue >= 0 && blue < 256)) return alert("Your integer needs to be between 0 and 255.");
  while (blue <= 0 || blue > 256) {
    blue = parseInt(
      prompt(
        "Try again. Make sure you enter an integer between 0 and 255 for the blue value."
      )
    );
  }
};
getBlue();

// var green = parseInt(prompt('What is your green value for your RGB color?'));
// // if (green >= 0 && green <= 255) return;
// while (green <= 0 || green > 256) {
//   var green = parseInt(
//     prompt("Try again. Make sure you enter an integer between 0 and 255")
//   );
// }
// var blue = parseInt(prompt('What is your blue value for your RGB color?'));
// if (blue >= 0 && blue < 256) {
//   ;
// } else {
//   while (blue <= 0 || blue > 256) {
//   var blue = parseInt(prompt('Try again. Make sure you enter an integer between 0 and 255'))
//   }
// }


//functions

var baseColor = () => {
 var color = 'rgb(';
  color += red + ',';
  color += green + ',';
  color += blue + ')';
  return color;
}

var print = (message) => {
  document.write(message);
}

var printRGB = () => {
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