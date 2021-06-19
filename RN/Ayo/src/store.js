import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';


import userData from './redux/Users/reducers';
import productData from './redux/Products/reducers';
import orderData from './redux/Orders/reducers';
import orderItemData from './redux/OrderItems/reducers';
import prescriptionData from './redux/Prescriptions/reducers';
import medicineRecordData from './redux/MedicineRecords/reducers';
import {persistStore, persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-async-storage/async-storage';

const reducers = combineReducers({
      userData,
      productData, 
      orderData, 
      orderItemData, 
      prescriptionData,
      medicineRecordData
});

const persistConfig = {
      key: 'root',
      storage: AsyncStorage,
      stateReconciler: autoMergeLevel2, //check this!
      blacklist: ['orderItemData', 'prescriptionData',
            'medicineRecordData', 'orderData', 'productData']
}

const pReducer = persistReducer(persistConfig, reducers);

export default store = createStore(pReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);