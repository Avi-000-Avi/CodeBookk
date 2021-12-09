import { combineReducers } from 'redux';
import cellsReducer from './cellsReducer';
import bundlesReducer from './bundlesReducer';

const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;

//Types to useSelector
//Define a new type called RootState - describes the overall structure of the state object inside of redux store

//ReturnType<>: returns the type of the return inside the <>
//typeof reducers: the complicated redux type of the reducer that we will let TypeScript decode.

//You will have many 'reducers' that reduce certain state change actions, and these reducers will combine into a 'root reducer', that will combine all the states.