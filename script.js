"use strict";

const Player = (sign, name, wins = 0) => {
	return { sign, name, wins };
};

const Gameboard = (() => {
	let board = [["x", "o", "x"], ["x", "o", "x"], ["o", "x", "o"]];
	let node;
	const reset = () => {
		Gameboard.board = [];
		Gameboard.node = undefined;
	};
	return { board, node, reset };
})();

const Game = (() => {
	const players = [];
	const start = (playerX, playerO) => {
		Gameboard.reset();
	};
	const display = () => {
		const boardContainer = document.createElement("div");
		boardContainer.classList.add("boardContainer");
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