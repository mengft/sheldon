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

export function* range(start = 1, stop = 5) {
  for (var i = start; i < stop; i++)
    yield i;
}

// export default function* rootSaga() {
//   yield all([
//     // takeLatest(ActionTypes.LOGIN, range),
//   ]);
// };