import ProductApi from '../../api/Products';
import { setProductsList } from './actions';



export const fetchProducts = async (JWT_ACCESS, JWT_REFRESH) => {
	const header = {
		headers:{
			'Authorization': "Bearer " + JWT_ACCESS
		}
	}
	const response = await ProductApi.get('product/all', header);
	return response.data
}