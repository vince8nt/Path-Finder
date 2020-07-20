var c = document.getElementById("mapContainer");
var ctx = c.getContext("2d");

var i;
var j;

var startX = 4,
    startY = 4,
    endX = 15,
    endY = 4;

var clickMode = "barrier";

// setup grid
var grid = [];
for (i = 0; i < 20; i++) {
    grid[i] = [];
    for (j = 0; j < 10; j++) {
        grid[i][j] = 0;
    }
}

// draw grid
for (i = 1; i < 20; i++) {
    ctx.moveTo(50 * i, 0);
    ctx.lineTo(50 * i, 500);
}
for (i = 1; i < 11; i++) {
    ctx.moveTo(0, 50 * i);
    ctx.lineTo(1000, 50 * i);
}
ctx.stroke();

// draw buttons
drawButtons();

// draw start and end
drawStart();
drawEnd();

/*
// test grid array
for (i = 0; i < 20; i++) {
    for (j = 0; j < 10; j++) {
        if (grid[i][j] === 0) {
            ctx.fillText("0", 25 + 50 * i, 25 + 50 * j);
        }
    }
}
*/

function drawStart (x, y) {
    ctx.fillText("Start", 15 + 50 * startX, 28 + 50 * startY);
}

function drawEnd (x, y) {
    ctx.fillText("End", 18 + 50 * endX, 28 + 50 * endY);
}

function drawButtons () {
    drawButton(clickMode === "barrier", "barrier", 150, 525);
    drawButton(clickMode === "eraser", "eraser", 300, 525);
    drawButton(clickMode === "set start", "set start", 450, 525);
    drawButton(clickMode === "set end", "set end", 600, 525);
}

function drawButton (bold, title, x, y) {
    if (!bold)
        ctx.fillStyle = "#808080";
    ctx.fillRect(x, y, 100, 50);
    ctx.fillStyle = "#F0FFC0";
    ctx.fillRect(x + 5, y + 5, 90, 40);
    ctx.fillStyle = "#000000";
    ctx.fillText(title, 10 + x, 30 + y);

}

c.addEventListener('click', function(event) {
    var cLeft = c.offsetLeft + c.clientLeft;
    var cTop = c.offsetTop + c.clientTop;
    var screenX = event.pageX - cLeft;
    var screenY = event.pageY - cTop;
    var x = Math.floor(screenX / 50);
    var y = Math.floor(screenY / 50);
    // a square was clicked
    if (y < 10) {
        if (clickMode === "barrier") {
            barrier (x, y);
        }
        else if (clickMode === "eraser") {
            eraser (x, y);
        }
        else if (clickMode === "set start") {
            setStart (x, y);
        }
        else {
            setEnd (x, y);
        }
    }
    // a square wasn't clicked
    else {
        selectButton(screenX, screenY);
    }
}, false);

function barrier (x, y) {
    if (squareTaken(x, y)) return;
    ctx.fillRect(50 * x + 5, 50 * y + 5, 40, 40);
}

function eraser (x, y) {
    if (squareTaken(x, y)) return;
    clear(x, y);
}

function clear (x, y) {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(50 * x + 5, 50 * y + 5, 40, 40);
    ctx.fillStyle = "#000000";
}

function setStart (x, y) {
    if (squareTaken(x, y)) return;
    clear(startX, startY);
    startX = x;
    startY = y;
    clear(startX, startY);
    drawStart();
}

function setEnd (x, y) {
    if (squareTaken(x, y)) return;
    clear(endX, endY);
    endX = x;
    endY = y;
    clear(endX, endY);
    drawEnd();
}

function squareTaken (x, y) {
    if (x === startX && y === startY) {
        return true;
    }
    if (x === endX && y === endY) {
        return true;
    }
    return false;
}

function selectButton (screenX, screenY) {
    if (525 < screenY && screenY < 575) {
        if (150 < screenX && screenX < 250) { // barrier
            clickMode = "barrier";
            drawButtons();
        }
        else if (300 < screenX && screenX < 400) { // eraser
            clickMode = "eraser";
            drawButtons();
        }
        else if (450 < screenX && screenX < 550) { // set start
            clickMode = "set start";
            drawButtons();
        }
        else if (600 < screenX && screenX < 700) { // set end
            clickMode = "set end";
            drawButtons();
        }
    }
}






