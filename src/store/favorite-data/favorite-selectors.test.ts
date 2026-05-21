import { NameSpace } from '../../const';
import {getFavoriteOffers, getOffersDataLoadingStatus} from './favorite-selectors';
import { fakeOffers } from '../../utils/mocks';

describe('Favorites selectors',() => {
  const state = {
    [NameSpace.Favorites]: {
      favoriteOffers: fakeOffers,
      isFavoritesDataLoading: false,
    }
  };

  it('should return reviews from state', () => {
    const { favoriteOffers } = state[NameSpace.Favorites];
    const result = getFavoriteOffers(state);
    expect(result).toEqual(favoriteOffers);
  });

  it('should return reviews data loading status', () => {
    const { isFavoritesDataLoading } = state[NameSpace.Favorites];
    const result = getOffersDataLoadingStatus(state);
    expect(result).toBe(isFavoritesDataLoading);
  });
});
