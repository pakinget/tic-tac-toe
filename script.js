"use strict";

const Player = (sign, name) => {
	return { sign, name };
};

const Game = (() => {
	const initiate = (playerA, playerB) => {
		Gameboard.board = [];
	};
	return { initiate };
})();