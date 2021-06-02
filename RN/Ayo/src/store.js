import {createStore, combineReducers} from 'redux';

import userData from './redux/Users/reducers';
import productData from './redux/Products/reducers';
import orderData from './redux/Orders/reducers';
import orderItemData from './redux/OrderItems/reducers';
import prescriptionData from './redux/Prescriptions/reducers';
import medicineRecordData from './redux/MedicineRecords/reducers';

const reducers = combineReducers({
      userData,
      productData, 
      orderData, 
      orderItemData, 
      prescriptionData,
      medicineRecordData
});

export default createStore(reducers);