import UserApi from '../../api/Users' 

// api services 

export const fetchUsers = async () => {
      const response = await UserApi.get('users');
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