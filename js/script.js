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

