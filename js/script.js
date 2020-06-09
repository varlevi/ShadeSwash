/**
 * Convert RGB to hexcode string
 * @param {Object} {red: Number, green: Number, blue: Number}
 * @return {String} hexcode from provided RGB values
 */
const rgbToHex = ({ red, green, blue }) =>
    (blue | (green << 8) | (red << 16) | (1 << 24)).toString(16).slice(1);

/**
 * Retrieve user's input value for each rgb color
 * @param  {Array<String>} colors ['red', 'green', 'blue']
 * @return {Array<Number>} Array of user input RGB values for each color
 */
const getRGBValues = colors =>
    colors.map(color => {
        return parseInt(document.getElementsByClassName(color)[0].value, 10);
    });

/**
 * Validate if user input is valid RGB value
 * @param {Number} value RGB value
 * @return {Boolean} Valid RGB value?
 */
const isValid = value => !isNaN(value) && value < 256 && value >= 0;

/**
 * Toggle "error" class on RGB input element
 * depending on user input validity
 * @param {Array<String>} colors ['red', 'green', 'blue']
 * @param {Array<Number>} values [Number, Number, Number]
 * @return {Boolean} All user input values validity
 */
const valuesValidators = (colors, values) => {
    const allValid = colors.every((color, index) => {
        const element = document.getElementsByClassName(color)[0].classList;
        element.remove("error");
        const validColorValue = isValid(values[index]);
        !validColorValue && element.add("error");
        return validColorValue;
    });
    return allValid;
};

/**
 * Create RGB color string
 * @param {Object} { red: Number, blue: Number, green: Number }
 * @return RGB string from RGB values: rgb(red, green, blue)
 */
const baseColor = ({ red, green, blue }) => `rgb(${red}, ${green}, ${blue})`;

/**
 * Display alert prompt if user RGB is not valid & reset content
 * @return void
 */
const showAlert = () => {
    const hasErrors = document.getElementsByClassName("error").length;
    hasErrors &&
        alert(
            "Make sure all color inputs are valid numbers between 0 and 255."
        );
};


const printContent = content => {
    const rootDiv = document.getElementById("add-js");
    if (content) rootDiv.innerHTML += `${content}`;
    else rootDiv.innerHTML = "";
};

/**
 * Return a title based on type
 * @param {String} type
 * @return {String<HTML>} title string
 */
const addTitle = type => {
    const title = {
        base: `<h2>Here are your results:</h2><h3>Base Color:</h3>`,
        shade: `<h3>Shades:</h3>`
    };

    return title[type];
};

/**
 * Create a Card Element
 * @param {Object} { red: Number, green: Number, blue: Number }
 * @param {Boolean} center Adds a "card-center" class if true
 * @return {String<HTML>} Card Element
 */
const addCard = ({ red, green, blue }, center = false) => {
    const rgbColor = baseColor({ red, green, blue });
    const hexCode = rgbToHex({ red, green, blue });

    return `
        <section class="card">
            <div class="card-text">
                <p>${rgbColor}</p>
                <p>#${hexCode}</p>
            </div>
            <div>
                <div 
                    style="background-color: ${rgbColor}" 
                    class="darkmode-ignore colors"
                />
            </div>
        </section>
    `;
};

const generateShades = () => {
    // reset shades
    printContent();

    // Get user input for RGB values
    let content = "";
    const colors = ["red", "green", "blue"];
    const values = getRGBValues(colors);
    let [red, green, blue] = values;

    const allValid = valuesValidators(colors, values);
    if (!allValid) {
        showAlert();
        printContent();
        return;
    }

    // Base Card
    content += addTitle("base");
    content += `<div class="base-card-container">`;
    content += addCard({ red, green, blue });
    content += `</div>`;

    // Shades Cards Title
    content += addTitle("shade");
    content += `<div class="cards">`;

    // Sets color to the darkest Shade
    while (red > 0 && green > 0 && blue > 0) {
        red--;
        green--;
        blue--;
    }

    // Generate all Shades Cards
    while (red < 256 && green < 256 && blue < 256) {
        content += addCard({ red, green, blue });

        red += 2;
        green += 2;
        blue += 2;
    }

    // Display all content in root div
    content += `</div>`;
    printContent(content);
}

document.addEventListener('keypress', event => {
    if (event.keyCode === 13) {
        generateShades();
    }
})

document.getElementById("submit").addEventListener("click", event => {
    generateShades();
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

const root = document.documentElement;

darkButton.addEventListener('click', () => {
  darkModeState = !darkModeState;
  let h3 = document.getElementsByTagName('H3');
  let buttons = document.getElementsByClassName('button')
  if (darkModeState == true) {
    document.body.style.backgroundColor = "#111";
    root.style.setProperty('--base-color', '#DDD');
    root.style.setProperty('--secondary-color', '#111');
    root.style.setProperty('--neumorphic-shadow-light', '#141414');
    root.style.setProperty('--neumorphic-shadow-dark', '#0e0e0e');
    root.style.setProperty('--neumorphic-fill-light', '#121212');
    root.style.setProperty('--neumorphic-fill-dark', '#0f0f0f');
    githubButton.src = "icons/github.svg";
    menuButton.src = "icons/menu.svg";
    darkButton.src = "icons/moon.svg";
    aboutButton.src = "icons/info.svg";
  } else {
    document.body.style.backgroundColor = "#FFF";
    root.style.setProperty('--base-color', '#111');
    root.style.setProperty('--secondary-color', '#DDD');
    root.style.setProperty('--neumorphic-shadow-light', '#ffffff');
    root.style.setProperty('--neumorphic-shadow-dark', '#d9d9d9');
    root.style.setProperty('--neumorphic-fill-light', '#ffffff');
    root.style.setProperty('--neumorphic-fill-dark', '#e6e6e6');
    githubButton.src = "icons/github-white.svg";
    menuButton.src = "icons/menu-white.svg";
    darkButton.src = "icons/moon-white.svg";
    aboutButton.src = "icons/info-white.svg";
    for (i of buttons) {
      i.style.color = '#111';
    }
  }
})

githubButton.addEventListener('click', () => {
  window.location.href = 'https://github.com/varlevi/the_shade_generator';
})

const newModal = (title, content) => {
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
  newModal('About', `<h4>Project Info</h4><p>ShadeSwash was created in 2019 and is maintained by varlevi. It was created in order to provide developers and designers with a simple, well-designed tool for finding color shades.</p><h4>Other Projects by varlevi</h4><p><a href="https://colorbynumber.netlify.app/">Color By Number Mosaics</a></p></br><p><a href="https://physicscalculator.netlify.app">Simple Physics Calculator</a></p><h4>Attributions</h4><p>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></p>`);
})
