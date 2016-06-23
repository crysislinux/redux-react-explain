import * as ActionTypes from '../actions/types';
import { combineReducers } from 'redux';

const initialState = {
  entities: {
    nodes: {
      1: {
        length: 600,
        type: 'pipe'
      },
      2: {
        type: 'step',
      },
    }
  },
  line: [1, 2],
  cursor: {
    nodeId: 1,
    progress: 0,
  },
  step: 10,
  settings: {
    running: true,
    pause: false,
    zoom: 1,
    singleStep: false,
    expandLevel: 1,
  }
};

function app(state = initialState, action) {
  const { type } = action;

  switch (type) {
    default:
      return state;
  }
}


const rootReducer = combineReducers({
  app,
});

export default rootReducer;
