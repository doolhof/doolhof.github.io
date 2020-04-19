var grid = [];
var lines = [];

var gridSize = 10;
var showMaze = false;
var showPath = true;
var lineCount = 50;
var lineSpeed = 1;

function initMaze(){
	initGrid();
	lines = [];
	for(var i = 0; i < lineCount; i++){lines.push({currentDot:false, nextDot:false})};
	player = {x:false, y:false};
	maze();
}

function finishMaze(){
	alert("Use the arrow keys to move around, try to get to the red circle in the middle.");
	if(!showMaze){ctx.clearRect(0, 0, canvas.width, canvas.height);}
	player = {x:Math.floor(Math.random()*(tiles.x.length-2)+1), y:Math.floor(Math.random()*(tiles.y.length-2)+1)};
	exit = {x:Math.floor(tiles.x.length/2), y:Math.floor(tiles.y.length/2)};
	frame();
}

function initGrid(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.lineWidth = 1;
	ctx.strokeStyle = "white";
	ctx.fillStyle = "white";

	createGrid();
}

function maze(){
	for(var i = 0; i < lineCount; i++){
		for(var j = 0; j < lineSpeed; j++){
			if(grid.length>0){
				createMaze(i);
				drawMaze(i);
			}
		}
	}
	if(grid.length>0){
		requestAnimationFrame(maze);
	}
	else{
		finishMaze();
	}
}

function createGrid(){
	grid = [];
	tiles = {x:[], y:[]};
	for(var y = 0; y <= canvas.height; y+=gridSize){
		tiles.y.push(y-gridSize/2);
		if(y+gridSize > canvas.height){tiles.y.push(y+gridSize/2);}
		for(var x = 0; x <= canvas.width; x+=gridSize){
			if(y==0){tiles.x.push(x-gridSize/2)};
			if(x+gridSize > canvas.width && y==0){tiles.x.push(x+gridSize/2);}
			if(0 < x && x + gridSize < canvas.width && 0 < y && y + gridSize < canvas.height)
				grid.push({x:x, y:y});
		}
	}

	walls = [];
	for(var i = 0; i < tiles.x.length; i++){
		walls.push([]);
		for(var j = 0; j < tiles.y.length; j++){
			walls[i].push([]);
		}
	}

	for(var i = 0; i < tiles.x.length; i++){
		walls[i][0].push({x:i,y:1});
		walls[i][1].push({x:i,y:0});

		walls[i][tiles.y.length-1].push({x:i,y:tiles.y.length-2});
		walls[i][tiles.y.length-2].push({x:i,y:tiles.y.length-1});
	}

	for(var i = 0; i < tiles.y.length; i++){
		walls[0][i].push({x:1,y:i});
		walls[1][i].push({x:0,y:i});

		walls[tiles.x.length-1][i].push({x:tiles.x.length-2,y:i});
		walls[tiles.x.length-2][i].push({x:tiles.x.length-1,y:i});
	}
}

function createMaze(i){
	if(!lines[i].nextDot){
		var randomIndex = Math.floor(Math.random()*grid.length);
		lines[i].nextDot = grid[randomIndex];
		grid.splice(randomIndex, 1);
	}
	lines[i].currentDot = lines[i].nextDot;
	closePoints = [];
	for(var j = 0; j < grid.length; j++){
		if(Math.hypot(lines[i].currentDot.x-grid[j].x, lines[i].currentDot.y-grid[j].y) <= Math.hypot(gridSize/2, gridSize)){
			closePoints.push(j);
		}
	}
	var randomIndex = closePoints[Math.floor(Math.random()*closePoints.length)];
	if(closePoints.length == 0){
		randomIndex = Math.floor(Math.random()*grid.length);
		lines[i].currentDot = false;
	}
	lines[i].nextDot = grid[randomIndex]
	grid.splice(randomIndex, 1);
}

function drawMaze(i){
	if(lines[i].currentDot && lines[i].nextDot && lines[i].currentDot !== lines[i].nextDot){
		ctx.beginPath();
		ctx.moveTo(lines[i].currentDot.x, lines[i].currentDot.y);
		ctx.lineTo(lines[i].nextDot.x, lines[i].nextDot.y);
		ctx.closePath();
		ctx.stroke();

		var wallTile1 = {x:tiles.x.indexOf((lines[i].currentDot.x+lines[i].nextDot.x)/2 - Math.abs(lines[i].currentDot.y-lines[i].nextDot.y)/2), y:tiles.y.indexOf((lines[i].currentDot.y+lines[i].nextDot.y)/2 - Math.abs(lines[i].currentDot.x-lines[i].nextDot.x)/2)};
		var wallTile2 = {x:tiles.x.indexOf((lines[i].currentDot.x+lines[i].nextDot.x)/2 + Math.abs(lines[i].currentDot.y-lines[i].nextDot.y)/2), y:tiles.y.indexOf((lines[i].currentDot.y+lines[i].nextDot.y)/2 + Math.abs(lines[i].currentDot.x-lines[i].nextDot.x)/2)};

		walls[wallTile1.x][wallTile1.y].push(wallTile2);
		walls[wallTile2.x][wallTile2.y].push(wallTile1);
	}
}
