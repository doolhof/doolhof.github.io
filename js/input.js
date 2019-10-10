document.onkeydown = function(e){
	if(e.keyCode == "37"){//left
		var move = true;
		for(var j = 0; j < walls[player.x][player.y].length; j++){
			if(walls[player.x][player.y][j].x == player.x-1 && walls[player.x][player.y][j].y == player.y){
				move = false;
			}
		}
		if(move){
			player.x--;
		}
	}
	if(e.keyCode == "38"){//up
		var move = true;
		for(var j = 0; j < walls[player.x][player.y].length; j++){
			if(walls[player.x][player.y][j].x == player.x && walls[player.x][player.y][j].y == player.y-1){
				move = false;
			}
		}
		if(move){
			player.y--;
		}
	}
	if(e.keyCode == "39"){//right
		var move = true;
		for(var j = 0; j < walls[player.x][player.y].length; j++){
			if(walls[player.x][player.y][j].x == player.x+1 && walls[player.x][player.y][j].y == player.y){
				move = false;
			}
		}
		if(move){
			player.x++;
		}
	}
	if(e.keyCode == "40"){//down
		var move = true;
		for(var j = 0; j < walls[player.x][player.y].length; j++){
			if(walls[player.x][player.y][j].x == player.x && walls[player.x][player.y][j].y == player.y+1){
				move = false;
			}
		}
		if(move){
			player.y++;
		}
	}
	frame();
}