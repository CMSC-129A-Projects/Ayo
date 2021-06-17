import BasketApi from "../../api/Requests";
import getJWTs from "../../authheaders";

export const fetchUserRequests = async (arg) => {
	// CHANGE THIS TO FIT THE VALUE
	const jwts =  await getJWTs();
	const headers = {
		'Authorization' : 'Bearer ' + jwts['jwt_access']
	}
	const response = await BasketApi.get(`requestitem/free/${arg}`, {headers})
	console.log("RESSPONSE IS ", response.data);
	return response.data
	// setReqitems(response.data)
}

// path('requestitem/add', NewRequestItem.as_view()),
export const add_request = async (arg) => { 
	// CHANGE THIS TO FIT THE VALUE
	const jwts =  await getJWTs();
	const headers = {
		'Content-Type' : 'application/json',
		'Authorization' : 'Bearer ' + jwts['jwt_access']
	}
	const response = await BasketApi.post('requestitem/add', arg, {headers})
	// fetchUserRequests(users['data'][0]);
}

// path('requestitem/instance/<str:reqitem>', RequestItemView.as_view()),
export const edit_request = async (arg) => { 
	// CHANGE THIS TO FIT THE VALUE
	const jwts =  await getJWTs();
	const headers = {
		'Content-Type' : 'application/json',
		'Authorization' : 'Bearer ' + jwts['jwt_access']
	}
	const response = await BasketApi.patch(`requestitem/instance/${arg['id']}`, {"quantity" : 10}, {headers})
	// fetchUserRequests(users['data'][0]);
}

export const delete_request = async (arg) => { 
	// CHANGE THIS TO FIT THE VALUE
	const jwts =  await getJWTs();
	const headers = {
		'Content-Type' : 'application/json',
		'Authorization' : 'Bearer ' + jwts['jwt_access']
	}
	const response = await BasketApi.delete(`requestitem/instance/${arg['id']}`, {headers})
	// fetchUserRequests(users['data'][0]);
}

// path('requestitem/multidelete', DeleteMultipleItems.as_view()),
export const delete_multiple_requests = async (arg) => { 
	var ids = []
	arg.forEach((item) => {
		ids.push(item['id']);
	})
	const jwts =  await getJWTs();
	const headers = {
		'Content-Type' : 'application/json',
		'Authorization' : 'Bearer ' + jwts['jwt_access']
	}
	const response = await BasketApi.post(`requestitem/multidelete`, {"ids" : ids}, {headers})
	fetchUserRequests(users['data'][0]);
}

// path('orders/all', Orders.as_view()),
export const fetchOrders = async () => {
	// CHANGE THIS TO FIT THE VALUE
	const jwts =  await getJWTs();
	const headers = {
		'Content-Type' : 'application/json',
		'Authorization' : 'Bearer ' + jwts['jwt_access']
	}
	const response = await BasketApi.get(`orders/all`, {headers})
	console.log("ALL ORDERS", response.data)
}

// path('orders/user/<str:userid>', UserOrders.as_view()),
export const fetchUserOrders = async (arg) => {
	// CHANGE THIS TO FIT THE VALUE
	const jwts =  await getJWTs();
	const headers = {
		'Content-Type' : 'application/json',
		'Authorization' : 'Bearer ' + jwts['jwt_access']
	}
	const response = await BasketApi.get(`orders/user/${arg['id']}`, {headers})
	console.log("USER ORDERS", response.data)
}

// path('orders/unfulfilled', UnfulfilledOrders.as_view()),
export const fetchUnfulfilledOrders = async (arg) => {
	// CHANGE THIS TO FIT THE VALUE
	const jwts =  await getJWTs();
	const headers = {
		'Content-Type' : 'application/json',
		'Authorization' : 'Bearer ' + jwts['jwt_access']
	}
	const response = await BasketApi.get(`orders/unfulfilled`, {headers} )
	console.log("UNFULFILLED ORDERS", response.data)
}


// path('orders/add', Order.as_view()),
export const add_order = async (arg) => { 
	// CHANGE THIS TO FIT THE VALUE
	console.log("INSIDE ADD ORDER", arg);
	const jwts =  await getJWTs();
	const headers = {
		'Content-Type' : 'application/json',
		'Authorization' : 'Bearer ' + jwts['jwt_access']
	}
	const response = await BasketApi.post('orders/add', arg, {headers})
	// fetchUserOrders(users['data'][0]);
}

// path('orders/instance/<str:order>', OrderView.as_view()),
// DINHI DAPITA DAGHAN BUHATUNON
export const edit_order = async (arg) => { 
	// CHANGE THIS TO FIT THE VALUE
	const jwts =  await getJWTs();
	const headers = {
		'Content-Type' : 'application/json',
		'Authorization' : 'Bearer ' + jwts['jwt_access']
	}
	const response = await BasketApi.post(`order/instance/${arg.id}`, {}, {headers})
	// fetchUserRequests(users['data'][0]);
}