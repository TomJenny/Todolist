import { createStore, applyMiddleware, combineReducers } from 'redux';
import { ToDoListReducer } from './reducers/ToDoListReducer';
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    ToDoListReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));