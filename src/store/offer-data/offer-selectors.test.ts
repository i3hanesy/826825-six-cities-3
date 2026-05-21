import { NameSpace } from '../../const';
import {getOffers,
  getNearByOffer,
  getCurrentOffer,
  getOffersDataLoadingStatus,
  getErrorStatus} from './offer-selectors';
import { fakeOffers, fakeOffer } from '../../utils/mocks';

describe('Offer selectors',() => {
  const state = {
    [NameSpace.Data]: {
      offersList: fakeOffers,
      nearByOffer: fakeOffers,
      currentOffer: fakeOffer(),
      isOffersDataLoading: false,
      hasError: false,
    }
  };

  it('should return offers from state', () => {
    const { offersList } = state[NameSpace.Data];
    const result = getOffers(state);
    expect(result).toEqual(offersList);
  });

  it('should return near by offer from state', () => {
    const { nearByOffer } = state[NameSpace.Data];
    const result = getNearByOffer(state);
    expect(result).toEqual(nearByOffer);
  });

  it('should return current offer from state', () => {
    const { currentOffer } = state[NameSpace.Data];
    const result = getCurrentOffer(state);
    expect(result).toEqual(currentOffer);
  });

  it('should return offers data loading status', () => {
    const { isOffersDataLoading } = state[NameSpace.Data];
    const result = getOffersDataLoadingStatus(state);
    expect(result).toBe(isOffersDataLoading);
  });

  it('should return error status from state', () => {
    const { hasError } = state[NameSpace.Data];
    const result = getErrorStatus(state);
    expect(result).toBe(hasError);
  });

});
