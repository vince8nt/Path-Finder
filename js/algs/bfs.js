function BFS () {
    // setup BFSgrid - [[parent X, parent Y], depth]
    // undiscovered squares have depth -1
    var BFSgrid = [];
    for (i = 0; i < 20; i++) {
        BFSgrid[i] = [];
        for (j = 0; j < 10; j++) {
            BFSgrid[i][j] = [[-1, -1], -1];
        }
    }

    var moves = [];

    var Q = [[startX, startY]];
    BFSgrid[startX][startY][1] = 0; // set depth to 0
    ctx.strokeStyle = "#9090FF";
    ctx.lineWidth = 2;
    while (Q.length !== 0) {
        var cur = Q.shift();
        var x = cur[0],
            y = cur[1];
        var depth = BFSgrid[x][y][1];
        if (x === endX && y === endY) {
            doMoves(moves, BFSgrid, depth);
            return;
        }
        // check all edges
        // left
        if (x > 0 && grid[x - 1][y] === 0 && BFSgrid[x - 1][y][1] === -1) {
            BFSgrid[x - 1][y][0] = [x, y]; // set parent
            BFSgrid[x - 1][y][1] = depth + 1; // set depth
            Q.push([x - 1, y]);
            // draw line there
            moves.push([x, y, x - 1, y]);
        }
        // right
        if (x < 19 && grid[x + 1][y] === 0 && BFSgrid[x + 1][y][1] === -1) {
            BFSgrid[x + 1][y][0] = [x, y]; // set parent
            BFSgrid[x + 1][y][1] = depth + 1; // set depth
            Q.push([x + 1, y]);
            // draw line there
            moves.push([x, y, x + 1, y]);
        }
        // up
        if (y > 0 && grid[x][y - 1] === 0 && BFSgrid[x][y - 1][1] === -1) {
            BFSgrid[x][y - 1][0] = [x, y]; // set parent
            BFSgrid[x][y - 1][1] = depth + 1; // set depth
            Q.push([x, y - 1]);
            // draw line there
            moves.push([x, y, x, y - 1]);
        }
        // down
        if (y < 9 && grid[x][y + 1] === 0 && BFSgrid[x][y + 1][1] === -1) {
            BFSgrid[x][y + 1][0] = [x, y]; // set parent
            BFSgrid[x][y + 1][1] = depth + 1; // set depth
            Q.push([x, y + 1]);
            // draw line there
            moves.push([x, y, x, y + 1]);
        }
    }
    doMoves(moves, BFSgrid, -1);
}