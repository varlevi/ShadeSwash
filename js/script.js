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

let menuButton = document.getElementById('menu-button');
let menuState = false;
let darkButton = document.getElementById('dark-button');
darkModeState = false;
let githubButton = document.getElementById('github-button');
githubState = false;
let aboutButton = document.getElementById('about-button');
aboutState = false;

menuButton.addEventListener('click', () => {
  menuState = !menuState;
  if (menuState == true) {
    menuButton.style.transform = "scale(1.2)";
    githubButton.style.display = "block";
    darkButton.style.display = "block";
    aboutButton.style.display = "block";
    githubButton.style.opacity = "1.0";
    darkButton.style.opacity = "1.0";
    aboutButton.style.opacity = "1.0";
  } else {
    menuButton.style.transform = "scale(1)";
    githubButton.style.display = "none";
    darkButton.style.display = "none";
    aboutButton.style.display = "none";
    githubButton.style.opacity = "0.0";
    darkButton.style.opacity = "0.0";
    aboutButton.style.opacity = "0.0";
  }
})

darkButton.addEventListener('click', () => {
  darkModeState = !darkModeState;
  let h3 = document.getElementsByTagName('H3');
  let buttons = document.getElementsByClassName('button')
  if (darkModeState == true) {
    document.body.style.backgroundColor = "#111";
    document.getElementsByTagName('h1')[0].style.color = '#DDD';
    document.getElementsByTagName('h2')[0].style.color = '#DDD';
    githubButton.src = "icons/github-white.svg";
    menuButton.src = "icons/menu-white.svg";
    darkButton.src = "icons/moon-white.svg";
    aboutButton.src = "icons/info-white.svg";
    for (i of h3) {
      i.style.color = '#DDD';
    }
  } else {
    document.body.style.backgroundColor = "#FFF";
    document.getElementsByTagName('h1')[0].style.color = '#384047';
    document.getElementsByTagName('h2')[0].style.color = '#384047';
    githubButton.src = "icons/github.svg";
    menuButton.src = "icons/menu.svg";
    darkButton.src = "icons/moon.svg";
    aboutButton.src = "icons/info.svg";
    for (i of buttons) {
      i.style.color = '#222';
    }
    for (i of h3) {
      i.style.color = '#333';
    }
  }
})

githubButton.addEventListener('click', () => {
  window.location.href = 'https://github.com/varlevi/the_shade_generator';
})

function newModal(title, content) {
  if (aboutState == true) {
    let modalBackground = document.createElement('DIV');
    let modal = document.createElement('DIV');
    modal.innerHTML += `<h3>${title}</h3>`;
    modal.innerHTML += content;
    modal.classList += "js-modal";
    document.body.appendChild(modalBackground);
    modalBackground.appendChild(modal);
  } else {
    document.getElementsByClassName('js-modal')[0].remove();
  }
}

aboutButton.addEventListener('click', () => {
  aboutState = !aboutState;
  newModal('About', `<h4>Project Info</h4><p>The Shade Generator was created in 2019 and is maintained by varlevi in order to provide developers and designers with a simple no-frills tool for finding color shades.</p><h4>Other Projects by varlevi</h4><a href="https://colorbynumber.netlify.com/">Color By Number Mosaics</a></br><a href="https://physicscalculator.netlify.com">Simple Physics Calculator</a><h4>Attributions</h4><p>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></p>`);
})
