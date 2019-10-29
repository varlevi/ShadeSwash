document.getElementsByClassName('submit')[0].addEventListener('click', (event) => {

  //removes any previously generated shade Sets

  let addJs = document.getElementById("add-js");
  while (addJs.hasChildNodes()) {
    addJs.removeChild(addJs.firstChild);
  }

  //get color values
  let red = document.getElementsByClassName('red')[0].value;
  let green = document.getElementsByClassName('green')[0].value;
  let blue = document.getElementsByClassName('blue')[0].value;

  //check for valid values
  if (isNaN(red) || red > 256 || red < 0) {
    document.getElementsByClassName("red")[0].classList.add('error');
  } else {
    document.getElementsByClassName("red")[0].classList.remove('error');
  }
  if (isNaN(green) || green > 256 || green < 0) {
    document.getElementsByClassName("green")[0].classList.add('error');
  } else {
    document.getElementsByClassName("green")[0].classList.remove('error');
  }
  if (isNaN(blue) || blue > 256 || blue < 0) {
    document.getElementsByClassName("blue")[0].classList.add('error');
  } else {
    document.getElementsByClassName("blue")[0].classList.remove('error');
  }
  if (isNaN(blue) || blue > 256 || blue < 0 || isNaN(green) || green > 256 || green < 0 || isNaN(red) || red > 256 || red < 0) {
    alert("Make sure all color inputs are valid numbers between 0 and 255.");
  }

  //functions
  var baseColor = () => {
   var color = 'rgb(';
    color += red + ',';
    color += green + ',';
    color += blue + ')';
    return color;
  }

  var print = (message) => {
    document.getElementById("add-js").innerHTML += `${message}`;
  }

  var printRGB = () => {
    print( '<p>RGB: ' + red + ', ' + green + ', ' + blue + '<br></p>' );
  }

  //Initial Color Print
  rgbColor = baseColor();
  html = `<div style="background-color: ${rgbColor}"></div>`

  print( '<h3>Base Color: <br></h3>' );
  print( ' </br>' );
  printRGB();
  print( ' </br>' );
  print( html );
  for (i = 0; i < 5; i += 1) {
    print( ' </br>' );
  }

  //Sets color to the darkest Shade

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


});

