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
					// I know this looks stupid as hell but boardCell only contains the value of the cell whilst a reference would be needed for an actual change
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

const Form = (() => {
	const prompt = () => {
		const body = document.querySelector("body");

		const formBg = document.createElement("div");
		formBg.classList.add("formBg");
		body.appendChild(formBg);

		const form = document.createElement("form");
		form.classList.add("form");
		formBg.appendChild(form);

		const title = document.createElement("h1");
		title.textContent = "Start a new game";
		form.appendChild(title);

		const vsCont = document.createElement("div");
		vsCont.classList.add("vsCont");
		for (let i = 1; i <= 2; i++) {
			if (i === 2) {
				const vsText = document.createElement("div");
				vsText.textContent = "vs";
				vsCont.appendChild(vsText);
			}
			const inputCont = document.createElement("div");
			inputCont.classList.add("inputCont");
			vsCont.appendChild(inputCont);

			const label = document.createElement("label");
			label.htmlFor = `playerName${i}`;
			if (i === 1) label.textContent = "Player X:";
			else label.textContent = "Player Y:";
			inputCont.appendChild(label);

			const input = document.createElement("input");
			input.type = "text";
			input.id = `playerName${i}`;
			inputCont.appendChild(input);
		}
		form.appendChild(vsCont);

		const start = document.createElement("button");
		start.textContent = "Start";
		start.type = "submit";
		start.addEventListener("click", (event) => {
			event.preventDefault();
			Form.createGame();
		});
		form.appendChild(start);
	};

	const createGame = () => {
		console.log("Start button clicked!");
	};
	return { prompt, createGame };
})();

let a = Player("x", "a", 0);
let b = Player("o", "b", 0);
Game.players.push(a);
Game.players.push(b);
Game.start(0, 1);