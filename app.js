var context;
var shape = new Object();
var board;
var score;
var pac_color;
var monster_color; //color for the monsters
var epic_food_color; // good food
var legendary_food_color; // best food
var common_food_color; // simple food
var start_time;
var time_elapsed;
var interval;

$(document).ready(function () {
	context = canvas.getContext("2d");
	Start();
});

function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	monster_color = "red";
	epic_food_color = "orange";
	legendary_food_color = "purple";
	common_food_color = "black";
	var cnt = 20 * 15;
	var food_remain = 50;
	var legendary_food_remain = parseInt(food_remain * 0.1);
	var epic_food_remain = parseInt(food_remain * 0.3);
	var common_food_remain = parseInt(food_remain * 0.6);
	var pacman_remain = 1;
	//var monster_remains = 4; //monsters variable
	start_time = new Date();
	for (var i = 0; i < 20; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 15; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else if ((i == 0 && j == 0) || (i == 0 && j == 14) || (i == 19 && j == 0) || (i == 19 && j == 14)) {
				board[i][j] = 8;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					var food_color = Math.random();
					if (food_color >= 0.9 && legendary_food_remain > 0) {
						board[i][j] = 11;
						food_remain--;
						legendary_food_remain--;
					} else if (food_color >= 0.6 && epic_food_remain > 0) {
						board[i][j] = 12;
						food_remain--;
						epic_food_remain--;
					} else if (common_food_color > 0) {
						board[i][j] = 13;
						common_food_remain--;
						food_remain--;
					}
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0 || pacman_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		if (common_food_remain > 0) {
			board[emptyCell[0]][emptyCell[1]] = 13;
			common_food_remain--;
		} else if (epic_food_remain > 0) {
			board[emptyCell[0]][emptyCell[1]] = 12;
			epic_food_remain--;
		}
		else if (pacman_remain > 0) {
			shape.i = i;
			shape.j = j;
			pacman_remain--;
			board[i][j] = 2;
		}
		else if (legendary_food_remain > 0) {
			board[emptyCell[0]][emptyCell[1]] = 11;
			legendary_food_remain--;
		}
		food_remain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function (e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function (e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 19 + 1);
	var j = Math.floor(Math.random() * 14 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 19 + 1);
		j = Math.floor(Math.random() * 14 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[38]) {
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 15; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 13) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = common_food_color; //color
				context.fill();
			} else if (board[i][j] == 12) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = epic_food_color; //color
				context.fill();
			} else if (board[i][j] == 11) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = legendary_food_color; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			} else if (board[i][j] == 8) {
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = monster_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = monster_color; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 14 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 19 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 11) {
		score = score + 25;
	}
	if (board[shape.i][shape.j] == 12) {
		score = score + 15;
	} 
	if (board[shape.i][shape.j] == 13) {
		score = score + 5;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score >= 100) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}
