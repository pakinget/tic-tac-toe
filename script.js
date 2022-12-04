"use strict";

const Player = (sign, name) => {
	return { sign, name };
};

const Game = (() => {
	let board = [];
	const checkForEnd = () => {
		console.log("I'm not implemented... yet");
	};
	return { board, checkForEnd };
})();