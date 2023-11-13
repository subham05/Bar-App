import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: '',
  isLoading: true,
  countryResponse: {},
  signupResponse: {},
  loginResponse: {},
  getTokenResponse: null,
  forgotpasswordResponse: {},
  otpverificationResponse: {},
  craetenewpasswordResponse: {},
  logoutResponse: {},
  socialLoginResponse: {},
  cmsdataResponse: {},
  userNameCreateResponse:{},
  registerData:{},
  checkEmailResponse:{},
  collegeSearchResponse:[],
  fcmResponse:'',
  storePreviousUserPassword:'',
};

const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    //token
    getTokenRequest(state, action) {
      state.isLoading = true;
      state.status = action.type;
    },
    getTokenSuccess(state, action) {
      state.isLoading = false;
      state.getTokenResponse = action.payload;
      state.status = action.type;
    },
    getTokenFailure(state, action) {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.type;
    },
    // //country page
    countryRequest(state, action) {
      state.status = action.type;
    },
    countrySuccess(state, action) {
      state.countryResponse = action.payload;
      state.status = action.type;
    },
    countryFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    // //Signup page
    signupRequest(state, action) {
      state.status = action.type;
    },
    signupSuccess(state, action) {
      state.signupResponse = action.payload;
      state.status = action.type;
    },
    signupFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    ///Sign in
    loginRequest(state, action) {
      state.status = action.type;
    },
    loginSuccess(state, action) {
      state.loginResponse = action.payload;
      state.status = action.type;
    },
    loginFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //forgotpassword
    forgotpasswordRequest(state, action) {
      state.status = action.type;
    },
    forgotpasswordSuccess(state, action) {
      state.forgotpasswordResponse = action.payload;
      state.status = action.type;
    },
    forgotpasswordFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //otp verification
    otpverificationRequest(state, action) {
      state.status = action.type;
    },
    otpverificationSuccess(state, action) {
      state.otpverificationResponse = action.payload;
      state.status = action.type;
    },
    otpverificationFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    //change password
    craetenewpasswordRequest(state, action) {
      state.status = action.type;
    },
    craetenewpasswordSuccess(state, action) {
      state.craetenewpasswordResponse = action.payload;
      state.status = action.type;
    },
    craetenewpasswordFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //logout
    logoutRequest(state, action) {
      state.status = action.type;
    },
    logoutSuccess(state, action) {
      state.logoutResponse = action.payload;
      state.status = action.type;
    },
    logoutFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //Social Login

    socialLoginRequest(state, action) {
      state.status = action.type;
    },
    socialLoginSuccess(state, action) {
      state.socialLoginResponse = action.payload;
      state.status = action.type;
    },
    socialLoginFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //Cms Login

    cmsdataRequest(state, action) {
      state.status = action.type;
    },
    cmsdataSuccess(state, action) {
      state.cmsdataResponse = action.payload;
      state.status = action.type;
    },
    cmsdataFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    clearLogin(state,action){
      state.loginResponse={}
    },
    userNameCreateRequest(state, action) {
      state.status = action.type;
    },
    userNameCreateSuccess(state, action) {
      state.userNameCreateResponse = action.payload;
      state.status = action.type;
    },
    userNameCreateFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    storeRegisterData(state,action){
      state.registerData = action.payload
    },
    checkEmailRequest(state, action) {
      state.status = action.type;
    },
    checkEmailSuccess(state, action) {
      state.checkEmailResponse = action.payload;
      state.status = action.type;
    },
    checkEmailFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    collegeSearchRequest(state, action) {
      state.status = action.type;
    },
    collegeSearchSuccess(state, action) {
      state.collegeSearchResponse = action.payload;
      state.status = action.type;
    },
    collegeSearchFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    storeFcmToken(state,action){
      state.error = action.error;
      state.fcmResponse = action.payload;
    },
    storePreviousUserPassword(state,action){
      state.status = action.type;
      state.storePreviousUserPassword = action.payload;
    }
    
  },
});

export const {
  countryRequest,
  countrySuccess,
  countryFailure,
  signupFailure,
  signupSuccess,
  signupRequest,
  loginRequest,
  loginSuccess,
  loginFailure,
  getTokenRequest,
  getTokenSuccess,
  getTokenFailure,
  forgotpasswordRequest,
  forgotpasswordSuccess,
  forgotpasswordFailure,
  otpverificationRequest,
  otpverificationSuccess,
  otpverificationFailure,
  craetenewpasswordRequest,
  craetenewpasswordSuccess,
  craetenewpasswordFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  socialLoginRequest,
  socialLoginSuccess,
  socialLoginFailure,
  cmsdataRequest,
  cmsdataSuccess,
  cmsdataFailure,
  clearLogin,
  userNameCreateRequest,
  userNameCreateSuccess,
  userNameCreateFailure,
  storeRegisterData,
  checkEmailRequest,
  checkEmailSuccess,
  checkEmailFailure,
  collegeSearchRequest,
  collegeSearchSuccess,
  collegeSearchFailure,
  storeFcmToken,
  storePreviousUserPassword
} = AuthSlice.actions;

export default AuthSlice.reducer;
