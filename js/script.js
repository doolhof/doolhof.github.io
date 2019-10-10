var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.setAttribute("width", window.innerWidth);
canvas.setAttribute("height", window.innerHeight);

var walls = [];
var tiles = {x:[], y:[]};
var player;
var exit;

function frame(){
	//ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawWalls();
	if(player.x == exit.x && player.y == exit.y){
		alert("You won!");
		initMaze();
	}
}

function drawWalls(){
	var visibleTiles = getVisibleTiles(player.x,player.y);
	for(var i = 0; i < visibleTiles.length; i++){
		drawTileWalls(visibleTiles[i].x,visibleTiles[i].y);
	}
}

function getVisibleTiles(x,y){
	var visibleTileList = [{x:x, y:y}];
	directions = [{x:0, y:-1, wallx:0, wally:1},{x:1, y:0, wallx:-1, wally:0},{x:0, y:1, wallx:0, wally:-1},{x:-1, y:0, wallx:1,wally:0}];
	for(var i = 0; i < directions.length; i++){
		while(directions[i].x !== 0 || directions[i].y !== 0){
			if(walls[x+directions[i].x+directions[i].wallx] && walls[x+directions[i].x+directions[i].wallx][y+directions[i].y+directions[i].wally]){
				for(var j = 0; j < walls[x+directions[i].x+directions[i].wallx][y+directions[i].y+directions[i].wally].length; j++){
					if(walls[x+directions[i].x+directions[i].wallx][y+directions[i].y+directions[i].wally][j].x == x+directions[i].x && walls[x+directions[i].x+directions[i].wallx][y+directions[i].y+directions[i].wally][j].y == y+directions[i].y){
						directions[i] = {x:0, y:0, wallx:0, wally:0};
						break;
					}
				}
				if(directions[i].x !== 0 || directions[i].y !== 0){
					visibleTileList.push({x:x+directions[i].x,y:y+directions[i].y});
					directions[i].y -= directions[i].wally;
					directions[i].x -= directions[i].wallx;
				}
			}
			else{
				directions[i] = {x:0, y:0, wallx:0, wally:0};
			}
		}
	}
	return(visibleTileList);
}

function drawTileWalls(x,y){
	if(x==player.x&&y==player.y){ctx.fillStyle = "red"}
	else{ctx.fillStyle = "gray";}

	ctx.beginPath();
	ctx.rect(tiles.x[x]-gridSize/2,tiles.y[y]-gridSize/2,gridSize,gridSize);
	ctx.closePath();
	ctx.fill();

	ctx.fillStyle = "red";
	ctx.beginPath();
	ctx.arc(tiles.x[exit.x],tiles.y[exit.y],gridSize/2,0,Math.PI*2);
	ctx.closePath();
	ctx.fill();

	if(walls[x] && walls[x][y]){
		for(var i = 0; i < walls[x][y].length; i++){
			ctx.beginPath();
			ctx.moveTo((tiles.x[x]+tiles.x[walls[x][y][i].x])/2 - Math.abs(tiles.y[y]-tiles.y[walls[x][y][i].y])/2, (tiles.y[y]+tiles.y[walls[x][y][i].y])/2 - Math.abs(tiles.x[x]-tiles.x[walls[x][y][i].x])/2);
			ctx.lineTo((tiles.x[x]+tiles.x[walls[x][y][i].x])/2 + Math.abs(tiles.y[y]-tiles.y[walls[x][y][i].y])/2, (tiles.y[y]+tiles.y[walls[x][y][i].y])/2 + Math.abs(tiles.x[x]-tiles.x[walls[x][y][i].x])/2);
			ctx.closePath();
			ctx.stroke();
		}
	}
}

initMaze();