import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from '../../Redux/Reducers';

const middlewares = [thunkMiddleware]
export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(
        ...middlewares
    ))
);