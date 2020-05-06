var context;
var x; //the object to decide what key the user clicked (created by Dvir, I made it a global var)
var shape = new Object();
var first_monster = new Object();
var second_monster = new Object();
var third_monster = new Object();
var fourth_monster = new Object();
var bonus_figure = new Object(); //the moving figure for bonus points
var bonus_eaten = false;
var board;
var score;
var numOfLives = 5;
var numberOfMonsters;
var pac_color;
var food_remain;
var food_remian_ingame;
var monster_color; //color for the monsters
var epic_food_color; // good food
var legendary_food_color; // best food
var common_food_color; // simple food
var start_time;
var time_elapsed;
var interval;
var monsters_interval;
var food = []; //holds the locations and colors of the food
var food_i;
var food_j;
var food_color;
var monster_caught_packman; //indicates if pacman was caught by a monster
var packman_caught_by_monster; //indicates if pacman was caught by a monster
var pacman_image_right = new Image();
var pacman_image_left = new Image();
var pacman_image_up = new Image();
var pacman_image_down = new Image();
var current_pacman_image = new Image();
pacman_image_right.src = "./resources/pacman_right.png";
pacman_image_left.src = "./resources/pacman_left.png";
pacman_image_up.src = "./resources/pacman_up.png";
pacman_image_down.src = "./resources/pacman_down.png";
current_pacman_image.src = "./resources/pacman_right.png";
hourglass_image = new Image();
hourglass_image.src = "./resources/hourglass.png";
medkit_image = new Image();
medkit_image.src = "./resources/medkit.png";
var first_monster_image = new Image();
var second_monster_image = new Image();
var third_monster_image = new Image();
var fourth_monster_image = new Image();
first_monster_image.src = "./resources/first_monster.png";
second_monster_image.src = "./resources/second_monster.png";
third_monster_image.src = "./resources/third_monster.png";
fourth_monster_image.src = "./resources/fourth_monster.png";
var bonus_figure_image = new Image();
bonus_figure_image.src = "./resources/cherry.png";
var gameSound = new Audio("./resources/gameSong.mp3");
gameSound.volume = 0.05;
var deathSound = new Audio("./resources/deathSound.mp3");
var timeForGame;
var upwardsKey;
var downwardsKey;
var rightKey;
var leftKey;
var columns = 16;
var rows = 16;
var show_hourglass;
var hourglass = new Object();
var hourglass_eaten;
var show_medkit;
var medkit = new Object();
var medkit_eaten;
var foodForLabel;
/*
$(document).ready(function () {
	context = canvas.getContext("2d");
	Start();
});
*/

function Start() {
	context = canvas.getContext("2d");
	board = new Array();
	score = 0;
	//pac_color = "yellow";
	//monster_color = "red";
	bonus_eaten = false;
	hourglass_eaten = false;
	medkit_eaten = false;
	numOfLives = 5;
	//epic_food_color = "orange";
	//legendary_food_color = "purple";
	//common_food_color = "black";
	defineGameSettings();
	var cnt = 20 * 15;
	var legendary_food_remain = parseInt(food_remain * 0.1);
	var epic_food_remain = parseInt(food_remain * 0.3);
	var common_food_remain = parseInt(food_remain * 0.6);
	while (food_remain != (legendary_food_remain + epic_food_remain + common_food_remain)) { //make sure the numbers match
		common_food_remain = common_food_remain + (food_remain - legendary_food_remain - epic_food_remain - common_food_remain);
	}
	var pacman_remain = 1;
	var figure_remain = 1;
	//var monster_remains = 4; //monsters variable
	start_time = new Date();
	for (var i = 0; i < columns; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < rows; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 13 && j == 12) ||
				(i == 13 && j == 11) ||
				(i == 8 && j == 8) ||
				(i == 9 && j == 8) ||
				(i == 10 && j == 8) ||
				(i == 9 && j == 3) ||
				(i == 10 && j == 3) ||
				(i == 11 && j == 3) ||
				(i == 2 && j == 13) ||
				(i == 3 && j == 13) 
			) {
				board[i][j] = 4;
			} else if (i == 0 && j == 0) {
				board[i][j] = 6;
			} else if (i == 0 && j == rows - 1 && numberOfMonsters > 1) {
				board[i][j] = 7;
			} else if (i == columns - 1 && j == 0 && numberOfMonsters > 2) {
				board[i][j] = 8;
			} else if (i == columns - 1 && j == rows - 1 && numberOfMonsters > 3) {
				board[i][j] = 9;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					var food_color = Math.random();
					if (food_color >= 0.9 && legendary_food_remain > 0) {
						board[i][j] = 11;
						food_remain--;
						legendary_food_remain--;
						food_i = i;
						food_j = j;
						food_color = legendary_food_color;
						let element = { food_i, food_j, food_color };
						food.push(element);
					} else if (food_color >= 0.6 && epic_food_remain > 0) {
						board[i][j] = 12;
						food_remain--;
						epic_food_remain--;
						food_i = i;
						food_j = j;
						food_color = epic_food_color;
						let element = { food_i, food_j, food_color };
						food.push(element);
					} else if (common_food_color > 0) {
						board[i][j] = 13;
						common_food_remain--;
						food_remain--;
						food_i = i;
						food_j = j;
						food_color = common_food_color;
						let element = { i, j, common_food_color };
						food.push(element);
					}
					/*
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
					*/
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	//initialize monster's locations
	first_monster.i = 0;
	first_monster.j = 0;
	second_monster.i = 0;
	second_monster.j = rows - 1;
	third_monster.i = columns - 1;
	third_monster.j = 0;
	fourth_monster.i = columns - 1;
	fourth_monster.j = rows - 1;
	let hourglass_remain = 1;
	let medkit_remain = 1;
	while (food_remain > 0 || pacman_remain > 0 || figure_remain > 0 || hourglass_remain > 0 || medkit_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		food_i = emptyCell[0];
		food_j = emptyCell[1];
		if (common_food_remain > 0) {
			board[emptyCell[0]][emptyCell[1]] = 13;
			common_food_remain--;
			food_remain--;
			food_color = common_food_color;
			let element = { food_i, food_j, food_color };
			food.push(element);
		} else if (epic_food_remain > 0) {
			board[emptyCell[0]][emptyCell[1]] = 12;
			epic_food_remain--;
			food_remain--;
			food_color = epic_food_color;
			let element = { food_i, food_j, food_color };
			food.push(element);
		}
		else if (pacman_remain > 0) {
			shape.i = emptyCell[0];
			shape.j = emptyCell[1];
			pacman_remain--;
			board[emptyCell[0]][emptyCell[1]] = 2;
		}
		else if (legendary_food_remain > 0) {
			board[emptyCell[0]][emptyCell[1]] = 11;
			legendary_food_remain--;
			food_remain--;
			food_color = legendary_food_color;
			let element = { food_i, food_j, food_color };
			food.push(element);
		}
		else if (figure_remain > 0) {
			if (numberOfMonsters == 4) {
				board[emptyCell[0]][emptyCell[1]] = 5;
				bonus_figure.i = emptyCell[0];
				bonus_figure.j = emptyCell[1];
			}
			else {
				board[columns - 1][rows - 1] = 5;
				bonus_figure.i = columns-1;
				bonus_figure.j = rows-1;
			}
			figure_remain--;
		}
		else if (hourglass_remain > 0) {
			hourglass.i = emptyCell[0];
			hourglass.j = emptyCell[1];
			hourglass_remain--;
		}
		else if (medkit_remain > 0) {
			medkit.i = emptyCell[0];
			medkit.j = emptyCell[1];
			medkit_remain--;
		}
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

	interval = setInterval(UpdatePosition, 150);
	monsters_interval = setInterval(updateMonsterPosition, 250);
	gameSound.play();

}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * columns - 1 + 1);
	var j = Math.floor(Math.random() * rows - 1 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * columns - 1 + 1);
		j = Math.floor(Math.random() * rows - 1 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[upwardsKey]) {
		return 1;
	}
	if (keysDown[downwardsKey]) {
		return 2;
	}
	if (keysDown[leftKey]) {
		return 3;
	}
	if (keysDown[rightKey]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	document.getElementById("lblScore").innerHTML = score;
	document.getElementById("lblTime").innerHTML = time_elapsed;
	document.getElementById("lblLives").innerHTML = numOfLives;
	for (var i = 0; i < columns; i++) {
		for (var j = 0; j < rows; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				if (x == 1) {
					context.drawImage(pacman_image_up, i * 60, j * 60, 45, 45);
					current_pacman_image.src = "./resources/pacman_up.png";
				} else if (x == 2) {
					context.drawImage(pacman_image_down, i * 60, j * 60, 45, 45);
					current_pacman_image.src = "./resources/pacman_down.png";
				} else if (x == 3) {
					context.drawImage(pacman_image_left, i * 60, j * 60, 45, 45);
					current_pacman_image.src = "./resources/pacman_left.png";
				} else if (x == 4) {
					context.drawImage(pacman_image_right, i * 60, j * 60, 45, 45);
					current_pacman_image.src = "./resources/pacman_right.png";
				} else {
					context.drawImage(current_pacman_image, i * 60, j * 60, 45, 45);
				}
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
				context.fillStyle = "#bfbfbf"; //color
				context.stroke();
				context.fill();
			} else if (board[i][j] == 6) {
				context.drawImage(first_monster_image, i * 60, j * 60, 45, 45);
			} else if (board[i][j] == 7) {
				context.drawImage(second_monster_image, i * 60, j * 60, 45, 45);
			} else if (board[i][j] == 8) {
				context.drawImage(third_monster_image, i * 60, j * 60, 45, 45);
			} else if (board[i][j] == 9) {
				context.drawImage(fourth_monster_image, i * 60, j * 60, 45, 45);
			} else if (board[i][j] == 5) {
				context.drawImage(bonus_figure_image, i * 60, j * 60, 30, 30);
			} else if (board[i][j] == 3) {
				context.drawImage(hourglass_image, i * 60, j * 60, 30, 30);
			} else if (board[i][j] == 17) {
				context.drawImage(medkit_image, i * 60, j * 60, 30, 30);
			}
			checkFoodLocations();
			redrawFood();
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	packman_caught_by_monster = false;
	x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
			if (board[shape.i][shape.j] == 6 ||
				board[shape.i][shape.j] == 7 ||
				board[shape.i][shape.j] == 8 ||
				board[shape.i][shape.j] == 9
			) {
				eatenByMonster();
				packman_caught_by_monster = true;
			}
		}
	}
	if (x == 2) {
		if (shape.j < rows - 1 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
			if (board[shape.i][shape.j] == 6 ||
				board[shape.i][shape.j] == 7 ||
				board[shape.i][shape.j] == 8 ||
				board[shape.i][shape.j] == 9
			) {
				eatenByMonster();
				packman_caught_by_monster = true;
			}
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
			if (board[shape.i][shape.j] == 6 ||
				board[shape.i][shape.j] == 7 ||
				board[shape.i][shape.j] == 8 ||
				board[shape.i][shape.j] == 9
			) {
				eatenByMonster();
				packman_caught_by_monster = true;
			}
		}
	}
	if (x == 4) {
		if (shape.i < columns - 1 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
			if (board[shape.i][shape.j] == 6 ||
				board[shape.i][shape.j] == 7 ||
				board[shape.i][shape.j] == 8 ||
				board[shape.i][shape.j] == 9
			) {
				eatenByMonster();
				packman_caught_by_monster = true;
			}
		}
	}
	if (bonus_figure.i == shape.i && bonus_figure.j == shape.j && !bonus_eaten) {
		score = score + 50;
		bonus_eaten = true;
	}
	if (board[shape.i][shape.j] == 11) {
		score = score + 25;
		food_remian_ingame--;
	}
	if (board[shape.i][shape.j] == 12) {
		score = score + 15;
		food_remian_ingame--;
	}
	if (board[shape.i][shape.j] == 13) {
		score = score + 5;
		food_remian_ingame--;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	//time_elapsed = (currentTime - start_time) / 1000;
	//if (score >= 100) {
	//	gameSound.pause();
	//window.clearInterval(interval);
	//	clearInterval(monsters_interval);
	//	window.alert("Game completed");
	//}
	if (hourglass_eaten) {
		time_elapsed = parseInt(timeForGame - ((currentTime - start_time) / 1000)) + 15;
	} else {
		time_elapsed = parseInt(timeForGame - ((currentTime - start_time) / 1000));
	}
	if (time_elapsed <= show_hourglass && time_elapsed > show_hourglass - 10 && !hourglass_eaten) {
		allowShowingHourglass();
	}
	if (!hourglass_eaten && time_elapsed <= show_hourglass - 10 && board[hourglass.i][hourglass.j] == 3) {
		board[hourglass.i][hourglass.j] = 0;
	}
	if (time_elapsed <= show_medkit && !medkit_eaten) {
		allowShowingMedkit();
	}
	if (food_remian_ingame <= 0 && bonus_eaten) {
		gameSound.pause()
		window.clearInterval(interval);
		window.clearInterval(monsters_interval);;
		window.alert("Winner!!!");
	} else if (time_elapsed <= 0) {
		if (score < 100) {
			gameSound.pause()
			deathSound.play();
			window.clearInterval(interval);
			window.clearInterval(monsters_interval);;
			window.alert("You are better than " + score + " points!");
		}
		else {
			gameSound.pause();
			window.clearInterval(interval);
			window.clearInterval(monsters_interval);
			window.alert("Winner!!!");
		}
	}
	else {
		Draw();
	}
}

function eatenByMonster() {
	numOfLives--;
	score = score - 10;
	//stop music and play a lost music
	if (numOfLives > 0) {
		//clean the pacman from the current location
		board[shape.i][shape.j] = 0;
		//put the pacman in a random place
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 2;
		//repositon shape
		shape.i = emptyCell[0];
		shape.j = emptyCell[1];
		//clean the mosters from their current location
		board[first_monster.i][first_monster.j] = 0;
		board[second_monster.i][second_monster.j] = 0;
		board[third_monster.i][third_monster.j] = 0;
		board[fourth_monster.i][fourth_monster.j] = 0;
		//put the monsters on the corner of the board
		board[0][0] = 6;
		if (numberOfMonsters > 1) {
			board[0][rows - 1] = 7;
		}
		if (numberOfMonsters > 2) {
			board[columns - 1][0] = 8;
		}
		if (numberOfMonsters > 3) {
			board[columns - 1][rows - 1] = 9;
		}
		//reposition the monsters objects
		first_monster.i = 0;
		first_monster.j = 0;
		second_monster.i = 0;
		second_monster.j = rows - 1;
		third_monster.i = columns - 1;
		third_monster.j = 0;
		fourth_monster.i = columns - 1;
		fourth_monster.j = rows - 1;
	}
	else {
		deathSound.play();
		gameSound.pause();
		window.clearInterval(interval); //ends the game, edit later
		window.clearInterval(monsters_interval);
		window.alert("Loser!");
	}
}

function moveBonusFigure() {

	board[bonus_figure.i][bonus_figure.j] = 0;
	if (bonus_figure.i == shape.i && bonus_figure.j == shape.j) {
		score = score + 50;
		bonus_eaten = true;
	} else {
		var keep_loop = true;
		while (keep_loop == true) {
			var direction = Math.random();
			if (direction >= 0.75 && bonus_figure.j < rows - 1 && board[bonus_figure.i][bonus_figure.j + 1] != 4) {
				bonus_figure.j++;
				keep_loop = false;
			} else if (direction >= 0.5 && bonus_figure.j > 0 && board[bonus_figure.i][bonus_figure.j - 1] != 4) {
				bonus_figure.j--;
				keep_loop = false;
			} else if (direction >= 0.25 && bonus_figure.i < columns - 1 && board[bonus_figure.i + 1][bonus_figure.j] != 4) {
				bonus_figure.i++;
				keep_loop = false;
			} else if (bonus_figure.i > 0 && board[bonus_figure.i - 1][bonus_figure.j] != 4) {
				bonus_figure.i--;
				keep_loop = false;
			}
		}
		if (bonus_figure.i == shape.i && bonus_figure.j == shape.j) {
			board[bonus_figure.i][bonus_figure.j] = 0;
			score = score + 50;
			bonus_eaten = true;
		}
	}
}

function checkFoodLocations() {
	let temp = [];
	let element;
	while (food.length > 0) {
		element = food.pop();
		if (board[element.food_i][element.food_j] != 2) {
			temp.push(element);
		}
	}
	while (temp.length > 0) {
		food.push(temp.pop());
	}
}

function redrawFood() {
	for (let index = 0; index < food.length; index++) {
		let element = food[index];
		if (board[element.food_i][element.food_j] == 0) {
			if (element.food_color == legendary_food_color) {
				board[element.food_i][element.food_j] = 11;
			} else if (element.food_color == epic_food_color) {
				board[element.food_i][element.food_j] = 12;
			} else {
				board[element.food_i][element.food_j] = 13;
			}
		}
	}
}

function moveMonstersRandomly() {
	//check if one of the monsters stand on pacman before moving
	if ((shape.i == first_monster.i && shape.j == first_monster.j) ||
		(shape.i == second_monster.i && shape.j == second_monster.j) ||
		(shape.i == third_monster.i && shape.j == third_monster.j) ||
		(shape.i == fourth_monster.i && shape.j == fourth_monster.j)) {
		eatenByMonster();
	}
	//first monster movement
	else {
		let first_monster_move = Math.random();
		if (first_monster_move >= 0.75) {
			if (first_monster.j < rows - 1 && board[first_monster.i][first_monster.j + 1] != 4) {
				first_monster.j++;
			} else if (first_monster.j > 0 && board[first_monster.i][first_monster.j - 1] != 4) {
				first_monster.j--;
			} else if (first_monster.i > 0 && board[first_monster.i - 1][first_monster.j] != 4) {
				first_monster.i--;
			} else if (first_monster.i < columns - 1 && board[first_monster.i + 1][first_monster.j] != 4) {
				first_monster.i++;
			}
		} else if (first_monster_move >= 0.5) {
			if (first_monster.i < columns - 1 && board[first_monster.i + 1][first_monster.j] != 4) {
				first_monster.i++;
			} else if (first_monster.i > 0 && board[first_monster.i - 1][first_monster.j] != 4) {
				first_monster.i--;
			} else if (first_monster.j > 0 && board[first_monster.i][first_monster.j - 1] != 4) {
				first_monster.j--;
			} else if (first_monster.j < rows - 1 && board[first_monster.i][first_monster.j + 1] != 4) {
				first_monster.j++;
			}
		} else if (first_monster_move >= 0.25) {
			if (first_monster.i > 0 && board[first_monster.i - 1][first_monster.j] != 4) {
				first_monster.i--;
			} else if (first_monster.i < columns - 1 && board[first_monster.i + 1][first_monster.j] != 4) {
				first_monster.i++;
			} else if (first_monster.j > 0 && board[first_monster.i][first_monster.j - 1] != 4) {
				first_monster.j--;
			} else if (first_monster.j < rows - 1 && board[first_monster.i][first_monster.j + 1] != 4) {
				first_monster.j++;
			}
		} else {
			if (first_monster.j > 0 && board[first_monster.i][first_monster.j - 1] != 4) {
				first_monster.j--;
			} else if (first_monster.j < rows - 1 && board[first_monster.i][first_monster.j + 1] != 4) {
				first_monster.j++;
			} else if (first_monster.i > 0 && board[first_monster.i - 1][first_monster.j] != 4) {
				first_monster.i--;
			} else if (first_monster.i < columns - 1 && board[first_monster.i + 1][first_monster.j] != 4) {
				first_monster.i++;
			}
		}

		//second monster movement

		let second_monster_move = Math.random();
		if (second_monster_move >= 0.75) {
			if (second_monster.j < rows - 1 && board[second_monster.i][second_monster.j + 1] != 4) {
				second_monster.j++;
			} else if (second_monster.j > 0 && board[second_monster.i][second_monster.j - 1] != 4) {
				second_monster.j--;
			} else if (second_monster.i > 0 && board[second_monster.i - 1][second_monster.j] != 4) {
				second_monster.i--;
			} else if (second_monster.i < columns - 1 && board[second_monster.i + 1][second_monster.j] != 4) {
				second_monster.i++;
			}
		} else if (second_monster_move >= 0.5) {
			if (second_monster.i < columns - 1 && board[second_monster.i + 1][second_monster.j] != 4) {
				second_monster.i++;
			} else if (second_monster.i > 0 && board[second_monster.i - 1][second_monster.j] != 4) {
				second_monster.i--;
			} else if (second_monster.j > 0 && board[second_monster.i][second_monster.j - 1] != 4) {
				second_monster.j--;
			} else if (second_monster.j < rows - 1 && board[second_monster.i][second_monster.j + 1] != 4) {
				second_monster.j++;
			}
		} else if (second_monster_move >= 0.25) {
			if (second_monster.i > 0 && board[second_monster.i - 1][second_monster.j] != 4) {
				second_monster.i--;
			} else if (second_monster.i < columns - 1 && board[second_monster.i + 1][second_monster.j] != 4) {
				second_monster.i++;
			} else if (second_monster.j > 0 && board[second_monster.i][second_monster.j - 1] != 4) {
				second_monster.j--;
			} else if (second_monster.j < rows - 1 && board[second_monster.i][second_monster.j + 1] != 4) {
				second_monster.j++;
			}
		} else {
			if (second_monster.j > 0 && board[second_monster.i][second_monster.j - 1] != 4) {
				second_monster.j--;
			} else if (second_monster.j < rows - 1 && board[second_monster.i][second_monster.j + 1] != 4) {
				second_monster.j++;
			} else if (second_monster.i > 0 && board[second_monster.i - 1][second_monster.j] != 4) {
				second_monster.i--;
			} else if (second_monster.i < columns - 1 && board[second_monster.i + 1][second_monster.j] != 4) {
				second_monster.i++;
			}
		}

		//third monster movement
		let third_monster_move = Math.random();
		if (third_monster_move >= 0.75) {
			if (third_monster.j < rows - 1 && board[third_monster.i][third_monster.j + 1] != 4) {
				third_monster.j++;
			} else if (third_monster.j > 0 && board[third_monster.i][third_monster.j - 1] != 4) {
				third_monster.j--;
			} else if (third_monster.i > 0 && board[third_monster.i - 1][third_monster.j] != 4) {
				third_monster.i--;
			} else if (third_monster.i < columns - 1 && board[third_monster.i + 1][third_monster.j] != 4) {
				third_monster.i++;
			}
		} else if (third_monster_move >= 0.5) {
			if (third_monster.i < columns - 1 && board[third_monster.i + 1][third_monster.j] != 4) {
				third_monster.i++;
			} else if (third_monster.i > 0 && board[third_monster.i - 1][third_monster.j] != 4) {
				third_monster.i--;
			} else if (third_monster.j > 0 && board[third_monster.i][third_monster.j - 1] != 4) {
				third_monster.j--;
			} else if (third_monster.j < rows - 1 && board[third_monster.i][third_monster.j + 1] != 4) {
				third_monster.j++;
			}
		} else if (third_monster_move >= 0.25) {
			if (third_monster.i > 0 && board[third_monster.i - 1][third_monster.j] != 4) {
				third_monster.i--;
			} else if (third_monster.i < columns - 1 && board[third_monster.i + 1][third_monster.j] != 4) {
				third_monster.i++;
			} else if (third_monster.j > 0 && board[third_monster.i][third_monster.j - 1] != 4) {
				third_monster.j--;
			} else if (third_monster.j < rows - 1 && board[third_monster.i][third_monster.j + 1] != 4) {
				third_monster.j++;
			}
		} else {
			if (third_monster.j > 0 && board[third_monster.i][third_monster.j - 1] != 4) {
				third_monster.j--;
			} else if (third_monster.j < rows - 1 && board[third_monster.i][third_monster.j + 1] != 4) {
				third_monster.j++;
			} else if (third_monster.i > 0 && board[third_monster.i - 1][third_monster.j] != 4) {
				third_monster.i--;
			} else if (third_monster.i < columns - 1 && board[third_monster.i + 1][third_monster.j] != 4) {
				third_monster.i++;
			}
		}

		//fourth monster movement
		let fourth_monster_move = Math.random();
		if (fourth_monster_move >= 0.75) {
			if (fourth_monster.j < rows - 1 && board[fourth_monster.i][fourth_monster.j + 1] != 4) {
				fourth_monster.j++;
			} else if (fourth_monster.j > 0 && board[fourth_monster.i][fourth_monster.j - 1] != 4) {
				fourth_monster.j--;
			} else if (fourth_monster.i > 0 && board[fourth_monster.i - 1][fourth_monster.j] != 4) {
				fourth_monster.i--;
			} else if (fourth_monster.i < columns - 1 && board[fourth_monster.i + 1][fourth_monster.j] != 4) {
				fourth_monster.i++;
			}
		} else if (fourth_monster_move >= 0.5) {
			if (fourth_monster.i < columns - 1 && board[fourth_monster.i + 1][fourth_monster.j] != 4) {
				fourth_monster.i++;
			} else if (fourth_monster.i > 0 && board[fourth_monster.i - 1][fourth_monster.j] != 4) {
				fourth_monster.i--;
			} else if (fourth_monster.j > 0 && board[fourth_monster.i][fourth_monster.j - 1] != 4) {
				fourth_monster.j--;
			} else if (fourth_monster.j < rows - 1 && board[fourth_monster.i][fourth_monster.j + 1] != 4) {
				fourth_monster.j++;
			}
		} else if (fourth_monster_move >= 0.25) {
			if (fourth_monster.i > 0 && board[fourth_monster.i - 1][fourth_monster.j] != 4) {
				fourth_monster.i--;
			} else if (fourth_monster.i < columns - 1 && board[fourth_monster.i + 1][fourth_monster.j] != 4) {
				fourth_monster.i++;
			} else if (fourth_monster.j > 0 && board[fourth_monster.i][fourth_monster.j - 1] != 4) {
				fourth_monster.j--;
			} else if (fourth_monster.j < rows - 1 && board[fourth_monster.i][fourth_monster.j + 1] != 4) {
				fourth_monster.j++;
			}
		} else {
			if (fourth_monster.j > 0 && board[fourth_monster.i][fourth_monster.j - 1] != 4) {
				fourth_monster.j--;
			} else if (fourth_monster.j < rows - 1 && board[fourth_monster.i][fourth_monster.j + 1] != 4) {
				fourth_monster.j++;
			} else if (fourth_monster.i > 0 && board[fourth_monster.i - 1][fourth_monster.j] != 4) {
				fourth_monster.i--;
			} else if (fourth_monster.i < columns - 1 && board[fourth_monster.i + 1][fourth_monster.j] != 4) {
				fourth_monster.i++;
			}
		}

		//check if one of the monsters stand on pacman before moving
		if ((shape.i == first_monster.i && shape.j == first_monster.j) ||
			(shape.i == second_monster.i && shape.j == second_monster.j) ||
			(shape.i == third_monster.i && shape.j == third_monster.j) ||
			(shape.i == fourth_monster.i && shape.j == fourth_monster.j)) {
			eatenByMonster();
		}
	}
}

function moveFirstMonsterSmart() {
	if (shape.i == first_monster.i && shape.j == first_monster.j) {
		eatenByMonster();
		monster_caught_packman = true;
	}
	else if (first_monster.i == shape.i - 1 && first_monster.j == shape.j) {
		first_monster.i++;
		eatenByMonster();
		monster_caught_packman = true;
	}
	else if (first_monster.i == shape.i + 1 && first_monster.j == shape.j) {
		first_monster.i--;
		eatenByMonster();
		monster_caught_packman = true;
	}
	else if (first_monster.i == shape.i && first_monster.j == shape.j - 1) {
		first_monster.j++;
		eatenByMonster();
		monster_caught_packman = true;
	}
	else if (first_monster.i == shape.i && first_monster.j == shape.j + 1) {
		first_monster.j--;
		eatenByMonster();
		monster_caught_packman = true;
	}
	//if the monster can't get to packman or isn't already on him, we attempt to find a valuable move towards him
	else {
		if (first_monster.j > shape.j) {
			if (board[first_monster.i][first_monster.j - 1] != 4 && first_monster.j > 0) {
				first_monster.j--;
			} else if (first_monster.i > shape.i && board[first_monster.i - 1][first_monster.j] != 4) {
				first_monster.i--;
			} else if (first_monster.i < columns - 1 && board[first_monster.i + 1][first_monster.j] != 4) {
				first_monster.i++;
			}
		} else if (first_monster.j < shape.j) {
			if (board[first_monster.i][first_monster.j + 1] != 4 && first_monster.j < rows - 1) {
				first_monster.j++;
			} else if (first_monster.i > shape.i && board[first_monster.i - 1][first_monster.j] != 4) {
				first_monster.i--;
			} else if (first_monster.i < columns - 1 && board[first_monster.i + 1][first_monster.j] != 4) {
				first_monster.i++;
			}
		} else {
			if (first_monster.i > shape.i) {
				if (board[first_monster.i - 1][first_monster.j] != 4 && first_monster.i > 0) {
					first_monster.i--;
				} else if (first_monster.j < rows - 1 && board[first_monster.i][first_monster.j] != 4) {
					first_monster.j++;
				} else if (first_monster.j > 0 && board[first_monster.i][first_monster.j] != 4) {
					first_monster.j--;
				}
			} else {
				if (board[first_monster.i + 1][first_monster.j] != 4 && first_monster.i < columns - 1) {
					first_monster.i++;
				} else if (first_monster.j < rows - 1 && board[first_monster.i][first_monster.j] != 4) {
					first_monster.j++;
				} else if (first_monster.j > 0 && board[first_monster.i][first_monster.j] != 4) {
					first_monster.j--;
				}
			}
		}
		if (shape.i == first_monster.i && shape.j == first_monster.j) {
			eatenByMonster();
			monster_caught_packman = true;
		}
	}
}

function moveSecondMonsterSmart() {
	if (shape.i == second_monster.i && shape.j == second_monster.j) {
		eatenByMonster();
		monster_caught_packman = true;
	}
	else if (second_monster.i == shape.i - 1 && second_monster.j == shape.j) {
		second_monster.i++;
		eatenByMonster();
		monster_caught_packman = true;
	}
	else if (second_monster.i == shape.i + 1 && second_monster.j == shape.j) {
		second_monster.i--;
		eatenByMonster();
		monster_caught_packman = true;
	}
	else if (second_monster.i == shape.i && second_monster.j == shape.j - 1) {
		second_monster.j++;
		eatenByMonster();
		monster_caught_packman = true;
	}
	else if (second_monster.i == shape.i && second_monster.j == shape.j + 1) {
		second_monster.j--;
		eatenByMonster();
		monster_caught_packman = true;
	}
	//if the monster can't get to packman or isn't already on him, we attempt to find a valuable move towards him
	else {
		if (second_monster.i > shape.i) {
			if (board[second_monster.i - 1][second_monster.j] != 4 && second_monster.i > 0) {
				second_monster.i--;
			} else if (second_monster.j < rows - 1 && board[second_monster.i][second_monster.j] != 4) {
				second_monster.j++;
			} else if (second_monster.j > 0 && board[second_monster.i][second_monster.j] != 4) {
				second_monster.j--;
			}
		} else if (second_monster.i < shape.i) {
			if (board[second_monster.i + 1][second_monster.j] != 4 && second_monster.i < columns - 1) {
				second_monster.i++;
			} else if (second_monster.j < rows - 1 && board[second_monster.i][second_monster.j] != 4) {
				second_monster.j++;
			} else if (second_monster.j > 0 && board[second_monster.i][second_monster.j] != 4) {
				second_monster.j--;
			}
		} else {
			if (second_monster.j > shape.j) {
				if (board[second_monster.i][second_monster.j - 1] != 4 && second_monster.j > 0) {
					second_monster.j--;
				} else if (second_monster.i > shape.i && board[second_monster.i - 1][second_monster.j] != 4) {
					second_monster.i--;
				} else if (second_monster.i < columns - 1 && board[second_monster.i + 1][second_monster.j] != 4) {
					second_monster.i++;
				}
			} else {
				if (board[second_monster.i][second_monster.j + 1] != 4 && second_monster.j < rows - 1) {
					second_monster.j++;
				} else if (second_monster.i > shape.i && board[second_monster.i - 1][second_monster.j] != 4) {
					second_monster.i--;
				} else if (second_monster.i < columns - 1 && board[second_monster.i + 1][second_monster.j] != 4) {
					second_monster.i++;
				}
			}
			if (shape.i == second_monster.i && shape.j == second_monster.j) {
				eatenByMonster();
				monster_caught_packman = true;
			}
		}
	}
}

function moveThirdMonsterSmart() {
	if (shape.i == third_monster.i && shape.j == third_monster.j) {
		eatenByMonster();
		monster_caught_packman = true;
	}
	else if (third_monster.i == shape.i - 1 && third_monster.j == shape.j) {
		third_monster.i++;
		eatenByMonster();
		monster_caught_packman = true;
	}
	else if (third_monster.i == shape.i + 1 && third_monster.j == shape.j) {
		third_monster.i--;
		eatenByMonster();
		monster_caught_packman = true;
	}
	else if (third_monster.i == shape.i && third_monster.j == shape.j - 1) {
		third_monster.j++;
		eatenByMonster();
		monster_caught_packman = true;
	}
	else if (third_monster.i == shape.i && third_monster.j == shape.j + 1) {
		third_monster.j--;
		eatenByMonster();
		monster_caught_packman = true;
	}
	//if the monster can't get to packman or isn't already on him, we attempt to find a valuable move towards him
	else {
		if (third_monster.i > shape.i) {
			if (board[third_monster.i - 1][third_monster.j] != 4 && third_monster.i > 0) {
				third_monster.i--;
			} else if (third_monster.j < rows - 1 && board[third_monster.i][third_monster.j] != 4) {
				third_monster.j++;
			} else if (third_monster.j > 0 && board[third_monster.i][third_monster.j] != 4) {
				third_monster.j--;
			}
		} else if (third_monster.i < shape.i) {
			if (board[third_monster.i + 1][third_monster.j] != 4 && third_monster.i < columns - 1) {
				third_monster.i++;
			} else if (third_monster.j < rows - 1 && board[third_monster.i][third_monster.j] != 4) {
				third_monster.j++;
			} else if (third_monster.j > 0 && board[third_monster.i][third_monster.j] != 4) {
				third_monster.j--;
			}
		} else {
			if (third_monster.j > shape.j) {
				if (board[third_monster.i][third_monster.j - 1] != 4 && third_monster.j > 0) {
					third_monster.j--;
				} else if (third_monster.i > shape.i && board[third_monster.i - 1][third_monster.j] != 4) {
					third_monster.i--;
				} else if (third_monster.i < columns - 1 && board[third_monster.i + 1][third_monster.j] != 4) {
					third_monster.i++;
				}
			} else {
				if (board[third_monster.i][third_monster.j + 1] != 4 && third_monster.j < rows - 1) {
					third_monster.j++;
				} else if (third_monster.i > shape.i && board[third_monster.i - 1][third_monster.j] != 4) {
					third_monster.i--;
				} else if (third_monster.i < columns - 1 && board[third_monster.i + 1][third_monster.j] != 4) {
					third_monster.i++;
				}
			}
			if (shape.i == third_monster.i && shape.j == third_monster.j) {
				eatenByMonster();
				monster_caught_packman = true;
			}
		}
	}
}

function moveFourthMonsterSmart() {
	if (shape.i == fourth_monster.i && shape.j == fourth_monster.j) {
		eatenByMonster();
		monster_caught_packman = true;
	}
	else if (fourth_monster.i == shape.i - 1 && fourth_monster.j == shape.j) {
		fourth_monster.i++;
		eatenByMonster();
		monster_caught_packman = true;
	}
	else if (fourth_monster.i == shape.i + 1 && fourth_monster.j == shape.j) {
		fourth_monster.i--;
		eatenByMonster();
		monster_caught_packman = true;
	}
	else if (fourth_monster.i == shape.i && fourth_monster.j == shape.j - 1) {
		fourth_monster.j++;
		eatenByMonster();
		monster_caught_packman = true;
	}
	else if (fourth_monster.i == shape.i && fourth_monster.j == shape.j + 1) {
		fourth_monster.j--;
		eatenByMonster();
		monster_caught_packman = true;
	}
	//if the monster can't get to packman or isn't already on him, we attempt to find a valuable move towards him
	else {
		if (fourth_monster.j > shape.j) {
			if (board[fourth_monster.i][fourth_monster.j - 1] != 4 && fourth_monster.j > 0) {
				fourth_monster.j--;
			} else if (fourth_monster.i > shape.i && board[fourth_monster.i - 1][fourth_monster.j] != 4) {
				fourth_monster.i--;
			} else if (fourth_monster.i < columns - 1 && board[fourth_monster.i + 1][fourth_monster.j] != 4) {
				fourth_monster.i++;
			}
		} else if (fourth_monster.j < shape.j) {
			if (board[fourth_monster.i][fourth_monster.j + 1] != 4 && fourth_monster.j < rows - 1) {
				fourth_monster.j++;
			} else if (fourth_monster.i > shape.i && board[fourth_monster.i - 1][fourth_monster.j] != 4) {
				fourth_monster.i--;
			} else if (fourth_monster.i < columns - 1 && board[fourth_monster.i + 1][fourth_monster.j] != 4) {
				fourth_monster.i++;
			}
		} else {
			if (fourth_monster.i > shape.i) {
				if (board[fourth_monster.i - 1][fourth_monster.j] != 4 && fourth_monster.i > 0) {
					fourth_monster.i--;
				} else if (fourth_monster.j < rows - 1 && board[fourth_monster.i][fourth_monster.j] != 4) {
					fourth_monster.j++;
				} else if (fourth_monster.j > 0 && board[fourth_monster.i][fourth_monster.j] != 4) {
					fourth_monster.j--;
				}
			} else {
				if (board[fourth_monster.i + 1][fourth_monster.j] != 4 && fourth_monster.i < columns - 1) {
					fourth_monster.i++;
				} else if (fourth_monster.j < rows - 1 && board[fourth_monster.i][fourth_monster.j] != 4) {
					fourth_monster.j++;
				} else if (fourth_monster.j > 0 && board[fourth_monster.i][fourth_monster.j] != 4) {
					fourth_monster.j--;
				}
			}
		}
		if (shape.i == fourth_monster.i && shape.j == fourth_monster.j) {
			eatenByMonster();
			monster_caught_packman = true;
		}
	}
}

function updateMonsterPosition() {
	//moveMonstersRandomly(); //a complete random movement for the monsters
	monster_caught_packman = false;
	if (!packman_caught_by_monster) {
		board[first_monster.i][first_monster.j] = 0;
		moveFirstMonsterSmart();
		board[first_monster.i][first_monster.j] = 6;
	}
	if (!monster_caught_packman && !packman_caught_by_monster && numberOfMonsters > 1) {
		board[second_monster.i][second_monster.j] = 0;
		moveSecondMonsterSmart();
		board[second_monster.i][second_monster.j] = 7;
	}
	if (!monster_caught_packman && !packman_caught_by_monster && numberOfMonsters > 2) {
		board[third_monster.i][third_monster.j] = 0;
		moveThirdMonsterSmart();
		board[third_monster.i][third_monster.j] = 8;
	}
	if (!monster_caught_packman && !packman_caught_by_monster && numberOfMonsters > 3) {
		board[fourth_monster.i][fourth_monster.j] = 0;
		moveFourthMonsterSmart();
		board[fourth_monster.i][fourth_monster.j] = 9;
	}
	if (!bonus_eaten) {
		moveBonusFigure(); // move the bonus figure
		board[bonus_figure.i][bonus_figure.j] = 5;
	}

	Draw();
}

/**
* The function receieves parameters for the game from the user's input
*/
function defineGameSettings() {
	common_food_color = document.getElementById("favcolor_com").value;
	epic_food_color = document.getElementById("favcolor_ep").value;
	legendary_food_color = document.getElementById("favcolor_leg").value;
	food_remain = document.getElementById("rangeBallsInput").value;
	food_remian_ingame = food_remain;
	foodForLabel=food_remain;
	numberOfMonsters = document.getElementById("rangeMonstersInput").value;
	timeForGame = document.getElementById("num_seconds").value;
	if(timeForGame<60){
		timeForGame=60;
	}
	show_hourglass = parseInt(timeForGame / 2);
	show_medkit = parseInt(timeForGame / 4);
	let tempUp = document.getElementById("key_up").value;
	let tempDown = document.getElementById("key_down").value;
	let tempRight = document.getElementById("key_right").value;
	let tempLeft = document.getElementById("key_left").value;
	let up = "ArrowUp";
	let down = "ArrowDown";
	let right = "ArrowRight";
	let left = "ArrowLeft";
	if (up.localeCompare(tempUp) == 0 || tempUp == "") {
		upwardsKey = 38;
	}
	if (down.localeCompare(tempDown) == 0 || tempDown == "") {
		downwardsKey = 40;
	}
	if (right.localeCompare(tempRight) == 0 || tempRight == "") {
		rightKey = 39;
	}
	if (left.localeCompare(tempLeft) == 0 || tempLeft == "") {
		leftKey = 37;
	}
}

function updateUpCode() {
	upwardsKey = event.keyCode;
}

function updateDownCode() {
	downwardsKey = event.keyCode;
}

function updateRightCode() {
	rightKey = event.keyCode;
}

function updateLeftCode() {
	leftKey = event.keyCode;
}

function allowShowingHourglass() {
	if (board[hourglass.i][hourglass.j] == 0) {
		board[hourglass.i][hourglass.j] = 3;
	}
	if (hourglass.i == shape.i && hourglass.j == shape.j) {
		time_elapsed = time_elapsed + 15;
		hourglass_eaten = true;
		board[hourglass.i][hourglass.j] = 2;
	}
}

function allowShowingMedkit() {
	if (board[medkit.i][medkit.j] == 0) {
		board[medkit.i][medkit.j] = 17;
	}
	if (medkit.i == shape.i && medkit.j == shape.j) {
		numOfLives++;
		medkit_eaten = true;
		board[medkit.i][medkit.j] = 2;
	}
}

function resetGame() {
	window.clearInterval(interval);
	window.clearInterval(monsters_interval);
	gameSound.pause();
	gameSound.currentTime = 0;
	deathSound = new Audio("./resources/deathSound.mp3");
	//document.getElementById("play").disabled = false;
	//document.getElementById("restart").disabled = true;
	for(let l = 0; l < columns; l++){
		for(let k = 0; k < rows; k++) {
			board[l][k] = 0;
		}
	}
	food = null;
	food = [];
	context.clearRect(0, 0, canvas.width, canvas.height);
	//Start();
	//openGamePage();
}

function startGameAgain(){
	resetGame();
	Start();
}

function updateStaticValues(){
	if(upwardsKey==38){
		document.getElementById("staticArrowUp").innerText="Key Up: "+'ArrowUp';
	}
	else{
	document.getElementById("staticArrowUp").innerText="Key Up: "+document.getElementById("key_up").value;
	}
	if(downwardsKey==40){
		document.getElementById("staticArrowDown").innerText="Key Down: "+'ArrowDown';
	}
	else{
		document.getElementById("staticArrowDown").innerText="Key Down: "+document.getElementById("key_down").value;
	}
	if(leftKey==37){
		document.getElementById("staticArrowLeft").innerText="Key Left: "+'ArrowLeft';
	}
	else{
		document.getElementById("staticArrowLeft").innerText="Key Left: "+document.getElementById("key_left").value;
	}
	if(rightKey==39){
		document.getElementById("staticArrowRight").innerText="Key Right: "+'ArrowRight';
	}
	else{
		document.getElementById("staticArrowRight").innerText="Key Right: "+document.getElementById("key_right").value;
	}
	let legendary_food_remain = parseInt(foodForLabel * 0.1);
	let epic_food_remain = parseInt(foodForLabel * 0.3);
	let common_food_remain = parseInt(foodForLabel * 0.6);

	document.getElementById("staticNumOfFood").innerText="Amount of food: "+foodForLabel;
	document.getElementById("staticTimeOfGame").innerText="Length of game: "+timeForGame;
	document.getElementById("staticNumOfMonster").innerText="Number Of Monsters: "+numberOfMonsters;
	document.getElementById("staticColorOfLeg").innerText="Number Legendary: "+legendary_food_remain;
	document.getElementById("staticColorOfEpic").innerText="Color of Epic: "+epic_food_remain;
	document.getElementById("staticColorOfReg").innerText="Color of Common: "+common_food_remain;

	//color
	document.getElementById('staticColorOfLeg').style.color = document.getElementById("favcolor_leg").value;
	document.getElementById('staticColorOfEpic').style.color = document.getElementById("favcolor_ep").value;
	document.getElementById('staticColorOfReg').style.color = document.getElementById("favcolor_com").value;
}


