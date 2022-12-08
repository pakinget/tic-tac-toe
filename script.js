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
			cell.textContent = `${Gameboard.board[Math.floor(i / 3)][Math.floor(i - Math.floor(i / 3) * 3)]}`;
			/* cell.addEventListener("click", () => {

			}); */
			boardContainer.appendChild(cell);
		}
		const body = document.querySelector("body");
		body.appendChild(boardContainer);
	};
	const reset = () => {
		Gameboard.board = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];
		Gameboard.node = undefined;
	};
	return { board, node, reset, create };
})();

const Game = (() => {
	let players = [];
	let playerX;
	let playerO;
	let turns = 0;
	const turnSign = () => {
		if (turns % 2 === 0) return Game.playerO.sign;
		else return Game.playerX.sign;
	};
	const start = (playerX, playerO) => {
		// Swapping the players is playerX's sign isn't actually X
		if (playerX.sign !== "x") {
			const temp = playerO;
			playerO = playerX;
			playerX = temp;
		}
		turns = 1;
		Gameboard.reset();
		Gameboard.create();
	};
	return { players, playerX, playerO, turns, start, turnSign };
})();

let a = Player("a", "x", 0);
let b = Player("b", "x", 0);
Game.start(a, b);