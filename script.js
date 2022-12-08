"use strict";

const Player = (sign, name, wins) => {
	return { sign, name, wins };
};

const Gameboard = (() => {
	let board = [["x", "o", "x"], ["x", "o", "x"], ["o", "x", "o"]];
	let node;
	const reset = () => {
		Gameboard.board = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];
		Gameboard.node = undefined;
	};
	return { board, node, reset };
})();

const Game = (() => {
	const players = [];
	const start = (playerX, playerO) => {
		// Swapping the players is playerX's sign isn't actually X
		if (playerX.sign !== "x") {
			const temp = playerO;
			playerO = playerX;
			playerX = temp;
		}
		Gameboard.reset();
		Game.display();
	};
	const display = () => {
		const boardContainer = document.createElement("div");
		boardContainer.classList.add("boardContainer");
		Gameboard.node = boardContainer;
		for (let i = 0; i < 9; i++) {
			const cell = document.createElement("div");
			cell.textContent = `${Gameboard.board[Math.floor(i / 3)][Math.floor(i - Math.floor(i / 3) * 3)]}`;
			boardContainer.appendChild(cell);
		}
		const body = document.querySelector("body");
		body.appendChild(boardContainer);
	};
	return { players, start, display };
})();

let a = Player("a", "x", 0);
let b = Player("b", "x", 0);
Game.start(a, b);