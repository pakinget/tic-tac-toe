"use strict";

const Player = (sign, name) => {
	return { sign, name };
};

const Gameboard = (() => {
	let board = [];
	return { board };
})();

const Game = (() => {
	const start = (playerA, playerB) => {
		Gameboard.board = [];
	};
	return { initiate };
})();