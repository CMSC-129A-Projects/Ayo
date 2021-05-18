import {createSelector} from 'reselect';

// needs to be the same in store.js
const genericName = (state) => state.genericNameData;

export const getGenericName = createSelector(
      genericName,
      (genericNameData) => genericNameData 
)

//  this is the only explicit rendering of values
export const getGenericNameName = createSelector(
      genericName,
      (genericNameData) => genericName.name
)

export const getDisease = createSelector(
      genericName,
      (genericName) => genericName.disease
)