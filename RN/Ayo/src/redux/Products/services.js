import ProductApi from '../../api/Products';
import getJWTs from '../../authheaders';
import { setProductsList } from './actions';



export const fetchProducts = async () => {
	const jwts = await getJWTs();
	const header = {
		headers:{
			'Authorization': "Bearer " + jwts['jwt_access'] 
		}
	}
	const response = await ProductApi.get('product/all', header);
	return response.data
}

export const add_product = async (arg) => { 
	// CHANGE THIS TO FIT THE VALUE
	const jwts =  await getJWTs();
	const headers = {
	      'Content-Type' : 'application/json',
	      'Authorization' : 'Bearer ' + jwts['jwt_access']
	}
	console.log("ARG IS ", arg, headers);
	const response = await ProductApi.post('product/add', arg, {headers})
	fetchProducts();
  }

export  const edit_product = async (arg) => { 
	const jwts =  await getJWTs();
	const headers = {
	      'Content-Type' : 'application/json',
	      'Authorization' : 'Bearer ' + jwts['jwt_access']
	}
	const response = await ProductApi.patch(`product/instance/${arg['id']}`, {"name" : "edited_test_medicine_2"}, {headers})
	fetchProducts();
  }

export  const delete_product = async (arg) => { 
	const jwts =  await getJWTs();
	const headers = {
	      'Content-Type' : 'application/json',
	      'Authorization' : 'Bearer ' + jwts['jwt_access']
	}
	const response = await ProductApi.delete(`product/instance/${arg['id']}`, {headers})
	fetchProducts();
  }

export  const delete_multiple_products = async (arg) => { 
	var ids = []
	arg.forEach((item) => {
	      ids.push(item['id']);
	})
	const jwts =  await getJWTs();
	const headers = {
	      'Content-Type' : 'application/json',
	      'Authorization' : 'Bearer ' + jwts['jwt_access']
	}
	const response = await ProductApi.post(`product/multidelete`, {"ids" : ids}, {headers})
	fetchProducts();
  }