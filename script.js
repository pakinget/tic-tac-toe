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
				Gameboard.board[Math.floor(index / 3)][Math.floor(index - Math.floor(index / 3) * 3)] = `${Game.getTurnPlayer().sign}`;
				Game.turns++;
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
	return { board, node, reset, create };
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
		Game.turns = 1;
		Gameboard.reset();
		Gameboard.create();
	};
	return { players, playerX, playerO, turns, start, getTurnPlayer };
})();

let a = Player("x", "a", 0);
let b = Player("o", "b", 0);
Game.start(a, b);