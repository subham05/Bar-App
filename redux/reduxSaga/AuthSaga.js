import AsyncStorage from '@react-native-async-storage/async-storage';
import {call, put, select, takeLatest, takeEvery} from 'redux-saga/effects';
import constants from '../../utils/helpers/constants';
import {
  countryRequest,
  countrySuccess,
  countryFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  forgotpasswordRequest,
  forgotpasswordSuccess,
  forgotpasswordFailure,
  getTokenRequest,
  getTokenSuccess,
  getTokenFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  otpverificationRequest,
  otpverificationSuccess,
  otpverificationFailure,
  craetenewpasswordRequest,
  craetenewpasswordSuccess,
  craetenewpasswordFailure,
  socialLoginRequest,
  socialLoginSuccess,
  socialLoginFailure,
  cmsdataRequest,
  cmsdataSuccess,
  cmsdataFailure,
  clearLogin,
  userNameCreateSuccess,
  userNameCreateFailure,
  checkEmailSuccess,
  checkEmailFailure,
  collegeSearchSuccess,
  collegeSearchFailure,
} from '../reducer/AuthReducer';

import Toast from '../../utils/helpers/Toast';
import {getApi, postApi} from '../../utils/helpers/ApiRequest';
let getItem = state => state.AuthReducer;
let token = '';

///tokenSaga

export function* gettokenSaga() {
  try {
    const response = yield call(AsyncStorage?.getItem, constants?.TOKEN);
    console.log(response);

    if (response != null) {
      yield put(getTokenSuccess(response));
    } else {
      yield put(getTokenSuccess(null));
    }
  } catch (error) {
    yield put(getTokenFailure(error));
  }
}

//country saga

export function* countrySaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(
      getApi,
      'country',
      // action.payload,
      header,
    );
    console.log(response);
    if (response?.status == 200) {
      yield put(countrySuccess(response?.data));
      // Toast(response.data.message);
    } else {
      yield put(countryFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(countryFailure(error));
  }
}

//signupSaga saga

export function* signupSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(postApi, 'register', action?.payload, header);
    console.log('Signup===========', response);
    if (response?.status == 201) {
      yield put(signupSuccess(response?.data));
      // Toast(response.data.message);
    } else {
      yield put(signupFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(signupFailure(error));
    // Toast(
    //   error?.response?.data?.message == 'Validation Error.'
    //     ? error?.response?.data?.data?.email[0]
    //     : error?.response?.data?.message,
    // );
    Toast("Some Thing went Wrong");
  }
}

//login saga

export function* loginSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(postApi, 'login', action.payload.creads, header);
    console.log(response);
    if (response?.status == 200) {
      console.log('response Previous', response?.data?.data?.is_previous_user);
      if (action.payload.savePassword) {
        yield call(
          AsyncStorage.setItem,
          constants.WHICHCREADS,
          JSON.stringify({
            email: action?.payload?.creads?.email ?? '',
            password: action?.payload?.creads?.password ?? '',
          }),
        );
      }
      if (response?.data?.data?.is_previous_user == 0) {
        yield call(
          AsyncStorage.setItem,
          constants.TOKEN,
          response?.data?.token,
        );
        yield put(getTokenSuccess(response?.data?.token));
      }
      yield put(loginSuccess(response?.data?.data));
      // Toast('Login Successful');
    } else {
      yield put(loginFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(loginFailure(error));
    Toast(error?.response?.data?.message);
  }
}
//forgot password

export function* forgotpasswordSaga(action) {
  console.log('hi');
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(
      postApi,
      'forgot-password',
      action.payload,
      header,
    );
    console.log(response);
    if (response?.status == 200) {
      yield put(forgotpasswordSuccess(response?.data));
      Toast(response?.data?.message);
    }
    //  else if (response.data.status == 403) {
    //     yield put(signupSuccess(response.data));
    //     // Toast(response.data.message);
    //   }
    else {
      yield put(forgotpasswordFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(forgotpasswordFailure(error));
    Toast(error?.response?.data?.message);
  }
}

////otpverification

export function* otpverificationSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(postApi, 'otp-verify', action.payload, header);
    console.log(response);
    if (response?.status == 200) {
      yield put(otpverificationSuccess(response?.data));
      Toast(response?.data?.message);
    } else {
      yield put(otpverificationFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(otpverificationFailure(error));
    Toast(error?.response?.data?.message);
  }
}

///create new password

export function* craetenewpasswordSaga(action) {
  const items = yield select(getItem);
  console.log(items?.otpverificationResponse?.token);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items?.otpverificationResponse?.token,
  };
  try {
    let response = yield call(
      postApi,
      'set-new-password',
      action.payload,
      header,
    );
    console.log(response);
    if (response?.status == 200) {
      yield put(craetenewpasswordSuccess(response?.data));
      Toast(response?.data?.message);
    } else {
      yield put(craetenewpasswordFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(craetenewpasswordFailure(error));
    Toast(error?.response?.data?.message);
  }
}

//logout
export function* logoutSaga() {
  const items = yield select(getItem);
  console.log(items?.getTokenResponse);
  // const header = {
  //   Accept: 'application/json',
  //   contenttype: 'application/json',
  //   accesstoken: items.getTokenResponse,
  // };

  yield call(AsyncStorage.removeItem, constants.TOKEN);
  yield put(getTokenSuccess(null));
  yield put(logoutSuccess('logout'));
  yield put(clearLogin());
  Toast('Logout Successful');
}

//Social Login

export function* socialLoginSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(postApi, 'social-login', action.payload, header);
    console.log(response);
    if (response?.status == 200) {
      //  if(action.payload.savePassword){
      //           yield call(
      //             AsyncStorage.setItem,
      //             constants.WHICHCREADS,
      //             JSON.stringify({
      //               email: action?.payload?.creads?.email ?? '',
      //               password: action?.payload?.creads?.password ?? '',
      //             }),
      //           );
      //         }

      yield call(AsyncStorage.setItem, constants.TOKEN, response?.data?.token);
      yield put(getTokenSuccess(response?.data?.token));

      yield put(socialLoginSuccess(response?.data?.data));
      Toast(response?.data?.message);
    } else {
      yield put(socialLoginFailure(response?.data));
      // Toast(response.data.message);
    }
  } catch (error) {
    console.log(error);
    yield put(socialLoginFailure(error));
    Toast(error?.response?.data?.message);
  }
}
//cms data

export function* cmsdataSaga(action) {
  const items = yield select(getItem);
  console.log(items?.otpverificationResponse?.token);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(postApi, 'cms', action.payload, header);
    console.log(response);
    if (response?.status == 200) {
      yield put(cmsdataSuccess(response?.data));
      //  Toast(response?.data?.message);
    } else {
      yield put(cmsdataFailure(response?.data));
      // Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(cmsdataFailure(error));
    // Toast(error?.response?.data?.message);
  }
}
export function* userNameCreate(action) {
  const items = yield select(getItem);
  console.log(items?.otpverificationResponse?.token);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(
      postApi,
      'check-username',
      action.payload,
      header,
    );
    console.log(response);
    if (response?.status == 200) {
      yield put(userNameCreateSuccess(response?.data));
      Toast(response?.data?.message);
    } else {
      yield put(userNameCreateFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(userNameCreateFailure(error));
    Toast(error?.response?.data?.message);
  }
}
export function* checkEmail(action) {
  const items = yield select(getItem);
  console.log(items?.otpverificationResponse?.token);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(postApi, 'check-email', action.payload, header);
    console.log(response);
    if (response?.status == 200) {
      yield put(checkEmailSuccess(response?.data));
      Toast(response?.data?.message);
    } else {
      yield put(checkEmailFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(checkEmailFailure(error));
    Toast(error?.response?.data?.message);
  }
}
export function* collegeSearch(action) {
  const items = yield select(getItem);
  console.log(items?.otpverificationResponse?.token);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(
      postApi,
      'search-college',
      action.payload,
      header,
    );
    console.log(response);
    if (response?.status == 200) {
      yield put(collegeSearchSuccess(response?.data));
      //  Toast(response?.data?.message);
    } else {
      yield put(collegeSearchFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(collegeSearchFailure(error));
    Toast(error?.response?.data?.message);
  }
}

const watchFunction = [
  (function* () {
    yield takeLatest('Auth/countryRequest', countrySaga);
  })(),
  (function* () {
    yield takeLatest('Auth/signupRequest', signupSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/loginRequest', loginSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/forgotpasswordRequest', forgotpasswordSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/otpverificationRequest', otpverificationSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/craetenewpasswordRequest', craetenewpasswordSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/getTokenRequest', gettokenSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/logoutRequest', logoutSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/socialLoginRequest', socialLoginSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/cmsdataRequest', cmsdataSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/userNameCreateRequest', userNameCreate);
  })(),
  (function* () {
    yield takeLatest('Auth/checkEmailRequest', checkEmail);
  })(),
  (function* () {
    yield takeLatest('Auth/collegeSearchRequest', collegeSearch);
  })(),
];

export default watchFunction;
