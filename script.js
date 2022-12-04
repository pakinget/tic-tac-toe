"use strict";

const Player = (sign, name) => {
	return { sign, name };
};

const Gameboard = (() => {
	let board = [];
	return { board };
})();

const Game = (() => {
	const initiate = (playerA, playerB) => {
		Gameboard.board = [];
	};
	return { initiate };
})();