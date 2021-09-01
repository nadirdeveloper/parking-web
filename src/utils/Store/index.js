import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from '../../Redux/Reducers';

// const loggerMiddleware = createLogger();
const middlewares = [thunkMiddleware]
export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(
        ...middlewares
    ))
);