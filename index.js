/* Initialise le dès */

const dice = new Dice(document.getElementById("container"));
dice.onroll = function(number) {
  	dice.reset();
};


/* Initialise le changement de taille du dès */

const DICE_SIZE = document.getElementById("dice-size");

function changeDiceSize() {
	document.querySelector(':root').style.setProperty('--edge-size', `${DICE_SIZE.value}px`);
};
changeDiceSize();

DICE_SIZE.addEventListener('input', changeDiceSize);