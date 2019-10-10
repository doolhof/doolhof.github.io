document.onkeydown = function(e){
	if(e.keyCode == "37"){//left
		move(-1,0);
	}
	if(e.keyCode == "38"){//up
		move(0,-1);
	}
	if(e.keyCode == "39"){//right
		move(1,0);
	}
	if(e.keyCode == "40"){//down
		move(0,1);
	}
}

canvas.ontouchstart = function(e){
	if(e.touches[0].clientY < canvas.height/4){
		move(0,-1);
	}
	else if(e.touches[0].clientY > canvas.height/4*3){
		move(0,1);
	}
	else if(e.touches[0].clientX < canvas.width/2){
		move(-1,0);
	}
	else if(e.touches[0].clientX > canvas.width/2){
		move(1,0);
	}
}

function move(x,y){
	var move = true;
	for(var j = 0; j < walls[player.x][player.y].length; j++){
		if(walls[player.x][player.y][j].x == player.x + x && walls[player.x][player.y][j].y == player.y + y){
			move = false;
		}
	}
	if(move){
		player.x += x;
		player.y += y;
		frame();
	}
}