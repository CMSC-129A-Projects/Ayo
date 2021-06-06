import {createSelector} from 'reselect';

// needs to be the same in store.js
const userDataState = (state) => state.userData;

export const getLoginData = createSelector(
      userDataState,
      (userData) => [userData.username, userData.password]
)

export const getUser = createSelector(
      userDataState,
      (userData) => userData
)

export const getUserId = createSelector(
      userDataState,
      (userDataState) => userDataState.customer_id
)
// what to pass here?
export const getUsername = createSelector(
      userDataState,
      (userDataState) => userDataState.username
)

export const getPassword = createSelector(
      userDataState,
      (userDataState) => userDataState.password
)

export const getPasswordConfirm = createSelector(
      userDataState,
      (userDataState) => userDataState.password_confirm
)

export const getAddress= createSelector(
      userDataState,
      (userDataState) => {userDataState.address}
)

export const getContactNumber = createSelector(
      userDataState,
      (userDataState) => {userDataState.contact_number}
)

export const getName = createSelector(
      userDataState,
      (userDataState) => {userDataState.name}
)

export const getJWT = createSelector(
      userDataState,
      (userDataState) => {userDataState.JWT_REFRESH, userDataState.JWT_ACCESS}
)
