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
      headers: {
        Authorization: 'Bearer EAAZAiElMhaCEBAJLsnvZCF0GfHhojXNxtqgmW6oFFdEZBeYka7OUihCpaVKesu2wP0H5sIhZCj6MFX29TQOGAUDjcHjw5QUfwZB8XeSVfPdPuBItJXNsHX5luhuBOX75lxHbVJE5qG3LHAdPzscHow5efc9dZAmFUZD',
      },
    })
      .then((response) => {
        dispatch({ type: AUTH_FETCHED, result: response.data })
      })
      .catch((error) => {
        dispatch({ type: AUTH_FETCH_FAILED, error });
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
