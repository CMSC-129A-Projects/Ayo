import React, {useEffect, useState} from 'react';
import { View, Text, Button } from 'react-native';
import {useSelector, useDispatch, connect} from 'react-redux';
import ProductApi from '../api/Products';
import UserApi from '../api/Users';
import BasketApi from '../api/Requests';
import PrescriptionApi from '../api/Prescriptions';
import {setUser, setWorker, setUsersList} from '../redux/Users/actions';
import {getUser, getUsersList} from '../redux/Users/selectors';
// path('users', Users.as_view(), name='get_users'),
// path('register', RegisterUser.as_view(), name='register'),
// path('login', LoginUser.as_view(), name='login'),
// path('unverifiedcustomers', UnverifiedCustomers.as_view(),
//      name='unverified_customers'),
// path('approve', ApproveCustomer.as_view(), name='approve_application'),
// path('reject', RejectCustomer.as_view(), name='reject_application'),
// path('user', User.as_view(), name='account'),




      // path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
      // path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
      // path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify') VERIFY IF OKAY RA SIYA, IF code : "token_not_valid" CALL REFRESH AND ACCESS
// const actionDispatch = (dispatch) => ({
//       setUser: (user) => dispatch(setUser(user)),
//       setWorker: (worker) => dispatch(setWorker(worker)),
// })

function apiTestScreen({dispatch, userslist, user}) {
      // const {setUser, setWorker} = actionDispatch(useDispatch());
      const [products, setProducts] = useState();
      const [oneprod, setOneprod] = useState();
      const [generics, setGenerics] = useState();
      const [onegen, setOnegen] = useState();
      const [users, setUsers] = useState();
      const [onereq, setOnereq] = useState();
      const [reqitems, setReqitems] = useState();

      useEffect(() => {
            dispatch(setUsersList());
      }, [])

      console.log("THIS IS THE USERSLIST", userslist);
      console.log("USER IS ", user);

      const pharmacist_data = {
            "username": "pharma",
            "name": "own",
            "password": "yep",
            "password_confirm": "yep",
            "role": "Worker",
            "contact_number": "234421132",
            "medical_license": "https://i.ytimg.com/vi/7eGKDuJ-E1w/hqdefault.jpg",
            "address": "yep"
      }

      // path('product/all', Products.as_view()),
      // path('product/add', NewProduct.as_view()),
      // path('product/instance/<str:product>', ProductView.as_view()),
      // path('product/multidelete', DeletedProductList.as_view()),

      const fetchProducts = async () => {
            const response = await ProductApi.get('product/all');
            console.log("Products are", response.data);
            setProducts(response.data);
      }


      const test_med2 = {
            "name" : "test_medicine2",
            "description" : "test description",
            "price" : 13.50,
            "quantity" : 1500,
            "product_img" : "http://127.0.0.1:8000/media/business_permit/p6.png",
            "generic_name" : "245c31ff-8105-48d0-8791-24f0c5c3ce29"
        }

      const test_med3 = {
            "name" : "test_medicine3",
            "description" : "test description",
            "price" : 13.50,
            "quantity" : 1500,
            "product_img" : "http://127.0.0.1:8000/media/business_permit/p6.png",
            "generic_name" : "245c31ff-8105-48d0-8791-24f0c5c3ce29"
      }

      const test_med4 = {
            "name" : "test_medicine4",
            "description" : "test description",
            "price" : 13.50,
            "quantity" : 1500,
            "product_img" : "http://127.0.0.1:8000/media/business_permit/p6.png",
        }

      const add_product = async (arg) => { 
            // CHANGE THIS TO FIT THE VALUE
            console.log(arg);
            const response = await ProductApi.post('product/add', arg, {headers : {
                  'Content-Type' : 'application/json',
            }})
            fetchProducts();
      }

      const edit_product = async (arg) => { 
            const response = await ProductApi.patch(`product/instance/${arg['id']}`, {"name" : "edited_test_medicine_2"}, {headers : {
                  'Content-Type' : 'application/json',
            }})
            fetchProducts();
      }

      const delete_product = async (arg) => { 
            const response = await ProductApi.delete(`product/instance/${arg['id']}`, {headers : {
                  'Content-Type' : 'application/json',
            }})
            fetchProducts();
      }

      const delete_multiple_products = async (arg) => { 
            var ids = []
            arg.forEach((item) => {
                  ids.push(item['id']);
            })
            const response = await ProductApi.post(`product/multidelete`, {"ids" : ids}, {headers : {
                  'Content-Type' : 'application/json',
            }})
            fetchProducts();
      }

      // GENERICS
      // path('generic/all', GenericNames.as_view()),
      const fetchGenerics = async () => {
            const response = await ProductApi.get('generic/all');
            setGenerics(response.data);
      }

      const test_gen2 = {
            "generic_name" : "test_generic2",
            "disease": ["test_disease3", "test_disease4"]
        }

      const test_gen3 = {
            "generic_name" : "test_generic3",
            "disease" : ["test_disease3", "test_disease5"]
        }

      // path('generic/add', NewGenericName.as_view()),
      const add_generic= async (arg) => { 
            // CHANGE THIS TO FIT THE VALUE
            const response = await ProductApi.post('generic/add', arg, {headers : {
                  'Content-Type' : 'application/json',
            }})
            fetchGenerics();
      }

      // path('generic/instance/<str:generic>', GenericNameView.as_view())
      const edit_generic = async (arg) => { 
            const response = await ProductApi.patch(`generic/instance/${arg['id']}`, {"generic_name" : "edited_test_gen_2"}, {headers : {
                  'Content-Type' : 'application/json',
            }})
            fetchGenerics();
      }

      const delete_generic = async (arg) => { 
            const response = await ProductApi.delete(`generic/instance/${arg['id']}`, {headers : {
                  'Content-Type' : 'application/json',
            }})
            fetchGenerics();
      }

      console.log(generics);
      const request1 = {
            "quantity" : 5,
      }

      // path('requestitem/free/<str:userid>', FreeRequestItems.as_view()),
      const fetchUserRequests = async (arg) => {
            // CHANGE THIS TO FIT THE VALUE
            const response = await BasketApi.get(`requestitem/free/${arg['id']}`, {headers : {
                  'Content-Type' : 'application/json',
            }})
            setReqitems(response.data)
      }

      // path('requestitem/add', NewRequestItem.as_view()),
      const add_request = async (arg) => { 
            // CHANGE THIS TO FIT THE VALUE
            const response = await BasketApi.post('requestitem/add', arg, {headers : {
                  'Content-Type' : 'application/json',
            }})
            fetchUserRequests(users['data'][0]);
      }

      // path('requestitem/instance/<str:reqitem>', RequestItemView.as_view()),
      const edit_request = async (arg) => { 
            // CHANGE THIS TO FIT THE VALUE
            const response = await BasketApi.patch(`requestitem/instance/${arg['id']}`, {"quantity" : 10}, {headers : {
                  'Content-Type' : 'application/json',
            }})
            fetchUserRequests(users['data'][0]);
      }

      const delete_request = async (arg) => { 
            // CHANGE THIS TO FIT THE VALUE
            const response = await BasketApi.delete(`requestitem/instance/${arg['id']}`, {headers : {
                  'Content-Type' : 'application/json',
            }})
            fetchUserRequests(users['data'][0]);
      }

      // path('requestitem/multidelete', DeleteMultipleItems.as_view()),
      const delete_multiple_requests = async (arg) => { 
            var ids = []
            arg.forEach((item) => {
                  ids.push(item['id']);
            })
            const response = await BasketApi.post(`requestitem/multidelete`, {"ids" : ids}, {headers : {
                  'Content-Type' : 'application/json',
            }})
            fetchUserRequests(users['data'][0]);
      }

      // path('orders/all', Orders.as_view()),
      const fetchOrders = async () => {
            // CHANGE THIS TO FIT THE VALUE
            const response = await BasketApi.get(`orders/all`, {headers : {
                  'Content-Type' : 'application/json',
            }})
            console.log("ALL ORDERS", response.data)
      }

      // path('orders/user/<str:userid>', UserOrders.as_view()),
      const fetchUserOrders = async (arg) => {
            // CHANGE THIS TO FIT THE VALUE
            const response = await BasketApi.get(`orders/user/${arg['id']}`, {headers : {
                  'Content-Type' : 'application/json',
            }})
            console.log("USER ORDERS", response.data)
      }

      // path('orders/unfulfilled', UnfulfilledOrders.as_view()),
      const fetchUnfulfilledOrders = async (arg) => {
            // CHANGE THIS TO FIT THE VALUE
            const response = await BasketApi.get(`orders/unfulfilled`, {headers : {
                  'Content-Type' : 'application/json',
            }})
            console.log("UNFULFILLED ORDERS", response.data)
      }


      // path('orders/add', Order.as_view()),
      const add_order = async (arg) => { 
            // CHANGE THIS TO FIT THE VALUE
            console.log("INSIDE ADD ORDER", arg);
            const response = await BasketApi.post('orders/add', arg, {headers : {
                  'Content-Type' : 'application/json',
            }})
            fetchUserOrders(users['data'][0]);
      }

      // path('orders/instance/<str:order>', OrderView.as_view()),
      // DINHI DAPITA DAGHAN BUHATUNON
      const edit_order = async (arg) => { 
            // CHANGE THIS TO FIT THE VALUE
            const response = await BasketApi.post(`order/instance/${arg['id']}`, {}, {headers : {
                  'Content-Type' : 'application/json',
            }})
            fetchUserRequests(users['data'][0]);
      }


      // path('items/free/<str:userid>', FreeMedicineRecords.as_view()),
      const fetchPresItems = async (arg) => {
            // CHANGE THIS TO FIT THE VALUE
            const response = await PrescriptionApi.get(`items/free/${arg['id']}`, {headers : {
                  'Content-Type' : 'application/json',
            }})
            console.log("FREE PRESCRIPTION ITEMS ARE", response.data)
      }

      // path('items/add', NewMedicineRecord.as_view()),
      const add_pres_item= async (arg) => { 
            // CHANGE THIS TO FIT THE VALUE
            const response = await PrescriptionApi.post('items/add', arg, {headers : {
                  'Content-Type' : 'application/json',
            }})
            fetchPresItems(users['data'][0]);
      }

      // path('items/instance/<str:medid>', MedicineRecordView.as_view()),
      const edit_pres_item = async (arg) => { 
            // CHANGE THIS TO FIT THE VALUE
            const response = await PrescriptionApi.patch(`items/instance/${arg['id']}`, {"quantity" : 10}, {headers : {
                  'Content-Type' : 'application/json',
            }})
            fetchPresItems(users['data'][0]);
      }

      const delete_pres_item = async (arg) => { 
            // CHANGE THIS TO FIT THE VALUE
            const response = await PrescriptionApi.delete(`items/instance/${arg['id']}`, {headers : {
                  'Content-Type' : 'application/json',
            }})
            fetchPresItems(users['data'][0]);
      }

      // path('items/multidelete', DeleteMultipleRecords.as_view()),
      const delete_multiple_pres_items = async (arg) => { 
            var ids = []
            arg.forEach((item) => {
                  ids.push(item['id']);
            })
            const response = await PrescriptionApi.post(`requestitem/multidelete`, {"ids" : ids}, {headers : {
                  'Content-Type' : 'application/json',
            }})
            fetchPresItems(users['data'][0]);
      }

      // path('prescription/all/<str:userid>', UserPrescriptions.as_view()),
      const fetchUserPrescriptions = async (arg) => {
            // CHANGE THIS TO FIT THE VALUE
            const response = await PrescriptionApi.get(`prescription/all/${arg['id']}`, {headers : {
                  'Content-Type' : 'application/json',
            }})
            console.log("USER ORDERS", response.data)
      }

      // path('prescription/add', NewPrescription.as_view()),
      const add_prescription = async (arg) => { 
            // CHANGE THIS TO FIT THE VALUE
            console.log("INSIDE ADD ORDER", arg);
            const response = await PrescriptionApi.post('orders/add', arg, {headers : {
                  'Content-Type' : 'application/json',
            }})
            fetchUserPrescriptions(users['data'][0]);
      }

      // path('prescription/instance/<str:presid>', PrescriptionView.as_view()),
      // DINHI DAPITA DAGHAN BUHATUNON
      const edit_prescription = async (arg) => { 
            // CHANGE THIS TO FIT THE VALUE
            const response = await PrescriptionApi.post(`prescription/instance/${arg['id']}`, {}, {headers : {
                  'Content-Type' : 'application/json',
            }})
            fetchUserPrescriptions(users['data'][0]);
      }
      
      return (
            <View>
                  <View>
                        <Button title="testuser" onPress= {() => {
                              dispatch(setUser(pharmacist_data));
                              dispatch(setWorker(pharmacist_data));
                        }} style={{alignSelf: 'center'}}/>
                        <Button title="testuserlist" onPress= {() => fetch_Users()} style={{alignSelf: 'center'}}/>
                        <Text>Products</Text>
                        <Button title="getproducts" onPress= {() => fetchProducts()} style={{alignSelf: 'center'}}/>
                        <Button title="addproduct1" onPress= {() => add_product(test_med2)} style={{alignSelf: 'center'}}/>
                        <Button title="addproduct2" onPress= {() => add_product(test_med3)} style={{alignSelf: 'center'}}/>
                        <Button title="addproductnewgen" onPress= {() => add_product({...test_med4, "generic_name" : onegen['id']})} style={{alignSelf: 'center'}}/>
                        <Button title="focusprod" onPress= {() => setOneprod(products[0])} style={{alignSelf: 'center'}}/>
                        <Button title="focusmanyprod" onPress= {() => setOneprod([products[0], products[1]])} style={{alignSelf: 'center'}}/>
                        <Button title="editproduct" onPress= {() => edit_product(oneprod)} style={{alignSelf: 'center'}}/>
                        <Button title="deleteproduct" onPress= {() => delete_product(oneprod)} style={{alignSelf: 'center'}}/>
                        <Button title="deletelistproduct" onPress= {() => delete_multiple_products(oneprod)} style={{alignSelf: 'center'}}/>
                  </View>

                  <View>
                        <Text>Generic</Text>
                        <Button title="getgen" onPress= {() => fetchGenerics()} style={{alignSelf: 'center'}}/>
                        <Button title="addgeneric1" onPress= {() => add_generic(test_gen2)} style={{alignSelf: 'center'}}/>
                        <Button title="addproduct2" onPress= {() => add_generic(test_gen3)} style={{alignSelf: 'center'}}/>
                        <Button title="focusgen" onPress= {() => setOnegen(generics[0])} style={{alignSelf: 'center'}}/>
                        <Button title="editgen" onPress= {() => edit_generic(onegen)} style={{alignSelf: 'center'}}/>
                        <Button title="deletegen" onPress= {() => delete_generic(onegen)} style={{alignSelf: 'center'}}/>
                  </View>
                  <View>
                        <Text>Basket</Text>
                        <Button title="getreqs" onPress= {() => fetchUserRequests(users['data'][0])} style={{alignSelf: 'center'}}/>
                        <Button title="Addbasket" onPress= {() => add_request({...request1, "product_id" : oneprod['id'], "user_id" : users['data'][0]['id']})} style={{alignSelf: 'center'}}/>
                        <Button title="focusreq" onPress= {() => setOnereq(reqitems[0])} style={{alignSelf: 'center'}}/>
                        <Button title="editreq" onPress= {() => edit_request(onereq)} style={{alignSelf: 'center'}}/>
                        <Button title="deletereq" onPress= {() => delete_request(onereq)} style={{alignSelf: 'center'}}/>
                        <Button title="deletelistreq" onPress= {() => delete_multiple_requests([reqitems[0], reqitems[1]])} style={{alignSelf: 'center'}}/>
                  </View>
                  <View>
                        <Text>Orders</Text>
                        <Button title="getreqs" onPress= {() => fetchUserRequests(users['data'][0])} style={{alignSelf: 'center'}}/>
                        <Button title="Addbasket" onPress= {() => add_request({...request1, "product_id" : oneprod['id'], "user_id" : users['data'][0]['id']})} style={{alignSelf: 'center'}}/>
                        <Button title="focusreq" onPress= {() => setOnereq(reqitems[0])} style={{alignSelf: 'center'}}/>
                        <Button title="editreq" onPress= {() => edit_request(onereq)} style={{alignSelf: 'center'}}/>
                        <Button title="deletereq" onPress= {() => delete_request(onereq)} style={{alignSelf: 'center'}}/>
                        <Button title="deletelistreq" onPress= {() => delete_multiple_requests([reqitems[0], reqitems[1]])} style={{alignSelf: 'center'}}/>
                  </View>
                  <View>
                        <Text>Orders</Text>
                        <Button title="getallorders" onPress= {() => fetchOrders()} style={{alignSelf: 'center'}}/>
                        <Button title="getunfulfilledorders" onPress= {() => fetchUnfulfilledOrders()} style={{alignSelf: 'center'}}/>
                        <Button title="getallorders" onPress= {() => fetchUserOrders(users['data'][1])} style={{alignSelf: 'center'}}/>
                        <Button title="addorder" onPress= {() => add_order({"customer_id": users['data'][0]['id'], "request_type": "Order"})} style={{alignSelf: 'center'}}/>
                        {/* ADD FURTHER DIRI */}
                  </View>
                  <View>
                        <Text>Prescription Items</Text>
                        <Button title="getpresitems" onPress= {() => fetchPresItems(users['data'][0])} style={{alignSelf: 'center'}}/>
                        <Button title="addpresitem" onPress= {() => add_request({...request1, "product_id" : oneprod['id'], "user_id" : users['data'][0]['id']})} style={{alignSelf: 'center'}}/>
                        <Button title="editpresitem" onPress= {() => edit_request(onereq)} style={{alignSelf: 'center'}}/>
                        <Button title="deletepresitem" onPress= {() => delete_request(onereq)} style={{alignSelf: 'center'}}/>
                        <Button title="deletelistpresitem" onPress= {() => delete_multiple_requests([reqitems[0], reqitems[1]])} style={{alignSelf: 'center'}}/>
                  </View>
                  <View>
                        <Text>Orders</Text>
                        <Button title="getprescriptions" onPress= {() => fetchOrders()} style={{alignSelf: 'center'}}/>
                        <Button title="addprescription" onPress= {() => fetchUserOrders(users['data'][1])} style={{alignSelf: 'center'}}/>
                        <Button title="editprescription" onPress= {() => add_order({"customer_id": users['data'][0]['id'], "request_type": "Order"})} style={{alignSelf: 'center'}}/>
                        {/* ADD FURTHER DIRI */}
                  </View>
            </View>
      )
}

const mapStateToProps = (state) => { 
      return {
            userslist: state.userData.users_list,
            user: state.userData
      }
};

export default connect(mapStateToProps)(apiTestScreen);