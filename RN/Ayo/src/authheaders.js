import axios from 'axios';
import store from './store'

// TODO: add logout sa part sa user 

export default async function getJWTs () {
	const user = store.getState();
	let jwt_access = user.userData.JWT_ACCESS;
	let jwt_refresh= user.userData.JWT_REFRESH;

	if (jwt_access){
		const validated_response = await axios.post('http://202.92.153.18/api/token/verify/', {"token" : jwt_access});
		if (validated_response.data && Object.keys(validated_response.data).length === 0){ 
			return {jwt_access, jwt_refresh}
		}
		else {
			if(jwt_refresh){
				const validated_response2 = await axios.post('http://202.92.153.18/api/token/verify/', {"token" : jwt_refresh});
				if (validated_response2.data && Object.keys(validated_response2.data).length === 0){ 
					const new_access = await axios.post('http://202.92.153.18/api/token/refresh/', {"token" : jwt_refresh});
					jwt_access = new_access.data['access'];
					jwt_refresh = new_access.data['refresh'];
					return {jwt_access, jwt_refresh}
				}
			}
		}
	}

	return {"jwt_access" : null, "jwt_refresh" : null};
}