import ProductApi from '../../api/Products';
import getJWTs from '../../authheaders';

export const fetchProducts = async () => {
	const jwts = await getJWTs();
	const headers = {
			'Authorization': "Bearer " + jwts['jwt_access'] 
	}
	const response = await ProductApi.get('product/all', {headers});
	return response.data
}

export const fetchOneProduct = async (product_id) => {
	const jwts = await getJWTs();
	console.log("INSIDE HERE ", product_id);
	const headers = {
			'Authorization': "Bearer " + jwts['jwt_access'] 
	}
	const response = await ProductApi.get(`product/instance/${product_id}`, {headers});
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
	const response = await ProductApi.patch(`product/instance/change/${arg['id']}`, {"name" : "edited_test_medicine_2"}, {headers})
	fetchProducts();
  }

export  const delete_product = async (arg) => { 
	const jwts =  await getJWTs();
	const headers = {
	      'Content-Type' : 'application/json',
	      'Authorization' : 'Bearer ' + jwts['jwt_access']
	}
	const response = await ProductApi.delete(`product/instance/change/${arg['id']}`, {headers})
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

export const fetchGenerics = async () => {
      const jwts =  await getJWTs();
      const headers = {
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + jwts['jwt_access']
      }
      const response = await ProductApi.get('generic/all', {headers});
      setGenerics(response.data);
}

// path('generic/add', NewGenericName.as_view()),
export const add_generic= async (arg) => { 
      // CHANGE THIS TO FIT THE VALUE
      const jwts =  await getJWTs();
      const headers = {
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + jwts['jwt_access']
      }
      console.log("HEADERS ARE ", headers);
      const response = await ProductApi.post('generic/add', arg, {headers})
      fetchGenerics();
}

// path('generic/instance/<str:generic>', GenericNameView.as_view())
export const edit_generic = async (arg) => { 
      const jwts =  await getJWTs();
      const headers = {
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + jwts['jwt_access']
      }
      const response = await ProductApi.patch(`generic/instance/${arg['id']}`, {"generic_name" : "edited_test_gen_2"}, {headers})
      fetchGenerics();
}

export const delete_generic = async (arg) => { 
      const jwts =  await getJWTs();
      const headers = {
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + jwts['jwt_access']
      }
      const response = await ProductApi.delete(`generic/instance/${arg['id']}`, {"generic_name" : "edited_test_gen_2"}, {headers})
      fetchGenerics();
}