import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    // Send OTP -----------------------------------
    sendOTPData: {},
    sendOTPDataIsLoading: false,
    sendOTPDataErrmsg: null,

    // Verify OTP -----------------------------------
    verifyOTPData: {},
    verifyOTPDataIsLoading: false,
    verifyOTPDataErrmsg: null,

    // reate New Password OTP -----------------------------------
    createNewPasswordData: {},
    createNewPasswordIsLoading: false,
    createNewPasswordErrmsg: null,

    loginReqData: {},
    loginReqIsLoading: false,
    loginReqDataErrmsg: null,

    signUpData:[],
    signUpDataIsLoading: true,
    signUpDataErrmsg: null,
  },
  reducers: {
    // Send OTP --------------------------------------
    sendOTPRequest: (state, action) => {},
    sendOTPRequestSuccess: (state, action) => ({
      ...state,
      sendOTPData: action.payload,
      sendOTPDataIsLoading: false,
      sendOTPDataErrmsg: null,
    }),
    sendOTPRequestFailure: (state, action) => ({
      ...state,
      sendOTPDataIsLoading: false,
      sendOTPDataErrmsg: action.payload,
    }),
    sendOTPRequestLoading: state => ({
      ...state,
      sendOTPDataIsLoading: true,
      sendOTPDataErrmsg: null,
    }),

    signUpRequest: (state, action) => {},
    signUpRequestSuccess: (state, action) => ({
      ...state,
      signUpData: action.payload,
      signUpDataIsLoading: false,
      signUpDataErrmsg: null,
    }),
    signUpFailure: (state, action) => ({
      ...state,
      signUpDataIsLoading: false,
      signUpDataErrmsg: action.payload,
    }),
    signUpLoading: state => ({
      ...state,
      signUpDataIsLoading: true,
      signUpDataErrmsg: null,
    }),

    // Verify OTP -----------------------------------
    verifyOTPRequest: (state, action) => {},
    verifyOTPRequestSuccess: (state, action) => ({
      ...state,
      verifyOTPData: action.payload,
      verifyOTPDataIsLoading: false,
      verifyOTPDataErrmsg: null,
    }),
    verifyOTPRequestFailure: (state, action) => ({
      ...state,
      verifyOTPDataIsLoading: false,
      verifyOTPDataErrmsg: action.payload,
    }),
    verifyOTPRequestLoading: state => ({
      ...state,
      verifyOTPDataIsLoading: true,
      verifyOTPDataErrmsg: null,
    }),

    // Create New Password OTP -----------------------------------

    createNewPasswordRequest: (state, action) => {},
    createNewPasswordSuccess: (state, action) => ({
      ...state,
      createNewPasswordData: action.payload,
      createNewPasswordIsLoading: false,
      createNewPasswordErrmsg: null,
    }),
    createNewPasswordFailure: (state, action) => ({
      ...state,
      createNewPasswordIsLoading: false,
      createNewPasswordErrmsg: action.payload,
    }),
    createNewPasswordLoading: state => ({
      ...state,
      createNewPasswordIsLoading: true,
      createNewPasswordErrmsg: null,
    }),
    // login Us --------------------------------------------------------

    loginReq: (state, action) => {
      console.log("first")
    },
    loginReqSuccess: (state, action) => ({
      ...state,
      loginReqData: action.payload,
      loginReqIsLoading: false,
      loginReqDataErrmsg: null,
    }),
    loginReqFailure: (state, action) => ({
      ...state,
      loginReqIsLoading: false,
      loginReqDataErrmsg: action.payload,
    }),
    loginReqLoading: state => ({
      ...state,
      loginReqIsLoading: true,
      loginReqDataErrmsg: null,
    }),

    loginReqclear: state => ({
      ...state,
      loginReqData: {},
      loginReqIsLoading: false,
      loginReqDataErrmsg: null,
  
    }),
  },
});

export const {
  // Create New Password OTP -----------------------------------
  createNewPasswordFailure,
  createNewPasswordLoading,
  createNewPasswordRequest,
  createNewPasswordSuccess,

  verifyOTPRequest,
  verifyOTPRequestFailure,
  verifyOTPRequestLoading,
  verifyOTPRequestSuccess,

  sendOTPRequest,
  sendOTPRequestFailure,
  sendOTPRequestLoading,
  sendOTPRequestSuccess,

  loginReq,
  loginReqFailure,
  loginReqLoading,
  loginReqSuccess,
  loginReqclear
} = authSlice.actions;

export default authSlice.reducer;
