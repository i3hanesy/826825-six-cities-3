import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import { ReviewsData } from '../../types/state';
import { fetchReviewsAction, reviewAction } from '../api-actions';
import { Comment } from '../../types/comment';

const initialState: ReviewsData = {
  reviews: [],
  isLoading: false,
  hasError: false,
};

export const reviewsData = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })

      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isLoading = false;
      })

      .addCase(fetchReviewsAction.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })

      .addCase(reviewAction.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })

      .addCase(reviewAction.fulfilled, (state, action:PayloadAction<Comment>) => {
        state.reviews.push(action.payload);
        state.isLoading = false;
      })

      .addCase(reviewAction.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  }
});
