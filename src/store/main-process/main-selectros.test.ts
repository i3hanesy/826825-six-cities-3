import { SortTypes, DEFAUL_CITY, NameSpace } from '../../const';
import {getCurrentCity, getSortType, getMapCurrentOffer} from './main-selectors';

describe('Main selectors',() => {
  const state = {
    [NameSpace.Main]: {
      currentCity: DEFAUL_CITY,
      sortType: SortTypes.POPULAR,
      mapCurrentOffer: '',
    }
  };

  it('should return current city from state', () => {
    const { currentCity } = state[NameSpace.Main];
    const result = getCurrentCity(state);
    expect(result).toEqual(currentCity);
  });

  it('should return sort type from state', () => {
    const { sortType } = state[NameSpace.Main];
    const result = getSortType(state);
    expect(result).toBe(sortType);
  });

  it('should return map current offer from state', () => {
    const { mapCurrentOffer } = state[NameSpace.Main];
    const result = getMapCurrentOffer(state);
    expect(result).toBe(mapCurrentOffer);
  });

});
