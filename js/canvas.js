/*
Colors:
Field: #00201f;
SnakeBlock: #A7DB00;
Apple: #ff1111;
*/

var canv, ctx;

var snakeBlockNum = 3;
var snakeBlockPositions = [];
var snakeBlockDirestions = [];
var curDir = 'right';
var snakeHeadPositions = [];
var applePositions = [];

var score = 0;

const snakeBlockRadius = 10;
const appleSize = 20;
const appleNum = 8;
const startSnakeBlockNum = 3;

$('document').ready(function () {
	initCanvas();
	initContext();
	initSnake();
	document.addEventListener('keydown', changeDirection);
	setInterval(mainLoop, 70);
});

function initCanvas() {
	canv = document.getElementById('canvas');
	canv.width = window.innerWidth;
	canv.height = window.innerHeight;
}

function initContext() {
	ctx = canv.getContext('2d');
}

function initSnake() {
	score = 0;
	snakeBlockNum = startSnakeBlockNum;
	
	for (let i = 0; i < snakeBlockNum; i++) {
		snakeBlockPositions[i] = {
			x: innerWidth / 2 - snakeBlockRadius * 2 * i,
			y: innerHeight / 2
		};

		snakeBlockDirestions[i] = 'right';
	}

	drowSnake();

	for (let i = 0; i < appleNum; i++) {
		applePositions[i] = createApple();
		drowApple(applePositions[i]);
	}
}

function mainLoop() {
	moveSnake();
	
	checkSnakeAppleIntersection();
	checkSnakeSnakeIntersection();

	refreshScreen();
}

function checkSnakeAppleIntersection(){
	let headX = snakeBlockPositions[0].x;
	let headY = snakeBlockPositions[0].y;
	
	for (let i = 0; i < appleNum; i++){
		let appleX = applePositions[i].x;
		let appleY = applePositions[i].y;
		if (isIntersect(headX, headY, snakeBlockRadius * 2, appleX + appleSize / 2, appleY + appleSize / 2, appleSize)) {
			snakeAteApple(i);
		}
	}
}

function snakeAteApple(AppleIndex) {
	applePositions.splice(AppleIndex, 1);//Удалить яблоко
	applePositions[appleNum - 1] = createApple();

	score++;
	
	createTail();
}

function createTail() {
	let curTailX = snakeBlockPositions[snakeBlockNum - 1].x;
	let curTailY = snakeBlockPositions[snakeBlockNum - 1].y;
	let curTailDir = snakeBlockDirestions[snakeBlockNum - 1];
	let newTailX, newTailY;
	
	if (curTailDir == 'right'){
		newTailY = curTailY;
		newTailX = curTailX - snakeBlockRadius * 2;
	} else if (curTailDir == 'left'){
		newTailY = curTailY;
		newTailX = curTailX + snakeBlockRadius * 2;
	} else if (curTailDir == 'up') {
		newTailX = curTailX;
		newTailY = curTailY + snakeBlockRadius * 2;
	} else if (curTailDir == 'down') {
		newTailX = curTailX;
		newTailY = curTailY - snakeBlockRadius * 2;
	}

	snakeBlockDirestions[snakeBlockNum] = curTailDir;
	snakeBlockPositions[snakeBlockNum] = {x: newTailX, y: newTailY};

	snakeBlockNum++;
}

function checkSnakeSnakeIntersection(){
	let headX = snakeBlockPositions[0].x;
	let headY = snakeBlockPositions[0].y;

	for (let i = 2; i < snakeBlockNum; i++) {
		let blockX = snakeBlockPositions[i].x;
		let blockY = snakeBlockPositions[i].y;
		if (isIntersect(headX, headY, snakeBlockRadius, blockX, blockY, snakeBlockRadius)) {
			snakeAteSnake();
		}
	}
}

function snakeAteSnake() {
	alert("Your score is " + score);
	initSnake();
}

function changeDirection(event) {
	if (event.keyCode == 0x26 || event.keyCode == 0x57) { //'up' || 'w'
		let dir = snakeBlockDirestions[0];
		if (dir == 'right' || dir == 'left')
			curDir = 'up';
	} else if (event.keyCode == 0x28 || event.keyCode == 0x53) { //'down' || 's'
		let dir = snakeBlockDirestions[0];
		if (dir == 'right' || dir == 'left')
			curDir = 'down';
	} else if (event.keyCode == 0x27 || event.keyCode == 0x44) { //'right' || 'd'
		let dir = snakeBlockDirestions[0];
		if (dir == 'up' || dir == 'down')
			curDir = 'right';
	} else if (event.keyCode == 0x25 || event.keyCode == 0x41) { //'left' || 'a'
		let dir = snakeBlockDirestions[0];
		if (dir == 'up' || dir == 'down')
			curDir = 'left';
	}
}

function moveSnake() {
	snakeBlockDirestions[0] = curDir;

	for (let i = 0; i < snakeBlockNum; i++) {
		if (snakeBlockDirestions[i] == 'right') {
			snakeBlockPositions[i].x += snakeBlockRadius * 2;
		} else if (snakeBlockDirestions[i] == 'left') {
			snakeBlockPositions[i].x -= snakeBlockRadius * 2;
		} else if (snakeBlockDirestions[i] == 'up') {
			snakeBlockPositions[i].y -= snakeBlockRadius * 2;
		} else if (snakeBlockDirestions[i] == 'down') {
			snakeBlockPositions[i].y += snakeBlockRadius * 2;
		}
	}

	for (let i = 0; i < snakeBlockNum; i++){
		if (snakeBlockPositions[i].x <= snakeBlockRadius) {
			snakeBlockPositions[i].x = window.innerWidth - snakeBlockRadius - 5;
		} else if (snakeBlockPositions[i].x >= window.innerWidth - snakeBlockRadius) {
			snakeBlockPositions[i].x = snakeBlockRadius + 5;
		} else if (snakeBlockPositions[i].y <= snakeBlockRadius) {
			snakeBlockPositions[i].y = window.innerHeight - snakeBlockRadius - 5;
		} else if (snakeBlockPositions[i].y >= window.innerHeight - snakeBlockRadius) {
			snakeBlockPositions[i].y = snakeBlockRadius + 5;
		}
	}

	
	snakeBlockDirestions.pop();
	snakeBlockDirestions.unshift(curDir);
}

function refreshScreen() {
	ctx.clearRect(0, 0, canv.width, canv.height);
	drowAllApples();
	drowSnake();
}

function drowSnake() {
	for (let i = 0; i < snakeBlockNum; i++) {
		let x = snakeBlockPositions[i].x,
			y = snakeBlockPositions[i].y;

		ctx.beginPath();
		ctx.arc(x, y, snakeBlockRadius, 0, Math.PI * 2);
		if (i == 0)		{
			ctx.fillStyle = '#275B00';
		} else {
			ctx.fillStyle = '#A7DB00';
		}
		
		ctx.fill();
		ctx.closePath();
	}
}

function isPlaceFree(x, y) {
	for (let i = 0; i < snakeBlockNum; i++) {
		let x1 = snakeBlockPositions[i].x;
		let y1 = snakeBlockPositions[i].y;

		if (isIntersect(x1, y1, snakeBlockRadius * 3, x, y, appleSize))
			return false;
	}

	for (let i = 0; i < applePositions.length; i++) {
		let x1 = applePositions[i].x;
		let y1 = applePositions[i].y;

		if (isIntersect(x1, y1, appleSize, x, y, appleSize))
			return false;
	}

	return true;
}

function isIntersect(x1, y1, r1, x2, y2, r2) {
	if (x2 >= x1 && y2 >= y1) { //2 справа сверху от 1
		let areaX = x2 - r1 / 2 - r2 / 2 - 5;
		let areaY = y2 - r1 / 2 - r2 / 2 - 5;

		if ((x1 > areaX) && (y1 > areaY)) {
			return true;
		}
	} else if (x2 >= x1 && y2 < y1) { //2 справа снизу от 1
		let areaX = x2 - r1 / 2 - r2 / 2 - 5;
		let areaY = y2 + r1 / 2 + r2 / 2 + 5;

		if ((x1 > areaX) && (y1 < areaY)) {
			return true;
		}
	} else if (x2 < x1 && y2 >= y1) { //2 слева сверху от 1
		let areaX = x2 + r1 / 2 + r2 / 2 + 5;
		let areaY = y2 - r1 / 2 - r2 / 2 - 5;

		if ((x1 < areaX) && (y1 > areaY)) {
			return true;
		}
	} else if (x2 < x1 && y2 < y1) { //2 слева снизу от 1
		let areaX = x2 + r1 / 2 + r2 / 2 + 5;
		let areaY = y2 + r1 / 2 + r2 / 2 + 5;

		if ((x1 < areaX) && (y1 < areaY)) {
			return true;
		}
	}

	return false;
}

function createApple() {
	let applePosition;

	while (true) {
		let x = randomInt(appleSize, innerWidth - appleSize);
		let y = randomInt(appleSize, innerHeight - appleSize);

		if (isPlaceFree(x, y)) {
			applePosition = {
				x: x,
				y: y
			};
			break;
		}
	}

	return applePosition;
}

function randomInt(min, max) {
	var rand = min + Math.random() * (max - min + 1)
	rand = Math.floor(rand);
	return rand;
}

function drowApple(applePosition) {
	let x = applePosition.x;
	let y = applePosition.y;

	ctx.fillStyle = '#ff1111';
	ctx.fillRect(x, y, appleSize, appleSize);
}

function drowAllApples() {
	for (let i = 0; i < applePositions.length; i++) {
		drowApple(applePositions[i]);
	}
}