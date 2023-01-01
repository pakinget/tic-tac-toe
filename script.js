"use strict";

const Player = (sign, name, wins) => {
	return { sign, name, wins };
};

const Gameboard = (() => {
	let board = [["x", "o", "x"], ["x", "o", "x"], ["o", "x", "o"]];
	let node;

	const create = () => {
		const boardContainer = document.createElement("div");
		boardContainer.classList.add("boardContainer");
		Gameboard.node = boardContainer;
		for (let i = 0; i < 9; i++) {
			const cell = document.createElement("div");
			cell.addEventListener("click", (event) => {
				const cells = Array.from(event.target.parentElement.children);
				const index = cells.indexOf(event.target);
				const boardCell = Gameboard.board[Math.floor(index / 3)][Math.floor(index - Math.floor(index / 3) * 3)];
				if (boardCell === " ") {
					Game.turns++;
					// I know this looks stupid as hell but boardCell only contains the value of the cekk whilst a reference would be needed for an actual change
					Gameboard.board[Math.floor(index / 3)][Math.floor(index - Math.floor(index / 3) * 3)] = `${Game.getTurnPlayer().sign}`;
					Gameboard.update();
					if (Gameboard.checkForEnd() === true) {
						console.log(`The end. ${Game.getTurnPlayer().name} won!`);
					}
					else if (Game.turns === 9) console.log("The end. It's a tie!");
				}
				else {
					console.log("That cell had already been clicked!");
				}
			});
			boardContainer.appendChild(cell);
		}
		const body = document.querySelector("body");
		body.appendChild(boardContainer);
	};

	const reset = () => {
		Gameboard.board = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];
		Gameboard.node = undefined;
	};

	const update = () => {
		const cells = Array.from(Gameboard.node.children);
		for (let i = 0; i < 9; i++) {
			cells[i].textContent = `${Gameboard.board[Math.floor(i / 3)][Math.floor(i - Math.floor(i / 3) * 3)]}`;
		}
	};

	const checkForEnd = () => {
		let end = false;
		if (Gameboard.board[0][0] !== " " && Gameboard.board[0][0] === Gameboard.board[1][1] && Gameboard.board[1][1] === Gameboard.board[2][2]) end = true;
		else if (Gameboard.board[0][2] !== " " && Gameboard.board[0][2] === Gameboard.board[1][1] && Gameboard.board[1][1] === Gameboard.board[2][0]) end = true;
		for (let i = 0; i < 3 && end !== true; i++) {
			if (Gameboard.board[i][0] !== " " && Gameboard.board[i][0] === Gameboard.board[i][1] && Gameboard.board[i][1] === Gameboard.board[i][2]) end = true;
			else if (Gameboard.board[0][i] !== " " && Gameboard.board[0][i] === Gameboard.board[1][i] && Gameboard.board[1][i] === Gameboard.board[2][i]) end = true;
		}
		return end;
	};

	return { board, node, reset, create, update, checkForEnd };
})();

const Game = (() => {
	let players = [];
	let turns = 0;
	let indexX;
	let indexO;

	const getTurnPlayer = () => {
		if (Game.turns % 2 === 0) return Game.players[Game.indexO];
		else return Game.players[Game.indexX];
	};

	const start = (indexX, indexO) => {
		// Swapping the players is playerX's sign isn't actually X
		if (Game.players[indexX].sign !== "x") {
			const temp = Game.players[indexO];
			Game.players[indexO] = Game.players[indexX];
			Game.players[indexX] = temp;
		}
		Game.turns = 0;
		Game.indexX = indexX;
		Game.indexO = indexO;
		Gameboard.reset();
		Gameboard.create();
		Gameboard.update();
	};

	return { players, turns, indexX, indexO, start, getTurnPlayer };
})();

let a = Player("x", "a", 0);
let b = Player("o", "b", 0);
Game.players.push(a);
Game.players.push(b);
Game.start(0, 1);