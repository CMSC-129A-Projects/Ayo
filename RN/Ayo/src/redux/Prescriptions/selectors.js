import {createSelector} from 'reselect';

// needs to be the same in store.js
const Prescription = (state) => state.prescriptionData;

export const getPrescription = createSelector(
      Prescription,
      (prescriptionData) => prescriptionData 
)

// no element needs explicit getting
