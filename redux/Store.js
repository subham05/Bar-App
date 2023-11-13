import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import AuthReducer from './reducer/AuthReducer';
import ProfileReducer from './reducer/ProfileReducer';
import {logger} from 'redux-logger';
import RootSaga from './reduxSaga/RootSaga';
import HomeReducer from './reducer/HomeReducer';

let sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, logger];

export default configureStore({
  reducer: {
    AuthReducer: AuthReducer,
    ProfileReducer:ProfileReducer,
    HomeReducer:HomeReducer
  },
  middleware,
});

sagaMiddleware.run(RootSaga);
