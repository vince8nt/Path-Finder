alert("Testing Javascript");

var c = document.getElementById("mapContainer");
var ctx = c.getContext("2d");

// draw grid
var i;
for (i = 1; i < 20; i++) {
    ctx.moveTo(50 * i, 0);
    ctx.lineTo(50 * i, 500);
}
for (i = 1; i < 10; i++) {
    ctx.moveTo(0, 50 * i);
    ctx.lineTo(1000, 50 * i);
}
ctx.stroke();