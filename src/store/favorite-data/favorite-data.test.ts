import { favoriteData, dropFavoriteOffers } from './favorite-data';
import { fetchFavoriteOffersAction, favoriteChangeAction } from '../api-actions';
import { fakeOffers, fakeOffer } from '../../utils/mocks';
import { FavoriteStatus } from '../../const';

describe('OfferData Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      favoriteOffers: [],
      isFavoritesDataLoading: false,
      hasError: false,
    };

    const result = favoriteData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      favoriteOffers: [],
      isFavoritesDataLoading: false,
      hasError: false,
    };

    const result = favoriteData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "isFavoritesDataLoading" to "true", "hasError" to "false" with "fetchFavoriteOffersAction.pending"', () => {
    const expectedState = {
      favoriteOffers: [],
      isFavoritesDataLoading: true,
      hasError: false,
    };

    const result = favoriteData.reducer(undefined, fetchFavoriteOffersAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "favoriteOffers" with offers, "isFavoritesDataLoading" to "false" with "fetchFavoriteOffersAction.fulfilled"', () => {
    const mockOffers = fakeOffers;
    const expectedState = {
      favoriteOffers: mockOffers,
      isFavoritesDataLoading: false,
      hasError: false,
    };

    const result = favoriteData.reducer(
      undefined,
      fetchFavoriteOffersAction.fulfilled(
        mockOffers, '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isFavoritesDataLoading" to "true", "hasError" to "true" with "fetchFavoriteOffersAction.rejected', () => {
    const expectedState = {
      favoriteOffers: [],
      isFavoritesDataLoading: false,
      hasError: true,
    };

    const result = favoriteData.reducer(
      undefined,
      fetchFavoriteOffersAction.rejected
    );

    expect(result).toEqual(expectedState);
  });

  it('should drop userData', () => {
    const mockOffers = fakeOffers;
    const initialState = {
      favoriteOffers: mockOffers,
      isFavoritesDataLoading: false,
      hasError: false,
    };

    const expectedState = {
      favoriteOffers: [],
      isFavoritesDataLoading: false,
      hasError: false,
    };

    const result = favoriteData.reducer(initialState, dropFavoriteOffers);

    expect(result).toEqual(expectedState);
  });

  it('should add favoriteOffer to favoriteOffers if favoriteStatus FavoriteStatus.Addad', () => {
    const mockOffer = fakeOffer();
    const expectedState = {
      favoriteOffers: [mockOffer],
      isFavoritesDataLoading: false,
      hasError: false,
    };

    const result = favoriteData.reducer(
      undefined,
      favoriteChangeAction.fulfilled(
        {data:mockOffer, favoriteStatus: FavoriteStatus.Addad}, '', {id: mockOffer.id, favoriteStatus: FavoriteStatus.Addad})
    );

    expect(result).toEqual(expectedState);
  });

  it('should remove Offer from favoriteOffers if favoriteStatus FavoriteStatus.Removed', () => {
    const mockOffer = fakeOffer();
    const initialStade = {
      favoriteOffers: [mockOffer],
      isFavoritesDataLoading: false,
      hasError: false,
    };

    const expectedState = {
      favoriteOffers: [],
      isFavoritesDataLoading: false,
      hasError: false,
    };

    mockOffer['isFavorite'] = false;

    const result = favoriteData.reducer(
      initialStade,
      favoriteChangeAction.fulfilled(
        {data:mockOffer, favoriteStatus: FavoriteStatus.Removed}, '', {id: mockOffer.id, favoriteStatus: FavoriteStatus.Removed})
    );

    expect(result).toEqual(expectedState);
  });

});
