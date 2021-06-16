import UserApi from '../../api/Users' 
import getJWTs from '../../authheaders';

// api services 

export const registerUser = async (details) => {
      const response = await UserApi.post('register', details);
      return response.data;
}


export const fetchUsers = async () => {
      const response = await UserApi.get('users');
      return response.data;
}

export const fetchUnverifiedCustomers= async (jwt_access, jwt_refresh) => {
      const header = {
            headers:{
                  'Authorization': "Bearer " + jwt_access 
            }
      }

      console.log("HEADER IS ", header);
      const response = await UserApi.get('unverifiedcustomers', header);
      console.log("MAO NI ANG UNVERIFIED", response.data);
      return response.data;
}

export const fetchUserDetails = async (username) => {

      const jwts = await getJWTs();
      const header = {
            headers:{
                  'Authorization': "Bearer " + jwts['jwt_access'] 
            }
      }
      console.log("HEADER IS ", header);

      const response = await UserApi.get(`user/${username}`, header);
      return response.data;
}