function Dijkstra() {
    var searchGrid = [];
    for (i = 0; i < 20; i++) {
        searchGrid[i] = [];
        for (j = 0; j < 10; j++) {
            searchGrid[i][j] = [[-1, -1], -1, true];
        }
    }

    var moves = [];

    searchGrid[startX][startY][1] = 0; // set depth to 0
    ctx.strokeStyle = "#9090FF";
    ctx.lineWidth = 2;

    while (true) {
        // find shortest move
        var x = -1,
            y = -1;
        var min = -1;
        for (i = 0; i < 20; i++) {
            for (j = 0; j < 10; j++) {
                if (searchGrid[i][j][2]) {
                    var temp = searchGrid[i][j][1];
                    if (temp !== -1) {
                        if (min === -1) {
                            min = temp;
                            x = i;
                            y = j;
                        }
                        else {
                            if (temp < min) {
                                min = temp;
                                x = i;
                                y = j;
                            }
                        }
                    }
                }
            }
        }
        // no move found
        if (min === -1) {
            doMoves(moves, searchGrid, -1);
            return;
        }
        // remove tile
        searchGrid[x][y][2] = false;
        // path found
        if (x === endX && y === endY) {
            doMoves(moves, searchGrid, searchGrid[x][y][1]);
            return;
        }
        // try all neighbors
        neighbor(x - 1, y, x, y, searchGrid, moves);
        neighbor(x + 1, y, x, y, searchGrid, moves);
        neighbor(x, y - 1, x, y, searchGrid, moves);
        neighbor(x, y + 1, x, y, searchGrid, moves);
        neighbor(x - 1, y - 1, x, y, searchGrid, moves);
        neighbor(x - 1, y + 1, x, y, searchGrid, moves);
        neighbor(x + 1, y - 1, x, y, searchGrid, moves);
        neighbor(x + 1, y + 1, x, y, searchGrid, moves);
    }
}

function neighbor(x, y, orX, orY, searchGrid, moves) { // for dijkstra
    if (-1 < x && -1 < y && 20 > x && 10 > y && grid[x][y] === 0) {
        if (x !== orX && y !== orY) {
            if (grid[orX][y] === 1 || grid[x][orY] === 1) {
                return;
            }
        }
        var dist = searchGrid[orX][orY][1];
        dist += Math.sqrt(Math.abs(x - orX) + Math.abs(y - orY));
        dist = Math.round(dist * 1000) / 1000; // fix rounding error
        if (searchGrid[x][y][1] === -1 || dist < searchGrid[x][y][1]) {
            searchGrid[x][y][1] = dist;
            searchGrid[x][y][0] = [orX, orY];
            moves.push([orX, orY, x, y]);
        }
    }
}