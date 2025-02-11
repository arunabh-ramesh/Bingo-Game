let ballElements = [];
let savedArray = [];
let winArray = [];
let recentCalls = ["", "", ""];
let interval;
const letters = "BINGO";
const sound1 = new Audio('https://codehs.com/uploads/bc974e3622721dff3b043a56a12349e9');


const slider = document.getElementById("speedRange");
const dropDown = document.getElementById("winCons");
const output = document.getElementById("speedOutput");
output.innerText = slider.value;

const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");

let mainCircleText;
let r1Text;
let r2Text;
let r3text;

// Initialize game
init();
createMainCircle("");
createRecentCircles("");
testSingle();

// Event Listeners
slider.oninput = handleSliderChange;
// dropDown.oninput = patternDisplay;
startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);

// Event Handlers
function handleSliderChange() {
    output.innerText = this.value;
        if (interval) {
        clearInterval(interval);
        interval = setInterval(displayNumber, slider.value * 1000);
        console.log(slider.value * 1000);
    }
}

function patternDisplay() {
    let col, row;
    const selectedOption = dropDown.options[dropDown.selectedIndex];
    const selectedText = selectedOption.text;
    console.log(selectedText);
    for (col = 0; col < 5; col++) {
        for (row = 0; row < 5; row++) {
             
        }
    }
    for (row = 0; row < 5; row++) {
        for (col = 0; col < 5; col++) {
            
        }
    }
 }

function startGame() {
    savedArray = generateNumbers();
    clearCallingBall();
    createMainCircle();
    createRecentCircles("");
    if (interval) clearInterval(interval);
    interval = setInterval(displayNumber, slider.value * 1000);
    startButton.removeEventListener("click", startGame);
    startButton.addEventListener("click", pauseGame);
    startButton.innerText = "Pause";
}

function pauseGame() {
    clearInterval(interval);
    interval = null;
    startButton.removeEventListener("click", pauseGame);
    startButton.addEventListener("click", startGame);
    startButton.innerText = "Play";
}

function resetGame() {
    clearInterval(interval);
    interval = null;
    ballElements.forEach(ball => ball.setAttribute("style", "fill: gray; stroke: gray; stroke-width: 1px;"));
    clearCallingBall();
    createMainCircle("");
    createRecentCircles("");
    recentCalls = ["", "", ""];
    startButton.removeEventListener("click", pauseGame);
    startButton.addEventListener("click", startGame);
    startButton.innerText = "Start Game";
}

function displayNumber() {
    const num = savedArray.pop();
    highlightBall(num);
    updateMainCircle(num);
    updateRecentCircles();
    recentCalls.push(num);
    if(savedArray.length === 0){
        clearInterval(interval);
    }
    if (recentCalls.length === 4) {
        recentCalls.splice(0, 1);
    }
    sound1.play();
}

// Game Logic
function generateNumbers() {
    const numbers = Array.from({ length: 75 }, (_, i) => i + 1);
    return shuffleArray(numbers);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function highlightBall(num) {
    if (ballElements[num - 1]) {
        ballElements[num - 1].setAttribute("style", "fill: red; stroke: red; stroke-width: 1px;");
    }
}

function updateMainCircle(num) {
    const letter = letters.charAt(Math.floor((num - 1) / 15));
    mainCircleText.textContent = `${letter}${num}`;
}

function updateRecentCircles() {
    letter = letters.charAt(Math.floor((recentCalls[2] - 1) / 15));
    r1Text.textContent = `${letter}${recentCalls[2]}`;
    letter = letters.charAt(Math.floor((recentCalls[1] - 1) / 15));
    r2Text.textContent = `${letter}${recentCalls[1]}`;
    letter = letters.charAt(Math.floor((recentCalls[0] - 1) / 15));
    r3Text.textContent = `${letter}${recentCalls[0]}`;
}

// UI Helpers
function createMainCircle(placeholder = "") {
    const svg = createSVGElement("svg", { height: 100 });
    const circle = createSVGElement("circle", {
        cx: 50,
        cy: 50,
        r: 45,
        style: "fill: red; stroke: red; stroke-width: 1px;"
    });

    mainCircleText = createSVGElement("text", {
        x: 50,
        y: 55,
        "text-anchor": "middle",
        fill: "white",
        "font-size": "40px",
        "font-weight": "bold",
        "font-family": "Georgia",
        "dominant-baseline": "middle",
        textContent: placeholder
    });

    svg.append(circle, mainCircleText);
    document.getElementById("callingBall").appendChild(svg);
}

function createRecentCircles(placeholder = "") {
    const svg = createSVGElement("svg", { height: 100 });
    const circle = createSVGElement("circle", {
        cx: 50,
        cy: 50,
        r: 40,
        style: "fill: red; stroke: red; stroke-width: 1px;"
    });

    r1Text = createSVGElement("text", {
        x: 50,
        y: 55,
        "text-anchor": "middle",
        fill: "white",
        "font-size": "40px",
        "font-weight": "bold",
        "font-family": "Georgia",
        "dominant-baseline": "middle",
        textContent: placeholder
    });

    svg.append(circle, r1Text);
    document.getElementById("recent1Ball").appendChild(svg);
    
    const svg2 = createSVGElement("svg", { height: 100 });
    const circle2 = createSVGElement("circle", {
        cx: 50,
        cy: 50,
        r: 35,
        style: "fill: red; stroke: red; stroke-width: 1px;"
    });

    r2Text = createSVGElement("text", {
        x: 50,
        y: 55,
        "text-anchor": "middle",
        fill: "white",
        "font-size": "40px",
        "font-weight": "bold",
        "font-family": "Georgia",
        "dominant-baseline": "middle",
        textContent: placeholder
    });

    svg2.append(circle2, r2Text);
    document.getElementById("recent2Ball").appendChild(svg2);
    
    const svg3 = createSVGElement("svg", { height: 100 });
    const circle3 = createSVGElement("circle", {
        cx: 50,
        cy: 50,
        r: 30,
        style: "fill: red; stroke: red; stroke-width: 1px;"
    });

    r3Text = createSVGElement("text", {
        x: 50,
        y: 55,
        "text-anchor": "middle",
        fill: "white",
        "font-size": "40px",
        "font-weight": "bold",
        "font-family": "Georgia",
        "dominant-baseline": "middle",
        textContent: placeholder
    });

    svg3.append(circle3, r3Text);
    document.getElementById("recent3Ball").appendChild(svg3);
}

function clearCallingBall() {
    document.getElementById("callingBall").innerHTML = "";
    document.getElementById("recent1Ball").innerHTML = "";
    document.getElementById("recent2Ball").innerHTML = "";
    document.getElementById("recent3Ball").innerHTML = "";
}

function createSVGElement(type, attributes) {
    const elem = document.createElementNS("http://www.w3.org/2000/svg", type);
    for (const [key, value] of Object.entries(attributes)) {
        if (key === "textContent") {
            elem.textContent = value;
        } else {
            elem.setAttribute(key, value);
        }
    }
    return elem;
}

// Initialization
function init() {
    for (let row = 0; row < 5; row++) {
        for (let column = 1; column < 16; column++) {
            document.getElementById("calledBalls").appendChild(makeBall(row, column));
        }
    }
}

function makeBall(row, column) {
    const svg = createSVGElement("svg", { height: 100 });
    const circle = createSVGElement("circle", {
        cx: 50,
        cy: 50,
        r: 45,
        style: "fill: gray; stroke: gray; stroke-width: 1px;",
    });

    ballElements.push(circle);

    const letterText = createSVGElement("text", {
        x: 50,
        y: 30,
        "text-anchor": "middle",
        fill: "white",
        "font-size": "20px",
        "font-weight": "bold",
        "font-family": "Georgia",
        "dominant-baseline": "middle",
        textContent: letters[row],
    });

    const numberText = createSVGElement("text", {
        x: 50,
        y: 60,
        "text-anchor": "middle",
        fill: "white",
        "font-size": "40px",
        "font-weight": "bold",
        "font-family": "Georgia",
        "dominant-baseline": "middle",
        textContent: column + row * 15,
    });

    svg.append(circle, letterText, numberText);
    return svg;
}

function makeBox(row, column) {
    
}

// Testing
function testSingle() {
    console.log("Output - Single Run");
    savedArray = shuffleArray(Array.from({ length: 75 }, (_, i) => i + 1)).sort((a, b) => a - b);

    const missingValues = Array.from({ length: 75 }, (_, i) => i + 1).some(num => !savedArray.includes(num));
    const repeatValues = savedArray.length !== 75;

    savedArray = savedArray.map(num => `${letters[Math.floor((num - 1) / 15)]}${num}`);

    console.log(savedArray);
    console.log("Missing Values: " + missingValues);
    console.log("Repeat Values: " + repeatValues);
}