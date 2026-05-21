import { NameSpace } from '../../const';
import {getReviews, getLoadStatus, getErrorStatus} from './review-selectors';
import { fakeReviews } from '../../utils/mocks';

describe('Review selectors',() => {
  const state = {
    [NameSpace.Review]: {
      reviews: fakeReviews,
      isLoading: false,
      hasError: false,
    }
  };

  it('should return reviews from state', () => {
    const { reviews } = state[NameSpace.Review];
    const result = getReviews(state);
    expect(result).toEqual(reviews);
  });

  it('should return reviews data loading status', () => {
    const { isLoading } = state[NameSpace.Review];
    const result = getLoadStatus(state);
    expect(result).toBe(isLoading);
  });

  it('should return error status from state', () => {
    const { hasError } = state[NameSpace.Review];
    const result = getErrorStatus(state);
    expect(result).toBe(hasError);
  });
});
