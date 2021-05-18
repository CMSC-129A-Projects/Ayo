import {createSelector} from 'reselect';

// needs to be the same in store.js
const medicineRecord = (state) => state.medicineRecordData;

export const getMedicineRecord = createSelector(
      medicineRecord,
      (medicineRecordData) => medicineRecordData 
)

//  this are the only explicit rendering of values
export const getQuantityToTake= createSelector(
      medicineRecord,
      (medicineRecord) => medicineRecord.quantity_to_take
)

export const getQuantityToBuy= createSelector(
      medicineRecord,
      (medicineRecord) => medicineRecord.quantity_to_buy
)

export const getFrequency= createSelector(
      medicineRecord,
      (medicineRecord) => medicineRecord.frequency
)

export const getFirstDose= createSelector(
      medicineRecord,
      (medicineRecord) => medicineRecord.first_dose
)