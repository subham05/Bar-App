import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: '',
  isLoading: true,
  barListResponse: {},
  favouriteListResponse: {},
  tagResponse: {},
  nearByResponse: {},
  filterResponse: {},
  favouriteResponse: {},
  barDetailsResponse: {},
  userHomeResponse: {},
  currentBarResponse: {},
  checkInResponse: {},
  sortResponse: {},
  storeSortResponse: {},
  addCardResponse: {},
  getCardResponse: {},
  passDetailsResponse:{},
  purchaseResponse:{},
  yourPassesResponse:{},
  passRedeemResponse:{},
  passRefundResponse:{},
  addBarResponse:{},
  permissionResponse:'',
  requestPassResponse:{},
  shortDistanceResponse:null,
  appEnterResponse:false,
  trendResponse:true,
  enterBarResponse:{},
  todaysPassResponse:[],
  locationGrant:false
};

const HomeSlice = createSlice({
  name: 'Home',
  initialState,
  reducers: {
    //token
    getBarListRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    getBarListSuccess(state, action) {
      state.isLoading = false;
      state.barListResponse = action.payload;
      state.status = action.type;
    },
    getBarListFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },
    getFavoutiteListRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    getFavoutiteListSuccess(state, action) {
      state.isLoading = false;
      state.favouriteListResponse = action.payload;
      state.status = action.type;
    },
    getFavoutiteListFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },
    getTagRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    getTagSuccess(state, action) {
      state.isLoading = false;
      state.tagResponse = action.payload;
      state.status = action.type;
    },
    getTagFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },
    getNearByRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    getNearBySuccess(state, action) {
      state.isLoading = false;
      state.nearByResponse = action.payload;
      state.status = action.type;
    },
    getNearByFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },
    getFilterRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    getFilterSuccess(state, action) {
      state.isLoading = false;
      state.filterResponse = action.payload;
      state.status = action.type;
    },
    getFilterFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },
    favouriteRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    favouriteSuccess(state, action) {
      state.isLoading = false;
      state.favouriteResponse = action.payload;
      state.status = action.type;
    },
    favouriteFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },
    barDetailsRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    barDetailsSuccess(state, action) {
      state.isLoading = false;
      state.barDetailsResponse = action.payload;
      state.status = action.type;
    },
    barDetailsFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },
    userHomeRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    userHomeSuccess(state, action) {
      state.isLoading = false;
      state.userHomeResponse = action.payload;
      state.status = action.type;
    },
    userHomeFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },
    clearStore(state, action) {
      state.barListResponse = {};
      state.filterResponse = {};
      state.sortResponse = {};
    },
    currentBarRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    currentBarSuccess(state, action) {
      state.isLoading = false;
      state.currentBarResponse = action.payload;
      state.status = action.type;
    },
    currentBarFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },
    checkInRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    checkInSuccess(state, action) {
      state.isLoading = false;
      state.checkInResponse = action.payload;
      state.status = action.type;
    },
    checkInFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },
    sortRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    sortSuccess(state, action) {
      state.isLoading = false;
      state.sortResponse = action.payload;
      state.status = action.type;
    },
    sortFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },
    storeSortData(state, action) {
      state.storeSortResponse = action.payload;
    },
    addCardRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    addCardSuccess(state, action) {
      state.isLoading = false;
      state.addCardResponse = action.payload;
      state.status = action.type;
    },
    addCardFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },
    getCardRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    getCardSuccess(state, action) {
      state.isLoading = false;
      state.getCardResponse = action.payload;
      state.status = action.type;
    },
    getCardFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },
    passDetailsRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    passDetailsSuccess(state, action) {
      state.isLoading = false;
      state.passDetailsResponse = action.payload;
      state.status = action.type;
    },
    passDetailsFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },
   yourPassesRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    yourPassesSuccess(state, action) {
      state.isLoading = false;
      state.yourPassesResponse = action.payload;
      state.status = action.type;
    },
    yourPassesFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },
    passRedeemRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    passRedeemSuccess(state, action) {
      state.isLoading = false;
      state.passRedeemResponse = action.payload;
      state.status = action.type;
    },
    passRedeemFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },
    passRefundRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    passRefundSuccess(state, action) {
      state.isLoading = false;
      state.passRefundResponse = action.payload;
      state.status = action.type;
    },
    passRefundFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },
    purchaseRequest(state, action) {
      state.status = action.type;
    },
    purchaseSuccess(state, action) {
      state.purchaseResponse = action.payload;
      state.status = action.type;
    },
    purchaseFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    addBarRequest(state, action) {
      state.status = action.type;
    },
    addBarSuccess(state, action) {
      state.addBarResponse = action.payload;
      state.status = action.type;
    },
    addBarFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    permissionData(state,action){
      state.permissionResponse = action.payload
    },
    requestPass(state, action) {
      state.status = action.type;
    },
    requestPassSuccess(state, action) {
      state.requestPassResponse = action.payload;
      state.status = action.type;
    },
    requestPassFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    shortDistanceRequest(state,action){
      state.status = action.type;
    },
    shortDistanceSuccess(state, action) {
      state.shortDistanceResponse = action.payload;
      state.status = action.type;
    },
    shortDistanceFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    appEnterRequest(state,action){
      state.status = action.type;
    },
    appEnterSuccess(state, action) {
      state.appEnterResponse = action.payload;
      state.status = action.type;
    },
    appEnterFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    trendReq(state, action) {
      state.status = action.type;
    },
    trendOpen(state, action) {
      state.status = action.type;
      state.trendResponse = action.payload;
    },
    enterBarRequest(state,action){
      state.status = action.type;
    },
    enterBarSuccess(state, action) {
      state.enterBarResponse = action.payload;
      state.status = action.type;
    },
    enterBarFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    todaysPassSuccess(state, action) {
      state.todaysPassResponse = action.payload;
      state.status = action.type;
    },
    putLocationGranted(state,action){
      state.locationGrant = action.payload;
      state.status = action.type;
    }
  },
});

export const {
  getBarListRequest,
  getBarListSuccess,
  getBarListFailure,
  getFavoutiteListRequest,
  getFavoutiteListSuccess,
  getFavoutiteListFailure,
  getTagRequest,
  getTagSuccess,
  getTagFailure,
  getNearByRequest,
  getNearBySuccess,
  getNearByFailure,
  getFilterRequest,
  getFilterSuccess,
  getFilterFailure,
  favouriteRequest,
  favouriteSuccess,
  favouriteFailure,
  barDetailsRequest,
  barDetailsSuccess,
  barDetailsFailure,
  userHomeRequest,
  userHomeSuccess,
  userHomeFailure,
  clearStore,
  currentBarRequest,
  currentBarSuccess,
  currentBarFailure,
  checkInRequest,
  checkInSuccess,
  checkInFailure,
  sortRequest,
  sortSuccess,
  sortFailure,
  storeSortData,
  addCardRequest,
  addCardSuccess,
  addCardFailure,
  getCardFailure,
  getCardRequest,
  getCardSuccess,
  passDetailsRequest,
  passDetailsSuccess,
  passDetailsFailure,
  purchaseRequest,
  purchaseSuccess,
  purchaseFailure,
  yourPassesRequest,
  yourPassesSuccess,
  yourPassesFailure,
  passRedeemRequest,
  passRedeemSuccess,
  passRedeemFailure,
  passRefundRequest,
  passRefundSuccess,
  passRefundFailure,
  addBarRequest,
  addBarSuccess,
  addBarFailure,
  permissionData,
  requestPass,
  requestPassSuccess,
  requestPassFailure,
  shortDistanceRequest,
  shortDistanceSuccess,
  shortDistanceFailure,
  appEnterRequest,
  appEnterSuccess,
  appEnterFailure,
  trendOpen,
  trendReq,
  enterBarRequest,
  enterBarSuccess,
  enterBarFailure,
  todaysPassSuccess,
  putLocationGranted
  
} = HomeSlice.actions;

export default HomeSlice.reducer;
