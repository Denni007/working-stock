import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer, productUpdateReducer } from '../reducers/productReducers';
import {  addressCreateReducer, addressReducer, cartReducer, deleteAddressReducer } from '../reducers/cartReducers';
import { userRegisterReducer, userSigninReducer } from '../reducers/userReducers';
import { orderCreateReducer, orderDeleteReducer, orderDetailsReducer, orderListReducer, orderPayReducer } from '../reducers/orderReducers';

// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import productReducer from './slices/product';
import calendarReducer from './slices/calendar';
import kanbanReducer from './slices/kanban';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const   productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const  userPersistConfig = {
  key: 'userSignin',
  storage,
};
const  cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['cartItems'],
};

const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  userSignin:  persistReducer(userPersistConfig, userSigninReducer),
  userRegister: userRegisterReducer,
  cart: cartReducer,
  addressCreate: addressCreateReducer,
  addressList: addressReducer,
  deleteAddress: deleteAddressReducer,
  orderCreate: orderCreateReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderDetails: orderDetailsReducer,
  orderPay:orderPayReducer,
  productUpdate:productUpdateReducer,
  productCreate:productCreateReducer,
  productDelete: productDeleteReducer,
  product: persistReducer(productPersistConfig, productReducer),
});

export { rootPersistConfig, rootReducer };
