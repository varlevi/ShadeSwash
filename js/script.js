/**
 * Retrieve user's input value for each rgb color
 * @param  {Array<String>} colors ['red', 'green', 'blue']
 * @return {Array<Number>} Array of user input RGB values for each color
 */
const getRGBValues = colors => {
    return colors.map(color => {
        return parseInt(document.getElementsByClassName(color)[0].value, 10);
    });
};

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
 * @return void
 */
const valuesValidators = (colors, values) => {
    colors.forEach((color, index) => {
        const element = document.getElementsByClassName(color)[0].classList;
        element.remove("error");
        !isValid(values[index]) && element.add("error");
    });
};

/**
 * Create RGB color string
 * @param {Object} { red: Number, blue: Number, green: Number }
 * @return RGB string from RGB values: rgb(red, green, blue)
 */
const baseColor = ({ red, green, blue }) => `rgb(${red}, ${green}, ${blue})`;

/**
 * Display alert prompt if user RGB is not valid
 * @return void
 */
const showAlert = () => {
    const hasErrors = document.getElementsByClassName("error").length;
    hasErrors &&
        alert(
            "Make sure all color inputs are valid numbers between 0 and 255."
        );
};

/**
 * Set/Update root div depending on content
 * @param {String<HTML> | undefined} content
 * @return void
 */
const setContent = content => {
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
 * @return {String<HTML>} Card Element
 */
const addCard = ({ red, green, blue }) => {
    const rgbColor = baseColor({ red, green, blue });

    return `
        <section class="card">
            <p>${rgbColor}</p>
            <div>
                <div 
                    style="background-color: ${rgbColor}" 
                    class="darkmode-ignore colors"
                />
            </div>
        </section>
    `;
};

document.getElementById("submit").addEventListener("click", event => {
    // reset shades
    setContent();

    let content = "";
    const colors = ["red", "green", "blue"];
    const values = getRGBValues(colors);
    let [red, green, blue] = values;

    valuesValidators(colors, values);
    showAlert();

    // Base Card
    content += addTitle("base");
    content += addCard({ red, green, blue });

    // Shades Cards Title
    content += addTitle("shade");

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
    setContent(content);
});
