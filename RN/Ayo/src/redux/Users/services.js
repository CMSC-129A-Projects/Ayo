import UserApi from '../../api/Users' 
import getJWTs from '../../authheaders';

// api services 

export const registerUser = async (details) => {
      const response = await UserApi.post('register', details);
      return response.data;
}


export const fetchUsers = async () => {
      const jwts = await getJWTs();
      const header = {
            headers:{
                  'Authorization': "Bearer " + jwt_access 
            }
      }
      const response = await UserApi.get('users', {headers});
      return response.data;
}

export const fetchUnverifiedCustomers= async () => {
      const jwts = await getJWTs();
      const header = {
            headers:{
                  'Authorization': "Bearer " + jwt_access 
            }
      }
      const response = await UserApi.get('unverifiedcustomers', header);
      return response.data;
}

export const fetchUserDetails = async (username) => {

      const jwts = await getJWTs();
      const header = {
            headers:{
                  'Authorization': "Bearer " + jwts['jwt_access'] 
            }
      }
      const response = await UserApi.get(`user/${username}`, header);
      return response.data;
}

export const login = async (values) => {
      const response = await UserApi.post('login', values, {headers : {
            'Content-Type': 'application/json',
            }})
            .catch((error) => {
                  if(error.response){
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                        return error.response.statusText
                  }
                  else if(error.request){
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the 
                  // browser and an instance of
                  // http.ClientRequest in node.js
                        return "Connectivity Issues"
                  }
                  else{
                        return error.message
                  }
            })

      // Unauthorized
      // Connectivity Issues
      // Not Found
      return response;
}