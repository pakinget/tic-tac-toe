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
				Gameboard.update();
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
		Game.turns = 1;
		Gameboard.reset();
		Gameboard.create();
		Gameboard.update();
	};

	const checkForEnd = () => {
		// Check rows
		let same = true;
		for (let i = 0; i < 3 && same === true; i++) {
			for (let j = 0; j < 2; j++) {
				if (Gameboard.board[i][j] !== Gameboard.board[i][j + 1]) same = false;
			}
		}
		// Check columns
		for (let i = 0; i < 3 && same === true; i++) {
			for (let j = 0; j < 2; j++) {
				if (Gameboard.board[j][i] !== Gameboard.board[j + 1][i]) same = false;
			}
		}
		// Check the main diagonal
		for (let j = 0; j < 2 && same === true; j++) {
			if (Gameboard.board[j][j] !== Gameboard.board[j + 1][j + 1]) same = false;
		}
		// Check the anti-diagonal
		for (let j = 0; j < 2 && same === true; j++) {
			if (Gameboard.board[j][2 - j] !== Gameboard.board[j + 1][1 - j]) same = false;
		}
		if (same === true && Game.turns === 9) return "tie";
		else if (same === false) return "win";
		else return false;
	};
	return { players, playerX, playerO, turns, start, getTurnPlayer, checkForEnd };
})();

let a = Player("x", "a", 0);
let b = Player("o", "b", 0);
Game.start(a, b);