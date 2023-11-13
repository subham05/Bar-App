import AsyncStorage from '@react-native-async-storage/async-storage';
import {call, put, select, takeLatest, takeEvery} from 'redux-saga/effects';
import constants from '../../utils/helpers/constants';
import Toast from '../../utils/helpers/Toast';
import moment from 'moment';
import {getApi, postApi} from '../../utils/helpers/ApiRequest';
import showErrorAlert from '../../utils/helpers/Toast';
import {
  addCardFailure,
  addCardSuccess,
  checkInFailure,
  checkInSuccess,
  currentBarFailure,
  currentBarSuccess,
  sortFailure,
  sortSuccess,
  userHomeFailure,
  userHomeSuccess,
  getCardSuccess,
  getCardFailure,
  passDetailsSuccess,
  passDetailsFailure,
  purchaseSuccess,
  purchaseFailure,
  yourPassesSuccess,
  yourPassesFailure,
  passRedeemSuccess,
  passRedeemFailure,
  passRefundSuccess,
  passRefundFailure,
  addBarSuccess,
  addBarFailure,
  requestPassSuccess,
  requestPassFailure,
  shortDistanceSuccess,
  appEnterSuccess,
  appEnterFailure,
  trendOpen,
  enterBarSuccess,
  enterBarFailure,
  todaysPassSuccess,
} from '../reducer/HomeReducer';
import {getDistance} from 'geolib';
let getItem = state => state.AuthReducer;
let token = '';
export function* userHome(action) {
  console.log('enter Filter');
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(postApi, 'user/home', action.payload, header);
    console.log('Bar list Home =====>', response.data);
    if (response?.status == 200) {
      yield put(userHomeSuccess(response?.data?.data));
      // Toast(response.data.message);
    } else {
      yield put(userHomeFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error?.response?.data?.message);
    yield put(userHomeFailure(error));
  }
}
export function* currentBar(action) {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(
      postApi,
      'user/current-bar',
      action.payload,
      header,
    );

    if (response?.status == 200) {
      console.log('current bar =====>', response?.data?.data?.users?.pass);
      yield put(currentBarSuccess(response?.data?.data));
      let arr = [];
      for (
        let index = 0;
        index < response?.data?.data?.users?.pass.length;
        index++
      ) {
        const startDate = 
          response?.data?.data?.users?.pass[index]?.start_date
        ;

        const endDate = 
          response?.data?.data?.users?.pass[index]?.end_date;
        var today = moment(new Date()).format("YYYY-MM-DD");
        console.log('today', today);
        const testDate = '2023-05-14';
        console.log('range', startDate, endDate, testDate);
        console.log(
          'locked data',
          testDate >= startDate && testDate <= endDate,
        );
        if (today >= startDate && today <= endDate) {
          arr.push(response?.data?.data?.users?.pass[index]);
        }
        // console.log("locked data", moment(testDate).isBetween(startDate, endDate));
      }
      yield put(todaysPassSuccess(arr));

      // Toast(response.data.message);
    } else {
      yield put(currentBarFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error?.response?.data?.message);
    yield put(currentBarFailure(error));
  }
}
export function* checkIn(action) {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(
      postApi,
      'user/line-check-in-update',
      action.payload,
      header,
    );
    console.log('current bar =====>', response.data);
    if (response?.status == 201) {
      yield put(checkInSuccess(response?.data?.data));
      Toast(response?.data?.message);
    } else {
      yield put(checkInFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error?.response?.data?.message);
    yield put(checkInFailure(error));
  }
}
export function* sort(action) {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(
      postApi,
      'user/bar-sorting',
      action.payload,
      header,
    );
    console.log('sort =====>', response.data);
    if (response?.status == 200) {
      yield put(sortSuccess(response?.data?.data));
      if(response?.data?.data.length== 0 )
      Toast('No Result Found');
     
    } else {
      yield put(sortFailure(response?.data));
     
    }
  } catch (error) {
    console.log(error?.response?.data?.message);
    yield put(sortFailure(error));
  }
}
export function* addCard(action) {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(postApi, 'user/card-add', action.payload, header);
    console.log('add Card =====>', response.data);
    if (response?.status == 200) {
      yield put(addCardSuccess(response?.data?.data));

      Toast(response?.data?.message);
    } else {
      yield put(addCardFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error?.response?.data?.message);
    yield put(addCardFailure(error));
  }
}
export function* getCard(action) {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(getApi, 'user/card-list', header);
    console.log('add Card =====>', response.data);
    if (response?.status == 200) {
      yield put(getCardSuccess(response?.data?.data));
    } else {
      yield put(getCardFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error?.response?.data?.message);
    yield put(getCardFailure(error));
  }
}
export function* passDetails(action) {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(
      getApi,
      `user/pass-details/${action.payload}`,
      header,
    );
    console.log('pass details =====>', response.data);
    if (response?.status == 200) {
      yield put(passDetailsSuccess(response?.data?.data));
    } else {
      yield put(passDetailsFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error?.response?.data?.message);
    yield put(passDetailsFailure(error));
  }
}
export function* purchasePass(action) {
  console.log('api calling');
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(
      postApi,
      'user/pass-purchase',
      action.payload,
      header,
    );
    console.log('add Card =====>', response.data);
    if (response?.status == 201) {
      yield put(purchaseSuccess(response?.data?.data));
      Toast(response?.data?.message);
    } else {
      yield put(purchaseFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error?.response?.data?.message);
    Toast(error?.response?.data?.message);
    yield put(purchaseFailure(error));
  }
}
export function* yourPasses(action) {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(getApi, 'user/user-passes', header);
    console.log('Your Passes =====>', response.data);
    if (response?.status == 200) {
      yield put(yourPassesSuccess(response?.data?.data));
    } else {
      yield put(yourPassesFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error?.response?.data?.message);
    yield put(yourPassesFailure(error));
  }
}
export function* passRedeem(action) {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(
      postApi,
      'user/pass-redeem',
      action.payload,
      header,
    );
    console.log('passd redeem=====>', response.data);
    if (response?.status == 200) {
      yield put(passRedeemSuccess(response?.data?.data));

      Toast(response?.data?.message);
    } else {
      yield put(passRedeemFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error?.response?.data?.message);
    yield put(passRedeemFailure(error));
  }
}
export function* passRefund(action) {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(
      postApi,
      'user/refund-request',
      action.payload,
      header,
    );
    console.log('passd redeem=====>', response.data);
    if (response?.status == 200) {
      yield put(passRefundSuccess(response?.data?.data));

      Toast(response?.data?.message);
    } else {
      yield put(passRefundFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error?.response?.data?.message);
    yield put(passRefundFailure(error));
  }
}
export function* addBar(action) {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(postApi, 'user/add-bar', action.payload, header);
    if (response?.status == 200) {
      yield put(addBarSuccess(response?.data?.data));

      Toast(response?.data?.message);
    } else {
      yield put(addBarFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error?.response?.data?.message);
    yield put(addBarFailure(error));
  }
}
export function* requestPass1(action) {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(
      postApi,
      'user/request-for-pass',
      action.payload,
      header,
    );
    if (response?.status == 200) {
      yield put(requestPassSuccess(response?.data?.data));

      Toast(response?.data?.message);
    } else {
      yield put(requestPassFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error?.response?.data?.message);
    yield put(requestPassFailure(error));
  }
}
export function* appEnter(action) {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(postApi, 'user/app-log', action.payload, header);
    if (response?.status == 200) {
      yield put(appEnterSuccess(true));
    } else {
      yield put(appEnterFailure(response?.data));
    }
  } catch (error) {
    console.log(error?.response?.data?.message);
    yield put(appEnterFailure(error));
  }
}
export function* storeSortValue(action) {
  yield call(
    AsyncStorage.setItem,
    constants.FILTERVALUE,
    JSON.stringify(action.payload),
  );
}
export function* trendBollean(action) {
  yield put(trendOpen(action.payload));
}
export function* shortDistance(action) {
  console.log('saga data', action.payload);
  console.log('Current loc', action.payload[1]);
  let arr = [];
  let arr1 = [];
  for (let index = 0; index < action.payload[0]?.length; index++) {
    arr.push({
      lat: action.payload[0][index]?.lat,
      long: action.payload[0][index]?.long,
    });
  }
  var lat = action.payload[1][0];
  var lng = action.payload[1][1];
  const current = {latitude: lat, longitude: lng};
  console.log('---Current', current);
  for (let index1 = 0; index1 < arr.length; index1++) {
    console.log('---index', arr[index1]);
    arr1.push({
      distance:
        getDistance(current, {
          latitude: arr[index1]?.lat,
          longitude: arr[index1]?.long,
        }) * 3.28084,
    });
  }
  var lowest = 0;
  var count1 = 1;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i]?.distance <= arr1[lowest]?.distance) {
      if (arr1[i]?.distance < 400) {
        lowest = i;
        count1++;
        console.log('count', count1, lowest);
      }
    }
  }
  if (count1 > 1) {
    yield put(shortDistanceSuccess(lowest));
  }

  console.log('lowest', lowest);

  console.log('latlongsaga', arr1);
}
export function* barEnter(action) {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(
      postApi,
      'user/checked-in-update',
      action.payload,
      header,
    );
    if (response?.status == 201) {
      yield put(enterBarSuccess(true));
    } else {
      yield put(enterBarFailure(response?.data));
    }
  } catch (error) {
    console.log(error?.response?.data?.message);
    yield put(appEnterFailure(error));
  }
}
const watchFunction = [
  (function* () {
    yield takeLatest('Home/userHomeRequest', userHome);
  })(),
  (function* () {
    yield takeLatest('Home/currentBarRequest', currentBar);
  })(),
  (function* () {
    yield takeLatest('Home/checkInRequest', checkIn);
  })(),
  (function* () {
    yield takeLatest('Home/sortRequest', sort);
  })(),
  (function* () {
    yield takeLatest('Home/storeSortData', storeSortValue);
  })(),
  (function* () {
    yield takeLatest('Home/addCardRequest', addCard);
  })(),
  (function* () {
    yield takeLatest('Home/getCardRequest', getCard);
  })(),
  (function* () {
    yield takeLatest('Home/passDetailsRequest', passDetails);
  })(),
  (function* () {
    yield takeLatest('Home/purchaseRequest', purchasePass);
  })(),
  (function* () {
    yield takeLatest('Home/yourPassesRequest', yourPasses);
  })(),
  (function* () {
    yield takeLatest('Home/passRedeemRequest', passRedeem);
  })(),
  (function* () {
    yield takeLatest('Home/passRefundRequest', passRefund);
  })(),
  (function* () {
    yield takeLatest('Home/addBarRequest', addBar);
  })(),
  (function* () {
    yield takeLatest('Home/requestPass', requestPass1);
  })(),
  (function* () {
    yield takeLatest('Home/shortDistanceRequest', shortDistance);
  })(),
  (function* () {
    yield takeLatest('Home/appEnterRequest', appEnter);
  })(),
  (function* () {
    yield takeLatest('Home/trendReq', trendBollean);
  })(),
  (function* () {
    yield takeLatest('Home/enterBarRequest', barEnter);
  })(),
];

export default watchFunction;
