export const AUTH_INVALID = 'AUTH_INVALID';
export const AUTH_FETCHING = 'AUTH_FETCHING';
export const AUTH_FETCHED = 'AUTH_FETCHED';
export const AUTH_FETCH_FAILED = 'AUTH_FETCH_FAILED';
import { api } from '../utils';

function fetchAuth() {
  return (dispatch) => {
    dispatch({ type: AUTH_FETCHING });
    return api().get('/auth/current/user')
      .then((response) => {
        dispatch({ type: AUTH_FETCHED, result: response.data })
      })
      .catch((error) => {
        dispatch({ type: AUTH_FETCH_FAILED, error });
      });
  };
}

export function fetchAuthIfNeeded() {
  return (dispatch, getState) => {
    return dispatch(fetchAuth());
  };
}
