import qs from 'qs';
import {
  all,
  takeLatest,
  takeEvery,
  put,
  call,
  select,
  race,
  delay,
} from 'redux-saga/effects';
import * as ActionTypes from '../Redux/ActionTypes';
import * as UserSaga from './User';

export function* range() {
  console.log(222);
  yield '111';
}

export default function* rootSaga() {
  yield all([
    takeLatest(ActionTypes.LOGIN, range),
  ]);
}