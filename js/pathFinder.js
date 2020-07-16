alert("Testing Javascript");

var c = document.getElementById("mapContainer");
var ctx = c.getContext("2d");

var i;
var j;

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
for (i = 1; i < 10; i++) {
    ctx.moveTo(0, 50 * i);
    ctx.lineTo(1000, 50 * i);
}
ctx.stroke();

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

