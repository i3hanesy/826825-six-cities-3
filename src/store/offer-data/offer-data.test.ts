import { removeFavorite, offerData } from './offer-data';
import { fetchOffersAction, fetchOfferAction, fetchNearByOfferAction } from '../api-actions';
import { fakeOffers, fakeOffer } from '../../utils/mocks';

describe('OfferData Slice', () => {

  it('should return offersList with isFavorite flags set to false', () => {
    const mockOffer = fakeOffer();
    const initialStade = {
      offersList: [mockOffer],
      nearByOffer: [],
      currentOffer: null,
      isOffersDataLoading: false,
      hasError: false,
    };

    const result = offerData.reducer(initialStade, removeFavorite);
    mockOffer['isFavorite'] = false;

    expect(result.offersList).toEqual([mockOffer]);
  });
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offersList: [],
      nearByOffer: [],
      currentOffer: null,
      isOffersDataLoading: false,
      hasError: false,
    };

    const result = offerData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offersList: [],
      nearByOffer: [],
      currentOffer: null,
      isOffersDataLoading: false,
      hasError: false,
    };

    const result = offerData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  //offersList
  it('should set "isOffersDataLoading" to "true", "hasError" to "false" with "fetchOffersAction.pending"', () => {
    const expectedState = {
      offersList: [],
      nearByOffer: [],
      currentOffer: null,
      isOffersDataLoading: true,
      hasError: false,
    };

    const result = offerData.reducer(undefined, fetchOffersAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "offersList" with offers, "isOffersDataLoading" to "false" with "fetchOffersAction.fulfilled"', () => {
    const mockOffers = fakeOffers;
    const expectedState = {
      offersList: mockOffers,
      nearByOffer: [],
      currentOffer: null,
      isOffersDataLoading: false,
      hasError: false,
    };

    const result = offerData.reducer(
      undefined,
      fetchOffersAction.fulfilled(
        mockOffers, '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isOffersDataLoading" to "true", "hasError" to "true" with "fetchOffersAction.rejected', () => {
    const expectedState = {
      offersList: [],
      nearByOffer: [],
      currentOffer: null,
      isOffersDataLoading: false,
      hasError: true,
    };

    const result = offerData.reducer(
      undefined,
      fetchOffersAction.rejected
    );

    expect(result).toEqual(expectedState);
  });

  //fetchOfferAction
  it('should set "isOffersDataLoading" to "true", "hasError" to "false" with "fetchOfferAction.pending"', () => {
    const expectedState = {
      offersList: [],
      nearByOffer: [],
      currentOffer: null,
      isOffersDataLoading: true,
      hasError: false,
    };

    const result = offerData.reducer(undefined, fetchOfferAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set currentOffer with offer, "isOffersDataLoading" to "false" with "fetchOfferAction.fulfilled"', () => {
    const mockOffer = fakeOffer();
    const expectedState = {
      offersList: [],
      nearByOffer: [],
      currentOffer: mockOffer,
      isOffersDataLoading: false,
      hasError: false,
    };

    const result = offerData.reducer(
      undefined,
      fetchOfferAction.fulfilled(
        mockOffer, '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isOffersDataLoading" to "true", "hasError" to "true" with "fetchOfferAction.rejected', () => {
    const expectedState = {
      offersList: [],
      nearByOffer: [],
      currentOffer: null,
      isOffersDataLoading: false,
      hasError: true,
    };

    const result = offerData.reducer(
      undefined,
      fetchOfferAction.rejected
    );

    expect(result).toEqual(expectedState);
  });

  //nearByOffer
  it('should set "isOffersDataLoading" to "true", "hasError" to "false" with "fetchNearByOfferAction.pending"', () => {
    const expectedState = {
      offersList: [],
      nearByOffer: [],
      currentOffer: null,
      isOffersDataLoading: true,
      hasError: false,
    };

    const result = offerData.reducer(undefined, fetchNearByOfferAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "nearByOffer" with offers, "isOffersDataLoading" to "false" with "fetchNearByOfferAction.fulfilled"', () => {
    const mockOffers = fakeOffers;
    const expectedState = {
      offersList: [],
      nearByOffer: mockOffers,
      currentOffer: null,
      isOffersDataLoading: false,
      hasError: false,
    };

    const result = offerData.reducer(
      undefined,
      fetchNearByOfferAction.fulfilled(
        mockOffers, '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isOffersDataLoading" to "true", "hasError" to "true" with "fetchNearByOfferAction.rejected', () => {
    const expectedState = {
      offersList: [],
      nearByOffer: [],
      currentOffer: null,
      isOffersDataLoading: false,
      hasError: true,
    };

    const result = offerData.reducer(
      undefined,
      fetchNearByOfferAction.rejected
    );

    expect(result).toEqual(expectedState);
  });
});
