import { applyMiddleware, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { ICartState } from './modules/cart/types';

import persistReducer from './persistReducer';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

export interface IState {
  cart: ICartState;
}

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(
  persistReducer(rootReducer), composeWithDevTools(
    applyMiddleware(...middleware)
  )
);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
