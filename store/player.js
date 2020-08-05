'use strict';

const initialState = {
  character: {},
  enemy: {},
  losers: [],
  difficulty:0,
};

export default (state= initialState, action) => {
  const {type, payload} = action;


  switch (type) {
  case 'CREATE':
    return {...state, character:payload};
    case 'ENEMY':
      return {...state, enemy:payload};
    case 'DEFEATED':
      return {...state, losers:[payload]};
    case 'SETDIFFICULTY':
      return {...state, difficulty:payload};
  case 'RESET': 
    return initialState;
  default: 
    return state;
  }
};

export const createPlayer = (player) => {
  return {
    type: 'CREATE',
    payload: player,
  };
};

export const setDifficulty = (value) => {
  return {
    type: 'SETDIFFICULTY',
    payload: value,
  };
};

export const createEnemy = (enemy) => {
  return {
    type: 'ENEMY',
    payload: enemy,
  };
};

export const defeat = (enemy) => {
  return {
    type: 'DEFEATED',
    payload: enemy,
  };
};

export const reset = () => {
  return {
    type: 'RESET',
  };
};
