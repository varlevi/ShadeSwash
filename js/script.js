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
    print( '<p>rgb(' + red + ', ' + green + ', ' + blue + ')<br></p>' );
  }

  //Initial Color Print
  rgbColor = baseColor();
  html = `<div style="background-color: ${rgbColor}" class="darkmode-ignore colors"></div>`

  print('<h2>Here are your results:</h2>');
  print( '<h3>Base Color: <br></h3>' );
  print( `<section class="card">${html}</br><p>rgb(${red}, ${green}, ${blue})</p></section>` );
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

  print( '<h3>Shades: <br></h3><section class="colors-div">' );

  while (red < 256 && green < 256 && blue < 256) {

    rgbColor = baseColor();
    html = `<div style="background-color: ${rgbColor}" class="darkmode-ignore colors"></div>`

    print( `<section class="card">${html}</br><p>rgb(${red}, ${green}, ${blue})</p></section>` );

    red += 2;
    blue += 2;
    green += 2;
  }

  print('</section>');

});

//Custom settings panel

let menuButton = document.getElementById("menu-button");
let menuState = false;
menuButton.addEventListener('click', () => {
  menuState = !menuState;
  if (menuState == true) {
    menuButton.style.transform = "scale(1.2)";
    document.getElementById('github-button').style.display = "block";
    document.getElementById('dark-button').style.display = "block";
    document.getElementById('github-button').style.opacity = "1.0";
    document.getElementById('dark-button').style.opacity = "1.0";
  } else {
    menuButton.style.transform = "scale(1)";
    document.getElementById('github-button').style.display = "none";
    document.getElementById('dark-button').style.display = "none";
    document.getElementById('github-button').style.opacity = "0.0";
    document.getElementById('dark-button').style.opacity = "0.0";
  }
})

let darkButton = document.getElementById('dark-button');
darkModeState = false;
darkButton.addEventListener('click', () => {
  darkModeState = !darkModeState;
  let h3 = document.getElementsByTagName('H3');
  let buttons = document.getElementsByClassName('button')
  if (darkModeState == true) {
    document.body.style.backgroundColor = "#111";
    document.getElementsByTagName('h1')[0].style.color = '#DDD';
    document.getElementsByTagName('h2')[0].style.color = '#DDD';
    for (i of buttons) {
      i.style.color = '#333';
    }
    for (i of h3) {
      i.style.color = '#DDD';
    }
  } else {
    document.body.style.backgroundColor = "#FFF";
    document.getElementsByTagName('h1')[0].style.color = '#384047';
    document.getElementsByTagName('h2')[0].style.color = '#384047';
    for (i of buttons) {
      i.style.color = '#222';
    }
    for (i of h3) {
      i.style.color = '#333';
    }
  }
})

let githubButton = document.getElementById('github-button');
githubModeState = false;
githubButton.addEventListener('click', () => {
  window.location.href = 'https://github.com/varlevi/the_shade_generator';
})
