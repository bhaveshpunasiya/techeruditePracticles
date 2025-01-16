import {all, takeEvery, takeLatest} from 'redux-saga/effects';
import {
  sendOTPRequest,
  verifyOTPRequest,
  createNewPasswordRequest,
  loginReq,
} from '../ducks/authSlice';

import {
  handlerlogin,
  handlerResetPassword,
  handlerSendOTP,
  handlerVerifyOTP,
} from './handlers/authHandler';


export default function* rootSaga() {
  yield all([
    takeLatest(sendOTPRequest.type, handlerSendOTP),
    takeLatest(verifyOTPRequest.type, handlerVerifyOTP),
    takeLatest(createNewPasswordRequest.type, handlerResetPassword),
    takeLatest(loginReq.type, handlerlogin),
   
  ]);
}
