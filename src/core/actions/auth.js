import axios from 'axios';

export const AUTH_INVALID = 'AUTH_INVALID';
export const AUTH_FETCHING = 'AUTH_FETCHING';
export const AUTH_FETCHED = 'AUTH_FETCHED';
export const AUTH_FETCH_FAILED = 'AUTH_FETCH_FAILED';

function fetchAuth() {
  return (dispatch) => {
    dispatch({ type: AUTH_FETCHING });

    return axios.get('http://localhost:8080/auth/current/user', {
      withCredentials: true,
    })
      .then((response) => {
        if (response.status === 404) {
          dispatch({ type: AUTH_FETCH_FAILED, error: response.statusText });
        } else {
          dispatch({ type: AUTH_FETCHED, result: response.data })
        }
      });
  };
}

function shouldFetchAuth(state) {
  const auth = state.auth;
  if (!auth ||
    auth.readyState === AUTH_FETCH_FAILED ||
    auth.readyState === AUTH_INVALID) {
    return true;
  }

  return false;
}

export function fetchAuthIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchAuth(getState())) {
      return dispatch(fetchAuth());
    }
    return null;
  };
}
