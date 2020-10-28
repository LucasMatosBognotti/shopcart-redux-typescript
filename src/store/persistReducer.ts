import { Reducer, Action, CombinedState } from 'redux';
import { persistReducer,  } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ICartState } from './modules/cart/types';

export default (reducers: Reducer<CombinedState<{ cart: ICartState; }>, Action<any>>) => {
  const persistedReducer = persistReducer(
    {
      key: 'shopcart',
      storage,
      whitelist: ['cart'],
    },
    reducers
  );

  return persistedReducer;
};
