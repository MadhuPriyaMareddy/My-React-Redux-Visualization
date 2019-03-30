import { call, put, take, race } from 'redux-saga/effects';

import * as actions from '../actions';

import API from '../api';

function* fetchDroneData(action) {
  while (true) {
    try {
      const { data } = yield call(API.findDroneLocation);
      yield put({ type: actions.FETCH_DRONE_DATA_SUCCESS, data: data });
      yield call(delay, 3000);
    } catch (error) {
      yield put({ type: actions.API_ERROR, code: error.code });
    }
  }
}
function* watchPollDroneDataSaga() {
  while (true) {
    const data = yield take(actions.POLLING_START);
    yield race([call(fetchDroneData, data), take(actions.POLLING_STOP)]);
  }
}

function delay(duration) {
  const promise = new Promise(resolve => {
    setTimeout(() => resolve(true), duration);
  });
  return promise;
}

export default function* root() {
  yield [watchPollDroneDataSaga()];
}
