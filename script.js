"use strict";

const Player = (sign, name) => {
	return { sign, name };
};

const Gameboard = (() => {
	let board = [["x", "o", "x"], ["x", "o", "x"], ["o", "x", "o"]];
	let node;

	const create = (playerX, playerO) => {
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
					let sign;
					if (Game.turns % 2 === 0) sign = playerO.sign;
					else sign = playerX.sign;
					// I know this looks stupid as hell but boardCell only contains the value of the cell whilst a reference would be needed for an actual change
					Gameboard.board[Math.floor(index / 3)][Math.floor(index - Math.floor(index / 3) * 3)] = sign;
					Gameboard.update();
					if (Gameboard.checkForEnd() === true) {
						let winner;
						if (Game.turns % 2 === 0) winner = playerO;
						else winner = playerX;
						console.log(`The end. ${winner.name} won!`);
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
	let turns = 0;

	const start = (playerX, playerO) => {
		Game.turns = 0;
		Gameboard.reset();
		Gameboard.create(playerX, playerO);
		Gameboard.update();
	};

	return { turns, start };
})();

const Form = (() => {
	const prompt = () => {
		const body = document.querySelector("body");

		const formBg = document.createElement("div");
		formBg.classList.add("formBg");
		formBg.addEventListener("click", (event) => {
			if (event.target === formBg) Form.cancel();
			else console.log("Bubbling click detected on formBg");
		});
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
			else label.textContent = "Player O:";
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
		const inputX = document.getElementById("playerName1");
		const inputO = document.getElementById("playerName2");
		const playerX = Player("x", inputX.value);
		const playerO = Player("o", inputO.value);
		Game.start(playerX, playerO);
	};

	const cancel = () => {
		const formBg = document.querySelector(".formBg");
		if (formBg !== null) formBg.remove();
		else console.log("No element with the class formBg found");
	};
	return { prompt, createGame, cancel };
})();
