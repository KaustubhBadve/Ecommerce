import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import {thunk} from 'redux-thunk'
import {Reducer} from './reducer'

const rootReducer = combineReducers({
  mainReducer: Reducer,
//   users: usersReducer
})

const middlewareEnhancer = applyMiddleware(thunk)

const composeWithDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const composedEnhancers = composeWithDevTools(middlewareEnhancer)

export const store = createStore(rootReducer, composedEnhancers)