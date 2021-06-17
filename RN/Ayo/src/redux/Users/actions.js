import {ActionTypes} from './constants';
import {fetchUsers, fetchUserDetails, fetchUnverifiedCustomers} from './services';


export  function Logout(){
      return ({
            type : ActionTypes.LOGOUT
      })
}

export const setUnverifiedCustomers= (jwt_access, jwt_refresh) => async (dispatch, getState) => {
      const users_list = await fetchUnverifiedCustomers(jwt_access,jwt_refresh);
      dispatch(
            {
                  type: ActionTypes.SET_USERS_LIST,
                  payload: {users_list}
            }
      )
}

export const setUsersList = () => async (dispatch, getState) => {
      const users_list = await fetchUsers();
      dispatch(
            {
                  type: ActionTypes.SET_USERS_LIST,
                  payload: {users_list}
            }
      )
}

export function setUser(user){
      console.log("INNSIDE SETUSER", user);
      return(
            {
                  type: ActionTypes.SET_USER,
                  payload: user 
            }
      )
}

export function setCustomer(customer){
      return(
            {
                  type: ActionTypes.SET_CUSTOMER,
                  payload: customer 
            }
      )
}

export function setWorker(worker){
      return(
            {
                  type: ActionTypes.SET_WORKER,
                  payload: worker 
            }
      )
}

export function setOwner(owner){
      return(
            {
                  type: ActionTypes.SET_OWNER,
                  payload: owner 
            }
      )
}

export function setUserId(user_id){
      return (
            {
                  type: ActionTypes.SET_USER_ID,
                  payload: user_id 
            }
      )
}
export function setUsername(username) {
      return (
            {
                  type: ActionTypes.SET_USERNAME,
                  payload: username
            }
      )
}

export function setPassword(password) {
      return (
            {
                  type: ActionTypes.SET_PASSWORD,
                  payload: password 
            }
      )
}

export function setPasswordConfirm(password_confirm) {
      return (
            {
                  type: ActionTypes.SET_PASSWORD_CONFIRM,
                  payload: password_confirm
            }
      )
}

// TODO: EDIT THIS
export function setJWT(JWT_REFRESH) {
      return (
            {
                  type: ActionTypes.SET_JWT_REFRESH,
                  payload: JWT_REFRESH
            }
      )
}

export function setJWTRefresh(JWT_REFRESH) {
      return (
            {
                  type: ActionTypes.SET_JWT_REFRESH,
                  payload: JWT_REFRESH
            }
      )
}

export function setJWTAccess(JWT_ACCESS) {
      return (
            {
                  type: ActionTypes.SET_JWT_ACCESS,
                  payload: JWT_ACCESS
            }
      )
}

export function setName(name) {
      return (
            {
                  type: ActionTypes.SET_NAME,
                  payload: name
            }
      )
}

// for changing password in edit user details
export function setNewPassword(new_password) {
      return (
            {
                  type: ActionTypes.SET_NEW_PASSWORD,
                  payload: new_password 
            }
      )
}

export function setContactNumber(contactNumber) {
      return (
            {
                  type: ActionTypes.SET_CONTACT_NUMBER,
                  payload: contactNumber 
            }
      )
}

export function setAddress(address) {
      return (
            {
                  type: ActionTypes.SET_ADDRESS,
                  payload: address
            }
      )
}

export function setRole(role) {
      return (
            {
                  type: ActionTypes.SET_ROLE,
                  payload: role 
            }
      )
}


export function setValidId(valid_id1) {
      return (
            {
                  type: ActionTypes.SET_VALID_ID,
                  payload: valid_id1 
            }
      )
}


export function setBusinessPermit(business_permit) {
      return (
            {
                  type: ActionTypes.SET_BUSINESS_PERMIT,
                  payload: business_permit 
            }
      )
}


export function setMedicalLicense(medical_license) {
      return (
            {
                  type: ActionTypes.SET_MEDICAL_LICENSE,
                  payload: medical_license 
            }
      )
}