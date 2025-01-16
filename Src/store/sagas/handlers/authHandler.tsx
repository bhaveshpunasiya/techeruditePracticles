import {call, put, select} from 'redux-saga/effects';
import {urls} from '../../../api/urls';
import request from '../../../api/apiRequest';

import {
  sendOTPRequestFailure,
  sendOTPRequestLoading,
  sendOTPRequestSuccess,
  verifyOTPRequestFailure,
  verifyOTPRequestLoading,
  verifyOTPRequestSuccess,
  createNewPasswordLoading,
  createNewPasswordFailure,
  createNewPasswordSuccess,
  loginReqFailure,
  loginReqLoading,
  loginReqSuccess,
} from '../../ducks/authSlice';


export function* handlerSendOTP(action: any) {
  const data = JSON.stringify(action.payload);

  const config = {
    method: 'post',
    url: urls.sendOTPUrl,
    data: data,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    yield put(sendOTPRequestLoading());
    const response: {data: any} = yield call(request, config);
    yield put(sendOTPRequestSuccess(response.data));
  } catch (e) {
    yield put(sendOTPRequestFailure('Error in Send OTP!'));
    console.error(e, 'Error in Send OTP');
  }
}
export function* handlerVerifyOTP(action: any) {
  const data = JSON.stringify(action.payload);
  const config = {
    method: 'post',
    url: urls.verifyOTPUrl,
    data: data,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    yield put(verifyOTPRequestLoading());
    const response: {data: any} = yield call(request, config);
    yield put(verifyOTPRequestSuccess(response.data));
  } catch (e) {
    yield put(verifyOTPRequestFailure('Error in Verify OTP!'));
    console.error(e, 'Error in Verify OTP');
  }
}


export function* handlerResetPassword(action: any) {
  const data = JSON.stringify(action.payload);

  const config = {
    method: 'post',
    url: urls.createNewPaswordUrl,
    data: data,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    yield put(createNewPasswordLoading());
    const response: {data: any} = yield call(request, config);
    yield put(createNewPasswordSuccess(response.data));
  } catch (e) {
    yield put(createNewPasswordFailure('Error in New Pasword Create!'));
    console.error(e, 'Error in Pasword Create');
  }
}
export function* handlerlogin(action: any) {


  const data = action.payload
  console.log(data,"data----")
  const formData = new FormData()
  for (const key in data){
    formData.append(key,data[key])
  }

  const config = {
    method: 'POST',
    url: urls.loginUrl,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  try {
    yield put(loginReqLoading());
    const response: {data: any} = yield call(request, config);
    yield put(loginReqSuccess(response.data));
  } catch (e) {
    yield put(loginReqFailure(e));
    console.error(e, 'Error in login');
  }
}
