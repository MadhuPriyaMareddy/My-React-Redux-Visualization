import * as actions from '../actions';

const initialState = {
  fetching: false,
  pooling: false,
  data: [],
  error: {}
};

const startDroneDataLoading = (state, action) => {
  return { ...state, fetching: true };
};

const droneDataReceived = (state, action) => {
  return { ...state, data: action.data.data };
};

const startPooling = (state, action) => {
  return { ...state, pooling: true };
};

const stopPooling = (state, action) => {
  return { ...state, pooling: false };
};

const error = (state, action) => {
  return { ...state, error: action.data };
};

const handlers = {
  [actions.FETCH_DRONE_DATA]: startDroneDataLoading,
  [actions.FETCH_DRONE_DATA_SUCCESS]: droneDataReceived,
  [actions.POLLING_START]: startPooling,
  [actions.POLLING_STOP]: stopPooling,
  [actions.API_ERROR]: error
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === 'undefined') return state;
  return handler(state, action);
};
