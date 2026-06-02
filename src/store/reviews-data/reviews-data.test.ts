import { reviewsData } from './reviews-data';
import { fetchReviewsAction, reviewAction } from '../api-actions';
import { fakeReviews, fakeReview, mockPostReview } from '../../utils/mocks';

describe('ReviewsData Slice', () => {

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      reviews: [],
      isLoading: false,
      hasError: false,
    };

    const result = reviewsData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      reviews: [],
      isLoading: false,
      hasError: false,
    };

    const result = reviewsData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  //reviews
  it('should set "isLoading" to "true", "hasError" to "false" with "fetchReviewsAction.pending"', () => {
     const expectedState = {
      reviews: [],
      isLoading: true,
      hasError: false,
    };

    const result = reviewsData.reducer(undefined, fetchReviewsAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "reviews" with reviews, "isLoading" to "false" with "fetchReviewsAction.fulfilled"', () => {
    const expectedState = {
      reviews: fakeReviews,
      isLoading: false,
      hasError: false,
    };

    const result = reviewsData.reducer(
      undefined,
      fetchReviewsAction.fulfilled(
        fakeReviews, '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isLoading" to "true", "hasError" to "true" with "fetchReviewsAction.rejected', () => {
    const expectedState = {
      reviews: [],
      isLoading: false,
      hasError: true,
    };

    const result = reviewsData.reducer(
      undefined,
      fetchReviewsAction.rejected
    );

    expect(result).toEqual(expectedState);
  });

//reviewAction

 it('should set "isLoading" to "true", "hasError" to "false" with "reviewAction.pending"', () => {
     const expectedState = {
      reviews: [],
      isLoading: true,
      hasError: false,
    };

    const result = reviewsData.reducer(undefined, reviewAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "reviews" with reviews, "isLoading" to "false" with "reviewAction.fulfilled"', () => {
    const mockReview = fakeReview();
    const expectedState = {
      reviews: [mockReview],
      isLoading: false,
      hasError: false,
    };

    const result = reviewsData.reducer(
      undefined,
      reviewAction.fulfilled(
        mockReview, '', mockPostReview)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isLoading" to "false", "hasError" to "true" with "reviewAction.rejected', () => {
    const expectedState = {
      reviews: [],
      isLoading: false,
      hasError: true,
    };

    const result = reviewsData.reducer(
      undefined,
      reviewAction.rejected
    );

    expect(result).toEqual(expectedState);
  });
  
})