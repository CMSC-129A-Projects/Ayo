import {createSelector} from 'reselect';

// needs to be the same in store.js
const loginScreenState = (state) => state.loginScreen;

export const getLoginDetails = createSelector(
      loginScreenState,
      (loginScreen) => [loginScreen.username, loginScreen.password]
)

export const getUser = createSelector(
      loginScreenState,
      (loginScreen) => loginScreen
)
// what to pass here?
export const getUsername = createSelector(
      loginScreenState,
      (loginScreenState) => loginScreenState.username
)

export const getPassword = createSelector(
      loginScreenState,
      (loginScreenState) => loginScreenState.password
)

export const getJWT = createSelector(
      loginScreenState,
      (loginScreenState) => loginScreenState.JWT
)