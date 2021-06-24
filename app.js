document.addEventListener("DOMContentLoaded", () => {
	//Selectores de elementos
	const bird = document.querySelector(".bird");
	const gameDisplay = document.querySelector(".game-container");
	const ground = document.querySelector(".ground");

	//Variables
	let birdLeft = 220;
	let birdBottom = 100;
	let gravity = 2;
	let isGameOver = false;
	let gap = 430;

	//Dibujado del pajaro
	function startGame() {
		birdBottom -= gravity;
		bird.style.bottom = birdBottom + "px";
		bird.style.left = birdLeft + "px";
	}
	//Actualizacion del pajaro
	let gameTimerId = setInterval(startGame, 20);

	//Input handler
	function control(event) {
		//Space bar
		if (event.keyCode === 32) {
			jump();
		}
	}

	//Dibujado del salto
	function jump() {
		if (birdBottom < 410) birdBottom += 50;
		bird.style.bottom = birdBottom + "px";
		console.log(birdBottom);
	}
	//Event listener de las teclas presionadas
	document.addEventListener("keyup", control);

	//Obstaculos y movimiento de obstaculos
	function generateObstacle() {
		//Hitbox y posicion de obstaculos
		let obstacleLeft = 500;
		let randomHeight = Math.random() * 60;
		let obstacleBottom = randomHeight;
		//Inclusion automatica de los obstaculos en el HTML
		const obstacle = document.createElement("div");
		const topObstacle = document.createElement("div");
		//Condicion de dibujado de obstaculos
		if (!isGameOver) {
			obstacle.classList.add("obstacle");
			topObstacle.classList.add("topObstacle");
		}
		//Inclusion de obstaculos en pantalla
		gameDisplay.appendChild(obstacle);
		gameDisplay.appendChild(topObstacle);
		obstacle.style.left = obstacleLeft + "px";
		obstacle.style.bottom = obstacleBottom + "px";
		topObstacle.style.left = obstacleLeft + "px";
		topObstacle.style.bottom = obstacleBottom + gap + "px";

		//Movimiento de obstaculos
		function moveObstacle() {
			obstacleLeft -= 2;
			obstacle.style.left = obstacleLeft + "px";
			topObstacle.style.left = obstacleLeft + "px";
			//Condicion de borrado de obstaculos
			if (obstacleLeft === -60) {
				clearInterval(timerId);
				gameDisplay.removeChild(obstacle);
				gameDisplay.removeChild(topObstacle);
			}
			//Colision detection
			if (
				(obstacleLeft > 200 &&
					obstacleLeft < 280 &&
					birdLeft === 220 &&
					(birdBottom < obstacleBottom + 153 ||
						birdBottom > obstacleBottom + gap - 200)) ||
				birdBottom === 0
			) {
				gameOver();
				//Fin de generacion de obstaculos
				clearInterval(timerId);
			}
		}
		//Actualizacion de obstaculos
		let timerId = setInterval(moveObstacle, 20);
		if (!isGameOver) setTimeout(generateObstacle, 3000);
	}
	generateObstacle();
	//Limpieza y gameover
	function gameOver() {
		clearInterval(gameTimerId);
		console.log("game over");
		isGameOver = true;
		document.removeEventListener("keyup", control);
	}
});
