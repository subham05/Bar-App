import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: '',
  isLoading: false,
  passdetailsResponse: {},
  userpassesdetailsResponse: {},
  fetchpassidResponse: {},
  profileResponse: {},
  redeempassResponse: {},
  refundResponse: {},
  historyResponse: {},
  deleteaccountResponse: {},
  getpaymentmethodResponse: {},
  addcardResponse: {},
  getcardResponse: {},
  updatecardResponse: {},
  removecardResponse: {},
  secureResponse: {},
  barVisitResponse: {},
  totalFriendResponse: {},
  addFriendResponse: {},
  collegeModeResponse: {},
  profilePicUpdateResponse: {},
  deleteCardResponse: {},
  editCardResponse: {},
  lastWeekResponse: '',
  profileNameUpdateResponse: {},
  friendReqListResponse: {},
  friendSendResponse:{},
  deleteFriendResponse:{},
  acceptRejectResponse:{},
  InviteInfoResponse:{}
};

const ProfileSlice = createSlice({
  name: 'Profile',
  initialState,
  reducers: {
    // //passdetails page
    passdetailsRequest(state, action) {
      state.status = action.type;
    },
    passdetailsSuccess(state, action) {
      state.passdetailsResponse = action.payload;
      state.status = action.type;
    },
    passdetailsFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    // //passdetails page
    userpassesdetailsRequest(state, action) {
      state.status = action.type;
    },
    userpassesdetailsSuccess(state, action) {
      state.userpassesdetailsResponse = action.payload;
      state.status = action.type;
    },
    userpassesdetailsFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //pass id details
    fetchpassidRequest(state, action) {
      state.status = action.type;
    },
    fetchpassidSuccess(state, action) {
      state.fetchpassidResponse = action.payload;
      state.status = action.type;
    },
    fetchpassidFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //profile details
    profileRequest(state, action) {
      state.status = action.type;
    },
    profileSuccess(state, action) {
      state.profileResponse = action.payload;
      state.status = action.type;
    },
    profileFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //Purchase

    //Redeem request
    redeempassRequest(state, action) {
      state.status = action.type;
    },
    redeempassSuccess(state, action) {
      state.redeempassResponse = action.payload;
      state.status = action.type;
    },
    redeempassFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //Refund request
    refundRequest(state, action) {
      state.status = action.type;
    },
    refundSuccess(state, action) {
      state.refundResponse = action.payload;
      state.status = action.type;
    },
    refundFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //History request
    historyRequest(state, action) {
      state.status = action.type;
    },
    historySuccess(state, action) {
      state.historyResponse = action.payload;
      state.status = action.type;
    },
    historyFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //Delete request
    deleteaccountRequest(state, action) {
      state.status = action.type;
    },
    deleteaccountSuccess(state, action) {
      state.deleteaccountResponse = action.payload;
      state.status = action.type;
    },
    deleteaccountFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //Payment method
    getpaymentmethodRequest(state, action) {
      state.status = action.type;
    },
    getpaymentmethodSuccess(state, action) {
      state.getpaymentmethodResponse = action.payload;
      state.status = action.type;
    },
    getpaymentmethodFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //add card
    addcardRequest(state, action) {
      state.status = action.type;
    },
    addcardSuccess(state, action) {
      state.addcardResponse = action.payload;
      state.status = action.type;
    },
    addcardFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //get card
    getcardRequest(state, action) {
      state.status = action.type;
    },
    getcardSuccess(state, action) {
      state.getcardResponse = action.payload;
      state.status = action.type;
    },
    getcardFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //update card
    updatecardRequest(state, action) {
      state.status = action.type;
    },
    updatecardSuccess(state, action) {
      state.updatecardResponse = action.payload;
      state.status = action.type;
    },
    updatecardFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //remove card
    removecardRequest(state, action) {
      state.status = action.type;
    },
    removecardSuccess(state, action) {
      state.removecardResponse = action.payload;
      state.status = action.type;
    },
    removecardFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //secure
    secureRequest(state, action) {
      state.status = action.type;
      state.isLoading = true;
    },
    secureSuccess(state, action) {
      state.secureResponse = action.payload;
      state.status = action.type;
      state.isLoading = false;
    },
    secureFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
      state.isLoading = false;
    },
    secureClear(state) {
      state.status = '';
    },
    barVisitRequest(state, action) {
      state.status = action.type;
      state.isLoading = true;
    },
    barVisitSuccess(state, action) {
      state.barVisitResponse = action.payload;
      state.status = action.type;
      state.isLoading = false;
    },
    barVisitFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
      state.isLoading = false;
    },
    totalFriendRequest(state, action) {
      state.status = action.type;
      state.isLoading = true;
    },
    totalFriendSuccess(state, action) {
      state.totalFriendResponse = action.payload;
      state.status = action.type;
      state.isLoading = false;
    },
    totalFriendFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
      state.isLoading = false;
    },
    addFriendRequest(state, action) {
      state.status = action.type;
      state.isLoading = true;
    },
    addFriendSuccess(state, action) {
      state.addFriendResponse = action.payload;
      state.status = action.type;
      state.isLoading = false;
    },
    addFriendFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
      state.isLoading = false;
    },
    collegeModeRequest(state, action) {
      state.status = action.type;
      state.isLoading = true;
    },
    collegeModeSuccess(state, action) {
      state.collegeModeResponse = action.payload;
      state.status = action.type;
      state.isLoading = false;
    },
    collegeModeFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
      state.isLoading = false;
    },
    profilePicUpdateRequest(state, action) {
      state.status = action.type;
      state.isLoading = true;
    },
    profilePicUpdateSuccess(state, action) {
      state.profilePicUpdateResponse = action.payload;
      state.status = action.type;
      state.isLoading = false;
    },
    profilePicUpdateFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
      state.isLoading = false;
    },
    deleteCardRequest(state, action) {
      state.status = action.type;
      state.isLoading = true;
    },
    deleteCardSuccess(state, action) {
      state.deleteCardResponse = action.payload;
      state.status = action.type;
      state.isLoading = false;
    },
    deleteCardFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
      state.isLoading = false;
    },
    editCardRequest(state, action) {
      state.status = action.type;
      state.isLoading = true;
    },
    editCardSuccess(state, action) {
      state.editCardResponse = action.payload;
      state.status = action.type;
      state.isLoading = false;
    },
    editCardFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
      state.isLoading = false;
    },
    lastWeekRequest(state, action) {
      state.status = action.type;
      state.isLoading = true;
    },
    lastWeekSuccess(state, action) {
      state.lastWeekResponse = action.payload;
      state.status = action.type;
      state.isLoading = false;
    },
    lastWeekFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
      state.isLoading = false;
    },
    profileNameUpdateRequest(state, action) {
      state.status = action.type;
      state.isLoading = true;
    },
    profileNameUpdateSuccess(state, action) {
      state.profileNameUpdateResponse = action.payload;
      state.status = action.type;
      state.isLoading = false;
    },
    profileNameUpdateFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
      state.isLoading = false;
    },
    friendReqListRequest(state, action) {
      state.status = action.type;
      state.isLoading = true;
    },
    friendReqListSuccess(state, action) {
      state.friendReqListResponse = action.payload;
      state.status = action.type;
      state.isLoading = false;
    },
    friendReqListFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
      state.isLoading = false;
    },
    friendSendRequest(state, action) {
      state.status = action.type;
      state.isLoading = true;
    },
    friendSendSuccess(state, action) {
      state.friendSendResponse = action.payload;
      state.status = action.type;
      state.isLoading = false;
    },
    friendSendFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
      state.isLoading = false;
    },
    deleteFriendRequest(state, action) {
      state.status = action.type;
      state.isLoading = true;
    },
    deleteFriendSuccess(state, action) {
      state.deleteFriendResponse = action.payload;
      state.status = action.type;
      state.isLoading = false;
    },
    deleteFriendFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
      state.isLoading = false;
    },
    acceptRejectRequest(state, action) {
      state.status = action.type;
      state.isLoading = true;
    },
    acceptRejectSuccess(state, action) {
      state.acceptRejectResponse = action.payload;
      state.status = action.type;
      state.isLoading = false;
    },
    acceptRejectFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
      state.isLoading = false;
    },
    InviteInfoRequest(state, action) {
      state.status = action.type;
      state.isLoading = true;
    },
    InviteInfoSuccess(state, action) {
      state.InviteInfoResponse = action.payload;
      state.status = action.type;
      state.isLoading = false;
    },
    InviteInfoFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
      state.isLoading = false;
    },
  },
});

export const {
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
  secureClear,
  barVisitRequest,
  barVisitSuccess,
  barVisitFailure,
  totalFriendRequest,
  totalFriendSuccess,
  totalFriendFailure,
  addFriendRequest,
  addFriendSuccess,
  addFriendFailure,
  collegeModeRequest,
  collegeModeSuccess,
  collegeModeFailure,
  profilePicUpdateRequest,
  profilePicUpdateSuccess,
  profilePicUpdateFailure,
  deleteCardRequest,
  deleteCardSuccess,
  deleteCardFailure,
  editCardRequest,
  editCardSuccess,
  editCardFailure,
  lastWeekRequest,
  lastWeekSuccess,
  lastWeekFailure,
  profileNameUpdateRequest,
  profileNameUpdateSuccess,
  profileNameUpdateFailure,
  friendReqListRequest,
  friendReqListSuccess,
  friendReqListFailure,
  friendSendRequest,
  friendSendSuccess,
  friendSendFailure,
  deleteFriendRequest,
  deleteFriendSuccess,
  deleteFriendFailure,
  acceptRejectRequest,
  acceptRejectSuccess,
  acceptRejectFailure,
  InviteInfoRequest,
  InviteInfoSuccess,
  InviteInfoFailure
} = ProfileSlice.actions;

export default ProfileSlice.reducer;
