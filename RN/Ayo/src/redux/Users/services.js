import UserApi from '../../api/Users' 

// api services 

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

export const fetchUserDetails = async (username, token) => {

      const header = {
            headers:{
                  'Authorization': "Bearer " + token 
            }
      }

      const response = await UserApi.get(`user/${username}`, header);
      return response.data;
}