var c = document.getElementById("mapContainer");
var cLeft = c.offsetLeft + c.clientLeft;
var cTop = c.offsetTop + c.clientTop;
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

// draw start and end
ctx.fillText("Start", 25 + 50 * startX, 25 + 50 * startY);
ctx.fillText("End", 25 + 50 * endX, 25 + 50 * endY);

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

c.addEventListener('click', function(event) {
    var screenX = event.pageX - cLeft;
    var screenY = event.pageY - cTop;
    var x = Math.floor(screenX / 50);
    var y = Math.floor(screenY / 50);
    if (y < 10) {
        alert("Square (" + x + ", " + y + ") was clicked.");
    }
    else {
        alert("Canvas was clicked in bottom section.");
    }
}, false);






