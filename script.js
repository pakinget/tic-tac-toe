"use strict";

const Player = (sign, name, wins = 0) => {
	return { sign, name, wins };
};

const Gameboard = (() => {
	let board = [["x", "o", "x"], ["x", "o", "x"], ["o", "x", "o"]];
	return { board };
})();

const Game = (() => {
	const start = (playerX, playerO) => {
		Gameboard.board = [];
	};
	const display = () => {
		const boardContainer = document.createElement("div");
		for (let i = 0; i < 9; i++) {
			const cell = document.createElement("div");
			cell.textContent = `${Gameboard.board[Math.floor(i / 3)][Math.floor(i - Math.floor(i / 3) * 3)]}`;
			boardContainer.appendChild(cell);
		}
		const body = document.querySelector("body");
		body.appendChild(boardContainer);
	};
	return { start, display };
})();