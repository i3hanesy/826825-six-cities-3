import {setMapCurrentOffer, changeSortType, changeCity, mainProcess} from './main-process';
import { CITIES, SortTypes } from '../../const';

describe('MainProcess Slice', () => {
   const initialState = {
      currentCity: CITIES[0],
      sortType: SortTypes.POPULAR,
      mapCurrentOffer: '',
   };
   it ('should return initial state with empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = { currentCity: CITIES[2], sortType: SortTypes.PRICE_HIGH_TO_LOW, mapCurrentOffer: ' ' };

      const result = mainProcess.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
   });
 
   it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };

    const result = mainProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('must set the selected city and sort by Popular', () => {
    const expectedCurrentCity = CITIES[3];
    const expectedSortType = SortTypes.POPULAR
    

    const result = mainProcess.reducer(initialState, changeCity(CITIES[3]));

    expect(result.currentCity).toEqual(expectedCurrentCity);
    expect(result.sortType).toBe(expectedSortType);
  });

  it('must set the selected sortType', () => {
    const expectedSortType = SortTypes.PRICE_LOW_TO_HIGH
    
    const result = mainProcess.reducer(initialState, changeSortType(SortTypes.PRICE_LOW_TO_HIGH));

    expect(result.sortType).toBe(expectedSortType);
  });

  it('must set the selected mapOfferID', () => {
    const expectedMapCurrentOffer = 'dfgrthn1265';

    const result = mainProcess.reducer(initialState, setMapCurrentOffer('dfgrthn1265'));

    expect(result.mapCurrentOffer).toBe(expectedMapCurrentOffer);
  });

})