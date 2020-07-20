var c = document.getElementById("mapContainer");
var ctx = c.getContext("2d");

var i;
var j;

var startX = 4,
    startY = 4,
    endX = 15,
    endY = 4;

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
drawButtons("barrier");

// draw start and end
/*
ctx.fillText("Start", 25 + 50 * startX, 25 + 50 * startY);
ctx.fillText("End", 25 + 50 * endX, 25 + 50 * endY);
*/
drawStart(startX, startY);
drawEnd(endX, endY);

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
    ctx.fillText("Start", 25 + 50 * x, 25 + 50 * y);
}

function drawEnd (x, y) {
    ctx.fillText("End", 25 + 50 * x, 25 + 50 * y);
}

function drawButtons (selected) {
    drawButton(selected === "barrier", "barrier", 150, 525);
    drawButton(selected === "eraser", "eraser", 300, 525);
    drawButton(selected === "set start", "set start", 450, 525);
    drawButton(selected === "set end", "set end", 600, 525);
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
        alert("Square (" + x + ", " + y + ") was clicked.");
        ctx.fillRect(50 * x + 5, 50 * y + 5, 40, 40);
    }
    // a square wasn't clicked
    else {
        alert("Canvas was clicked in bottom section.");
    }
}, false);






