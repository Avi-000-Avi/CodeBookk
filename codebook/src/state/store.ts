import {createStore,applyMiddleware} from 'redux';
import { ActionType } from './action-types';
import thunk from 'redux-thunk';
import reducers from './reducers';

export const store = createStore(reducers,{},applyMiddleware(thunk));

store.dispatch({
        type:ActionType.INSERT_CELL_AFTER,
        payload:{
            id:null,
            type:'code'
        },
});

store.dispatch({
    type:ActionType.INSERT_CELL_AFTER,
    payload:{
        id:null,
        type:'text'
    },
});

store.dispatch({
    type:ActionType.INSERT_CELL_AFTER,
    payload:{
        id:null,
        type:'code'
    },
});

store.dispatch({
type:ActionType.INSERT_CELL_AFTER,
payload:{
    id:null,
    type:'text'
},
});



console.log(store.getState());