import axios from "axios";
import * as FileSystem from 'expo-file-system';

export default async function uploadImage(img) {
	let body = new FormData()
	const base64 = await FileSystem.readAsStringAsync(img, { encoding: 'base64' });
	const apikey = "196f8d3d53c16257b235734c81ccadd3";
	body.append('key', apikey)
	body.append('image', base64)
	body.append('expiration', 100)
    
	const response = await axios({
	  method: 'post',
	  url: 'https://api.imgbb.com/1/upload',
	  data: body
	})
	console.log(typeof(response.data.data.image.url));

	return response.data.data.image.url;
}