'use strict';

const btn_new = document.querySelector('.btn--new');
const btn_roll = document.querySelector('.btn--roll');
const btn_hold = document.querySelector('.btn--hold');

const player_0 = document.querySelector('.player--0');
const player_1 = document.querySelector('.player--1');

const player_0_score = document.getElementById('score--0');
const player_1_score = document.getElementById('score--1');

const player_0_running_score = document.getElementById('current--0');
const player_1_running_score = document.getElementById('current--1');

const dice = document.querySelector('.dice');

const state = {
  running_score: 0,
  player_0_total: 0,
  player_1_total: 0,
  current_player: 0,
  game_over: false
};

const reset = function() {
  player_0.classList.add('player--active');
  player_0.classList.remove('player--winner');
  player_1.classList.remove('player--active', 'player--winner');
  player_0_score.textContent = '0';
  player_1_score.textContent = '0';
  player_0_running_score.textContent = '0';
  player_1_running_score.textContent = '0';
  dice.classList.add('hidden');
  state.current_player = 0;
  state.player_0_total = 0;
  state.player_1_total = 0;
  state.running_score = 0;
  state.game_over = false;
};

const switch_player = function() {
  player_0.classList.toggle('player--active');
  player_1.classList.toggle('player--active');
  state.current_player ?
    player_1_running_score.textContent = '0' :
    player_0_running_score.textContent = '0';
  state.running_score = 0;
  state.current_player ? state.current_player = 0 : state.current_player = 1;
};

const roll = function() {
  let current = `player_${state.current_player}_total`;

  if (!(state[current] >= 100) && !state.game_over) {
    dice.classList.remove('hidden');
    let random_num = Math.floor(Math.random() * 6) + 1;
    dice.src = `dice-${random_num}.png`;

    if (random_num === 1) {
      switch_player();
    } else {
      state.running_score += random_num;
      state.current_player ?
        player_1_running_score.textContent = String(state.running_score) :
        player_0_running_score.textContent = String(state.running_score);
    }
  }
};

const hold = function() {
  if (!state.game_over) {
    let current = `player_${state.current_player}_total`;
    state[current] += state.running_score;
    state.current_player ?
      player_1_score.textContent = String(state.player_1_total) :
      player_0_score.textContent = String(state.player_0_total);

    if (state[`player_${state.current_player ? 1 : 0}_total`] >= 100) {
      state.current_player ?
        player_1.classList.add('player--winner') :
        player_0.classList.add('player--winner');
      state.game_over = true;
    }
    switch_player();
  }
};

reset();

btn_new.addEventListener('click', reset);
btn_roll.addEventListener('click', roll);
btn_hold.addEventListener('click', hold);


