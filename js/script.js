const getRGBValues = colors => {
    return colors.map(color => {
        return parseInt(document.getElementsByClassName(color)[0].value, 10);
    });
};

const isValid = value => !isNaN(value) && value < 256 && value >= 0;

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

const baseColor = ({ red, blue, green }) => {
    return `rgb(${red}, ${green}, ${blue})`;
};

const showAlert = () => {
    const hasErrors = document.getElementsByClassName("error").length;
    return (
        hasErrors &&
        alert("Make sure all color inputs are valid numbers between 0 and 255.")
    );
};

const resetShades = () => {
    const addJs = document.getElementById("add-js");
    while (addJs.hasChildNodes()) {
        addJs.removeChild(addJs.firstChild);
    }
};

const printContent = content => {
    const rootDiv = document.getElementById("add-js");
    if (content) rootDiv.innerHTML += `${content}`;
    else rootDiv.innerHTML = "";
};

const addTitle = (type = "base") => {
    const title = {
        base: `<h2>Here are your results:</h2><h3>Base Color:</h3>`,
        shade: `<h3>Shades:</h3>`
    };

    return title[type];
};

const addCard = ({ red, green, blue }) => {
    const rgbColor = baseColor({ red, green, blue });

    return `
        <section class="card">
            <p>rgb(${red}, ${green}, ${blue})</p>
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
    //removes any previously generated shade Sets
    resetShades();

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

    //Initial Color Print
    content += addTitle("base");
    content += addCard({ red, green, blue });
    content += addTitle("shade");

    //Sets color to the darkest Shade
    while (red > 0 && green > 0 && blue > 0) {
        red--;
        green--;
        blue--;
    }

    //Prints all Shades

    while (red < 256 && green < 256 && blue < 256) {
        content += addCard({ red, green, blue });

        red += 2;
        blue += 2;
        green += 2;
    }

    printContent(content);
});
