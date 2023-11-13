import {all} from 'redux-saga/effects';
import AuthSaga from './AuthSaga';
import ProfileSaga from './ProfileSaga';
import HomeSaga from './HomeSaga';

const combinedSaga = [...AuthSaga,...ProfileSaga,...HomeSaga];

export default function* RootSaga() {
  yield all(combinedSaga);
}
