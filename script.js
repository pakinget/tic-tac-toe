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
				Game.turns++;
				const cells = Array.from(event.target.parentElement.children);
				const index = cells.indexOf(event.target);
				Gameboard.board[Math.floor(index / 3)][Math.floor(index - Math.floor(index / 3) * 3)] = `${Game.getTurnPlayer().sign}`;
				Gameboard.update();
				if (Game.checkForEnd() === true) {
					console.log(`The end. ${Game.getTurnPlayer().name} won!`);
				}
				else if (Game.turns === 9) console.log("The end. It's a tie!");
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
	return { board, node, reset, create, update };
})();

const Game = (() => {
	let players = [];
	let playerX;
	let playerO;
	let turns = 0;

	const getTurnPlayer = () => {
		if (Game.turns % 2 === 0) return Game.playerO;
		else return Game.playerX;
	};

	const start = (playerX, playerO) => {
		// Swapping the players is playerX's sign isn't actually X
		if (playerX.sign !== "x") {
			const temp = playerO;
			playerO = playerX;
			playerX = temp;
		}
		Game.playerX = playerX;
		Game.playerO = playerO;
		Game.turns = 0;
		Gameboard.reset();
		Gameboard.create();
		Gameboard.update();
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
	return { players, playerX, playerO, turns, start, getTurnPlayer, checkForEnd };
})();

let a = Player("x", "a", 0);
let b = Player("o", "b", 0);
Game.start(a, b);