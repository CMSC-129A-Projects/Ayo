import axios from 'axios';
import store from './store'

// TODO: add logout sa part sa user 

export default async function getJWTs () {
	const user = store.getState();
	let jwt_access = user.userData.JWT_ACCESS;
	let jwt_refresh= user.userData.JWT_REFRESH;

	if (jwt_access){
		const headers = {
			'Content-Type' : 'application/json',
		}
		const token_access = {
			"token" : jwt_access
		}
		const validated_response = await axios.post('http://202.92.153.18/api/token/verify/', token_access, {headers}).catch((error) => { return error.response.data;});
		if (!("code" in validated_response) && !("detail" in validated_response)){ 
			return {jwt_access, jwt_refresh}
		}
		else {
			console.log("IN HERE M8");
			if(jwt_refresh){
				const validated_response2 = await axios.post('http://202.92.153.18/api/token/verify/', {"token" : jwt_refresh}, {headers});
				if (validated_response2.data && Object.keys(validated_response2.data).length === 0){ 
					const new_access = await axios.post('http://202.92.153.18/api/token/refresh/', {"refresh" : jwt_refresh}, {headers});
					jwt_access = new_access.data['access'];
					jwt_refresh = new_access.data['refresh'];
					return {jwt_access, jwt_refresh}
				}
			}
		}
	}

	return {"jwt_access" : null, "jwt_refresh" : null};
}