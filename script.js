const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceImg = document.querySelector('.dice');
const current0El = document.querySelector(`#current--0`);
const current1El = document.querySelector(`#current--1`);
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');

let activePlayer, currentScore, scores, playing;

const init = () => {
  activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  playing = true;
};

init();

const rollDice = () => {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6 + 1);
    diceImg.classList.remove('hidden');
    diceImg.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
};

const scoreHold = () => {
  if (playing) {
    scores[`${activePlayer}`] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[`${activePlayer}`];
    if (scores[`${activePlayer}`] <= 10) {
      switchPlayer();
    } else {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      playing = false;
    }
  }
};

const switchPlayer = () => {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const newGame = () => {
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  init();
};

btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', scoreHold);
btnNew.addEventListener('click', newGame);
