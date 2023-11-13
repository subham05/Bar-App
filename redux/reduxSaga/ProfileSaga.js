import AsyncStorage from '@react-native-async-storage/async-storage';
import {call, put, select, takeLatest, takeEvery} from 'redux-saga/effects';
import constants from '../../utils/helpers/constants';
import moment from 'moment';
import {
  passdetailsRequest,
  passdetailsSuccess,
  passdetailsFailure,
  userpassesdetailsRequest,
  userpassesdetailsSuccess,
  userpassesdetailsFailure,
  fetchpassidRequest,
  fetchpassidSuccess,
  fetchpassidFailure,
  profileRequest,
  profileSuccess,
  profileFailure,
  purchaseRequest,
  purchaseSuccess,
  purchaseFailure,
  redeempassRequest,
  redeempassSuccess,
  redeempassFailure,
  refundRequest,
  refundSuccess,
  refundFailure,
  historyRequest,
  historySuccess,
  historyFailure,
  deleteaccountRequest,
  deleteaccountSuccess,
  deleteaccountFailure,
  getpaymentmethodRequest,
  getpaymentmethodSuccess,
  getpaymentmethodFailure,
  addcardRequest,
  addcardSuccess,
  addcardFailure,
  getcardRequest,
  getcardSuccess,
  getcardFailure,
  updatecardRequest,
  updatecardSuccess,
  updatecardFailure,
  removecardRequest,
  removecardSuccess,
  removecardFailure,
  secureRequest,
  secureSuccess,
  secureFailure,
  barVisitSuccess,
  barVisitFailure,
  totalFriendSuccess,
  totalFriendFailure,
  addFriendSuccess,
  addFriendFailure,
  collegeModeSuccess,
  collegeModeFailure,
  profilePicUpdateSuccess,
  profilePicUpdateFailure,
  deleteCardSuccess,
  deleteCardFailure,
  editCardSuccess,
  editCardFailure,
  lastWeekSuccess,
  lastWeekFailure,
  profileNameUpdateSuccess,
  profileNameUpdateFailure,
  friendReqListSuccess,
  friendReqListFailure,
  friendSendSuccess,
  friendSendFailure,
  deleteFriendSuccess,
  deleteFriendFailure,
  acceptRejectSuccess,
  acceptRejectFailure,
  InviteInfoSuccess,
  InviteInfoFailure,
} from '../reducer/ProfileReducer';
import {
  getTokenRequest,
  getTokenSuccess,
  getTokenFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  clearLogin,
} from '../reducer/AuthReducer';
import {
  getBarListSuccess,
  getBarListFailure,
  getFavoutiteListSuccess,
  getFavoutiteListFailure,
  getTagRequest,
  getTagSuccess,
  getTagFailure,
  getNearBySuccess,
  getNearByFailure,
  getFilterSuccess,
  getFilterFailure,
  favouriteSuccess,
  favouriteFailure,
  barDetailsSuccess,
  barDetailsFailure,
  todaysPassSuccess,
} from '../reducer/HomeReducer';
import Toast from '../../utils/helpers/Toast';
import {getApi, postApi} from '../../utils/helpers/ApiRequest';
import showErrorAlert from '../../utils/helpers/Toast';
let getItem = state => state.AuthReducer;
let token = '';

//country saga

export function* passdetailsSaga(action) {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(
      getApi,
      'barowner-list',
      // action.payload,
      header,
    );
    console.log(response);
    if (response?.status == 200) {
      yield put(passdetailsSuccess(response?.data));
      // Toast(response.data.message);
    } else {
      yield put(passdetailsFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(passdetailsFailure(error));
  }
}

//userpassdetails Saga

export function* userpassesdetailsSaga(action) {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(
      getApi,
      'user-passes',
      // action.payload,
      header,
    );
    console.log(response);
    if (response?.status == 200) {
      yield put(userpassesdetailsSuccess(response?.data));
      // Toast(response.data.message);
    } else {
      yield put(userpassesdetailsFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(userpassesdetailsFailure(error));
  }
}

//fetch pass id Saga

export function* fetchpassidSaga(action) {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(
      getApi,
      `pass-details/${action.payload}`,
      // action.payload,
      header,
    );
    console.log(response);
    if (response?.status == 200) {
      yield put(fetchpassidSuccess(response?.data?.data));
      // Toast(response.data.message);
    } else {
      yield put(fetchpassidFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(fetchpassidFailure(error));
  }
}

//Profile Saga

export function* profileSaga() {
  console.log('enter');
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(getApi, 'user/profile', header);
    console.log('profile Data=====>', response.data);
    if (response?.status == 200) {
      yield put(profileSuccess(response?.data?.data));
      // Toast(response.data.message);
    } else {
      yield put(profileFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    if (error?.response?.data?.message == 'Unauthenticated') {
      console.log('un++++++++');
      yield call(AsyncStorage.removeItem, constants.TOKEN);
      yield put(getTokenSuccess(null));
      yield put(logoutSuccess('logout'));
      yield put(clearLogin());
      Toast('Logout Successful');
    }
    console.log(error?.response?.data?.message);
    yield put(profileFailure(error));
  }
}

//Purchase Saga

export function* purchaseSaga(action) {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(postApi, 'pass-purchase', action.payload, header);
    console.log(response);
    if (response?.status == 201) {
      yield put(purchaseSuccess(response?.data));
      // Toast(response.data.message);
    } else {
      yield put(purchaseFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(purchaseFailure(error));
    Toast(error?.response?.data?.message);
  }
}

//Redeem Saga

export function* redeempassSaga(action) {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(postApi, 'pass-redeem', action.payload, header);
    console.log(response);
    if (response?.status == 200) {
      yield put(redeempassSuccess(response?.data));
      // Toast(response.data.message);
    } else {
      yield put(redeempassFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(redeempassFailure(error));
    Toast(error?.response?.data?.message);
  }
}

//Refund Saga

export function* refundSaga(action) {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(
      postApi,
      'refund-request',
      action.payload,
      header,
    );
    console.log(response);
    if (response?.status == 200) {
      yield put(refundSuccess(response?.data));
      // Toast(response.data.message);
    } else {
      yield put(refundFailure(response?.data));
      // Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(refundFailure(error));
    // Toast(error?.response?.data?.message)
  }
}

//History Saga

export function* historySaga(action) {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(
      getApi,
      'user/payment-history',
      //  action.payload,
      header,
    );
    console.log(response);
    if (response?.status == 200) {
      yield put(historySuccess(response?.data));
      // Toast(response.data.message);
    } else {
      yield put(historyFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(historyFailure(error));
    Toast(error?.response?.data?.message);
  }
}

//Delete Saga

export function* deleteaccountSaga(action) {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(
      getApi,
      'user-delete',
      //  action.payload,
      header,
    );
    console.log(response);
    if (response?.status == 200) {
      yield put(deleteaccountSuccess(response?.data));
      yield call(AsyncStorage.removeItem, constants.TOKEN);
      yield put(getTokenSuccess(null));
      yield put(logoutSuccess('logout'));
      Toast('Account has been deleted successfully');
      // Toast(response.data.message);
    } else {
      yield put(deleteaccountFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(deleteaccountFailure(error));
    Toast(error?.response?.data?.message);
  }
}

//get payment method

export function* getpaymentmethodSaga(action) {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(
      getApi,
      'card-list',
      //  action.payload,
      header,
    );
    console.log(response);
    if (response?.status == 200) {
      yield put(getpaymentmethodSuccess(response?.data));
      // Toast(response.data.message);
    } else {
      yield put(getpaymentmethodFailure(response?.data));
      // Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(getpaymentmethodFailure(error));
    // Toast(error?.response?.data?.message)
  }
}

//Add card

export function* addcardSaga(action) {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(postApi, 'card-add', action.payload, header);
    console.log(response);
    if (response?.status == 200) {
      yield put(addcardSuccess(response?.data));
      // Toast(response.data.message);
    } else {
      yield put(addcardFailure(response?.data));
      // Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(addcardFailure(error));
    // Toast(error?.response?.data?.message)
  }
}

//get card details
export function* getcardSaga(action) {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(postApi, 'card-edit', action.payload, header);
    console.log(response);
    if (response?.status == 200) {
      yield put(getcardSuccess(response?.data));
      // Toast(response.data.message);
    } else {
      yield put(getcardFailure(response?.data));
      // Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(getcardFailure(error));
    // Toast(error?.response?.data?.message)
  }
}

//update card details
export function* updatecardSaga(action) {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(
      postApi,
      'user/card-update',
      action.payload,
      header,
    );
    console.log(response);
    if (response?.status == 200) {
      yield put(updatecardSuccess(response?.data));
      Toast(response.data.message);
    } else {
      yield put(updatecardFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(updatecardFailure(error));
    // Toast(error?.response?.data?.message)
  }
}

//remove card details
export function* removecardSaga(action) {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items.getTokenResponse,
  };

  try {
    let response = yield call(postApi, 'card-delete', action.payload, header);
    console.log(response);
    if (response?.status == 200) {
      yield put(removecardSuccess(response?.data));
      // Toast(response.data.message);
    } else {
      yield put(removecardFailure(response?.data));
      // Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(removecardFailure(error));
    // Toast(error?.response?.data?.message)
  }
}

//secure
export function* secureSaga(action) {
  console.log('Action0-----', action.payload);
  const items = yield select(getItem);
  const navigation = action.payload.navigation;
  let obj = {
    old_password: action.payload.old_password,
    new_password: action.payload.new_password,
    confirm_password: action.payload.confirm_password,
  };
  console.log('ActionObje', obj);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(postApi, 'user/change-password', obj, header);
    console.log('secure Respose', response.data);
    if (response?.status == 200) {
      yield put(secureSuccess(response?.data));
      showErrorAlert(response?.data?.message);
      navigation.goBack();
      Toast(response?.data?.message);
    } else {
      yield put(secureFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(secureFailure(error));
    Toast(error?.response?.data?.message);
  }
}
export function* getBarList(action) {
  console.log('enter bar');
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(postApi, 'user/bar-list', action.payload, header);
    console.log('barlist=====>', response.data);
    if (response?.status == 200) {
      yield put(getBarListSuccess(response?.data?.data));
      // Toast(response.data.message);
    } else {
      yield put(getBarListFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error?.response?.data?.message);
    yield put(getBarListFailure(error));
  }
}
export function* getFavouriteList() {
  console.log('Favourite bar');
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(getApi, 'user/fav-list', header);
    console.log('barlist=====>', response.data);
    if (response?.status == 200) {
      yield put(getFavoutiteListSuccess(response?.data?.data));
      // Toast(response.data.message);
    } else {
      yield put(getFavoutiteListFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error?.response?.data?.message);
    yield put(getFavoutiteListFailure(error));
  }
}
export function* getTag() {
  console.log('Tags');
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(getApi, 'user/tag-list', header);
    console.log('barlist=====>', response.data);
    if (response?.status == 200) {
      yield put(getTagSuccess(response?.data?.data));
      // Toast(response.data.message);
    } else {
      yield put(getTagFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error?.response?.data?.message);
    yield put(getTagFailure(error));
  }
}
export function* getNearBy(action) {
  console.log('enter Nearby');
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(
      postApi,
      'user/near-by-bar-list',
      action.payload,
      header,
    );
    console.log('nearby=====>', response.data);
    if (response?.status == 200) {
      yield put(getNearBySuccess(response?.data?.data));
      // Toast(response.data.message);
    } else {
      yield put(getNearByFailure(response?.data));
      // Toast(response?.data?.message);
    }
  } catch (error) {
    yield put(getNearByFailure(error));
  }
}
export function* getFilter(action) {
  console.log('enter Filter');
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(
      postApi,
      'user/tag-filter',
      action.payload,
      header,
    );
    console.log('Filter=====>', response.data);
    if (response?.status == 200) {
      yield put(getFilterSuccess(response?.data?.data));
      // if(response?.data?.data.length > 0){
      //   Toast(response.data.message);
      // }
      // else {
      //   Toast('No Result Found');
      // }
    } else {
      yield put(getFilterFailure(response?.data));
      // Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error?.response?.data?.message);
    yield put(getFilterFailure(error));
  }
}
export function* favouriteAdd(action) {
  console.log('enter Filter');
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(
      postApi,
      'user/add-or-remove-fav',
      action.payload,
      header,
    );
    console.log('Filter=====>', response.data);
    if (response?.status == 200) {
      yield put(favouriteSuccess(response?.data?.data));
      // Toast(response.data.message);
    } else {
      yield put(favouriteFailure(response?.data));
      // Toast(response?.data?.message);
    }
  } catch (error) {
    yield put(favouriteFailure(error));
  }
}
export function* barDetails(action) {
  console.log('enter Filter');
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(
      postApi,
      'user/bar-details',
      action.payload,
      header,
    );
    console.log('Bar Details=====>', response.data);
    if (response?.status == 200) {
      yield put(barDetailsSuccess(response?.data?.data));
      // Toast(response.data.message);
      let arr = [];
      for (
        let index = 0;
        index < response?.data?.data?.bar_details?.pass?.length;
        index++
      ) {
        const startDate =
          response?.data?.data?.bar_details?.pass[index]?.start_date;
        const endDate =
          response?.data?.data?.bar_details?.pass[index]?.end_date;
        var today = moment(new Date()).format('YYYY-MM-DD');
        console.log('today', today);
        const testDate = new Date('2023-04-05');
        console.log(
          'range',
          response?.data?.data?.bar_details?.pass[index]?.start_date,
          response?.data?.data?.bar_details?.pass[index]?.end_date,
          testDate,
        );
        console.log(
          'locked data',
          testDate >= startDate && testDate <= endDate,
        );
        if (today >= startDate && today <= endDate) {
          arr.push(response?.data?.data?.bar_details?.pass[index]);
        }

        // console.log("locked data", moment(testDate).isBetween(startDate, endDate));
      }
      yield put(todaysPassSuccess(arr));
      console.log('details', arr);
    } else {
      yield put(barDetailsFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error?.response?.data?.message);
    yield put(barDetailsFailure(error));
  }
}
export function* barVisit() {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(getApi, 'user/bar-visited', header);
    console.log('bar Vsited=====>', response.data);
    if (response?.status == 200) {
      yield put(barVisitSuccess(response?.data?.data));
      // Toast(response.data.message);
    } else {
      yield put(barVisitFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error?.response?.data?.message);
    yield put(barVisitFailure(error));
  }
}
export function* totalFriend(action) {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(
      postApi,
      'user/total-friend',
      action.payload,
      header,
    );
    console.log('Total Search  Friend=====>', response.data);
    if (response?.status == 200) {
      yield put(totalFriendSuccess(response?.data?.data));
      // Toast(response.data.message);
    } else {
      yield put(totalFriendFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error?.response?.data?.message);
    yield put(totalFriendFailure(error));
  }
}
export function* addFriend(action) {
  console.log('====================================enter Add');

  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(
      postApi,
      'user/add-friend',
      action.payload,
      header,
    );
    console.log('Add Friend=====>', response.data);
    if (response?.status == 200) {
      yield put(addFriendSuccess(response?.data?.data));
      Toast(response?.data?.message);
    } else {
      yield put(addFriendFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error?.response?.data?.message);
    yield put(addFriendFailure(error));
  }
}
export function* collegeMode(action) {
  console.log('====================================Enter Collge');

  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(
      postApi,
      'user/update-college-mode',
      action.payload,
      header,
    );
    if (response?.status == 200) {
      yield put(collegeModeSuccess(response?.data?.data));
      if (response?.data?.data?.is_college == 1) {
        Toast(response?.data?.message);
      }
    } else {
      yield put(collegeModeFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error?.response?.data?.message);
    yield put(collegeModeFailure(error));
  }
}
export function* profilePicUpdate(action) {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(
      postApi,
      'user/profile-photo-update',
      action.payload,
      header,
    );
    if (response?.status == 200) {
      yield put(profilePicUpdateSuccess(response?.data?.data));
      Toast(response?.data?.message);
    } else {
      yield put(profilePicUpdateFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error?.response?.data?.message);
    yield put(profilePicUpdateFailure(error));
  }
}
export function* deleteCard(action) {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(
      postApi,
      'user/card-delete',
      action.payload,
      header,
    );
    if (response?.status == 200) {
      yield put(deleteCardSuccess(response?.data?.data));
      Toast(response?.data?.message);
    } else {
      yield put(deleteCardFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error?.response?.data?.message);
    yield put(deleteCardFailure(error));
  }
}
export function* editCard(action) {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(
      postApi,
      'user/card-edit',
      action.payload,
      header,
    );
    if (response?.status == 200) {
      yield put(editCardSuccess(response?.data?.data));
      Toast(response?.data?.message);
    } else {
      yield put(editCardFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error?.response?.data?.message);
    yield put(editCardFailure(error));
  }
}
export function* lastWeek() {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(getApi, 'user/last-week-user-login', header);
    if (response?.status == 200) {
      yield put(lastWeekSuccess(response?.data?.data));
      // Toast(response.data.message);
    } else {
      yield put(lastWeekFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error?.response?.data?.message);
    yield put(lastWeekFailure(error));
  }
}
export function* ProfileNameUpdate(action) {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(
      postApi,
      'user/profile-update',
      action.payload,
      header,
    );
    if (response?.status == 200) {
      yield put(profileNameUpdateSuccess(response?.data?.data));
      Toast(response?.data?.message);
    } else {
      yield put(profileNameUpdateFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error?.response?.data?.message);
    yield put(profileNameUpdateFailure(error));
  }
}
export function* friendReq() {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(
      getApi,
      'user/friend-request-list',
      //  action.payload,
      header,
    );
    console.log(response);
    if (response?.status == 200) {
      yield put(friendReqListSuccess(response?.data));
      // Toast(response.data.message);
    } else {
      yield put(friendReqListFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(friendReqListFailure(error));
    Toast(error?.response?.data?.message);
  }
}
export function* sendFriend(action) {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(
      postApi,
      'user/send-friend-request',
      action.payload,
      header,
    );
    if (response?.status == 200) {
      yield put(friendSendSuccess(response?.data?.data));
      Toast(response?.data?.message);
    } else {
      yield put(friendSendFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error?.response?.data?.message);
    yield put(friendSendFailure(error));
  }
}

export function* delFriend(action) {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(
      postApi,
      'user/delete-friend',
      action.payload,
      header,
    );
    if (response?.status == 200) {
      yield put(deleteFriendSuccess(response?.data?.data));
      Toast(response?.data?.message);
    } else {
      yield put(deleteFriendFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error?.response?.data?.message);
    yield put(deleteFriendFailure(error));
  }
}
export function* acceptReject(action) {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(
      postApi,
      'user/accept-reject-friend-request',
      action.payload,
      header,
    );
    if (response?.status == 200) {
      yield put(acceptRejectSuccess(response?.data?.data));
      Toast(response?.data?.message);
    } else {
      yield put(acceptRejectFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error?.response?.data?.message);
    yield put(acceptRejectFailure(error));
  }
}
export function* inviteInfoGet() {
  const items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accesstoken: items.getTokenResponse,
  };
  try {
    let response = yield call(
      getApi,
      'user/app-invitation-link',
      //  action.payload,
      header,
    );
    console.log(response);
    if (response?.status == 200) {
      yield put(InviteInfoSuccess(response?.data));
      // Toast(response.data.message);
    } else {
      yield put(InviteInfoFailure(response?.data));
      // Toast(response?.data?.message);
    }
  } catch (error) {
    console.log(error);
    yield put(InviteInfoFailure(error));
    Toast(error?.response?.data?.message);
  }
}
const watchFunction = [
  (function* () {
    yield takeLatest('Profile/passdetailsRequest', passdetailsSaga);
  })(),
  (function* () {
    yield takeLatest('Profile/userpassesdetailsRequest', userpassesdetailsSaga);
  })(),
  (function* () {
    yield takeLatest('Profile/fetchpassidRequest', fetchpassidSaga);
  })(),
  (function* () {
    yield takeLatest('Profile/profileRequest', profileSaga);
  })(),
  (function* () {
    yield takeLatest('Profile/purchaseRequest', purchaseSaga);
  })(),
  (function* () {
    yield takeLatest('Profile/redeempassRequest', redeempassSaga);
  })(),
  (function* () {
    yield takeLatest('Profile/refundRequest', refundSaga);
  })(),
  (function* () {
    yield takeLatest('Profile/historyRequest', historySaga);
  })(),
  (function* () {
    yield takeLatest('Profile/deleteaccountRequest', deleteaccountSaga);
  })(),

  (function* () {
    yield takeLatest('Profile/getpaymentmethodRequest', getpaymentmethodSaga);
  })(),
  (function* () {
    yield takeLatest('Profile/addcardRequest', addcardSaga);
  })(),

  (function* () {
    yield takeLatest('Profile/getcardRequest', getcardSaga);
  })(),

  (function* () {
    yield takeLatest('Profile/updatecardRequest', updatecardSaga);
  })(),
  (function* () {
    yield takeLatest('Profile/removecardRequest', removecardSaga);
  })(),

  (function* () {
    yield takeLatest('Profile/secureRequest', secureSaga);
  })(),
  (function* () {
    yield takeLatest('Home/getBarListRequest', getBarList);
  })(),
  (function* () {
    yield takeLatest('Home/getFavoutiteListRequest', getFavouriteList);
  })(),
  (function* () {
    yield takeLatest('Home/getTagRequest', getTag);
  })(),
  (function* () {
    yield takeLatest('Home/getNearByRequest', getNearBy);
  })(),
  (function* () {
    yield takeLatest('Home/getFilterRequest', getFilter);
  })(),
  (function* () {
    yield takeLatest('Home/favouriteRequest', favouriteAdd);
  })(),
  (function* () {
    yield takeLatest('Home/barDetailsRequest', barDetails);
  })(),
  (function* () {
    yield takeLatest('Profile/barVisitRequest', barVisit);
  })(),
  (function* () {
    yield takeLatest('Profile/totalFriendRequest', totalFriend);
  })(),
  (function* () {
    yield takeLatest('Profile/addFriendRequest', addFriend);
  })(),
  (function* () {
    yield takeLatest('Profile/collegeModeRequest', collegeMode);
  })(),
  (function* () {
    yield takeLatest('Profile/profilePicUpdateRequest', profilePicUpdate);
  })(),
  (function* () {
    yield takeLatest('Profile/deleteCardRequest', deleteCard);
  })(),
  (function* () {
    yield takeLatest('Profile/editCardRequest', editCard);
  })(),
  (function* () {
    yield takeLatest('Profile/lastWeekRequest', lastWeek);
  })(),
  (function* () {
    yield takeLatest('Profile/profileNameUpdateRequest', ProfileNameUpdate);
  })(),
  (function* () {
    yield takeLatest('Profile/friendReqListRequest', friendReq);
  })(),
  (function* () {
    yield takeLatest('Profile/friendSendRequest', sendFriend);
  })(),
  (function* () {
    yield takeLatest('Profile/deleteFriendRequest', delFriend);
  })(),
  (function* () {
    yield takeLatest('Profile/acceptRejectRequest', acceptReject);
  })(),
  (function* () {
    yield takeLatest('Profile/InviteInfoRequest', inviteInfoGet);
  })(),
];

export default watchFunction;
