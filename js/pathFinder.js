var c = document.getElementById("mapContainer");
var ctx = c.getContext("2d");

var i;
var j;

var startX = 4,
    startY = 4,
    endX = 15,
    endY = 4;

var clickMode = "barrier";
var goStatus = "go";

// setup grid - 0:open, 1:blocked
var grid = [];
for (i = 0; i < 20; i++) {
    grid[i] = [];
    for (j = 0; j < 10; j++) {
        grid[i][j] = 0;
    }
}

// draw whole thing
drawMap();
drawButtons();
drawGo();


// ----------------------------------------------- end of setup
function drawMap () {
    // clear existing map
    ctx.beginPath();
    ctx.clearRect(0, 0, 1000, 500);
    ctx.fillStyle = "#000000";
    // draw grid
    for (i = 1; i < 20; i++) {
        ctx.moveTo(50 * i, 0);
        ctx.lineTo(50 * i, 500);
    }
    for (i = 1; i < 11; i++) {
        ctx.moveTo(0, 50 * i);
        ctx.lineTo(1000, 50 * i);
    }
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    // draw barriers
    for (i = 0; i < 20; i++) {
        for (j = 0; j < 10; j++) {
            if (grid[i][j] === 1) {
                barrier(i, j);
            }
        }
    }
    // draw start and end
    drawStart();
    drawEnd();
}


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

function drawGo () {
    ctx.fillRect(850, 525, 100, 50);
    if (goStatus === "go")
        ctx.fillStyle = "#00FF00";
    else if (goStatus === "going")
        ctx.fillStyle = "#00C000";
    else // goStatus === "clear"
        ctx.fillStyle = "#C00000";
    ctx.fillRect(855, 530, 90, 40);
    ctx.fillStyle = "#000000";
    ctx.fillText(goStatus, 860, 555);
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
        if (goStatus !== "go") return;
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
    grid[x][y] = 1;
}

function eraser (x, y) {
    if (squareTaken(x, y)) return;
    clear(x, y);
}

function clear (x, y) {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(50 * x + 5, 50 * y + 5, 40, 40);
    ctx.fillStyle = "#000000";
    grid[x][y] = 0;
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
        else if (850 < screenX && screenX < 950) {
            if (goStatus === "going") return;
            go ();
        }
    }
}

function go () {
    if (goStatus === "clear") {
        drawMap();
        goStatus = "go";
        drawGo();
    }
    else {
        goStatus = "going";
        drawGo();
        var searchType = document.getElementById("searchOptions").selectedIndex;
        if(searchType === 0) {
            BFS();
        }
        else {
            Dijkstra();
        }
        
    }
}

function doMoves(moves, searchGrid, depth) {
    for (var i = 0; i < moves.length; i++) {
        setTimeout(move, 100 * (i), moves[i][0], moves[i][1], moves[i][2], moves[i][3]);
    }
    setTimeout(endMoves, 100 * moves.length, searchGrid, depth);

    
}

function move(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(50 * x1 + 25, 50 * y1 + 25);
    ctx.lineTo(50 * x2 + 25, 50 * y2 + 25);
    ctx.stroke();
}

function endMoves(searchGrid, depth) {
    if (depth == -1)
        alert("No path was found.");
    else
        alert("A " + depth + " length path was found.");
    traceBack(searchGrid);
    goStatus = "clear";
    drawGo();
}





function traceBack(searchGrid) {
    var x = endX,
        y = endY;
    ctx.strokeStyle = "#0000FF";
    ctx.lineWidth = 4;
    while (searchGrid[x][y][0][0] !== -1) {
        ctx.beginPath();
        ctx.moveTo(50 * x + 25, 50 * y + 25);
        var cur = searchGrid[x][y][0];
        x = cur[0];
        y = cur[1];
        ctx.lineTo(50 * x + 25, 50 * y + 25);
        ctx.stroke();
    }
}






