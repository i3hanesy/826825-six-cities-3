import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace, FavoriteStatus} from '../../const';
import {FavoriteData, FavoriteCange} from '../../types/state';
import {
  fetchFavoriteOffersAction,
  favoriteChangeAction} from '../api-actions';

const initialState: FavoriteData = {
  favoriteOffers: [],
  isFavoritesDataLoading: false,
  hasError: false,
};

export const favoriteData = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {
    dropFavoriteOffers: (state) => {
      state.favoriteOffers = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.isFavoritesDataLoading = true;
        state.hasError = false;
      })

      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isFavoritesDataLoading = false;
      })

      .addCase(fetchFavoriteOffersAction.rejected, (state) => {
        state.isFavoritesDataLoading = false;
        state.hasError = true;
      })

      .addCase(favoriteChangeAction.fulfilled, (state, action:PayloadAction<FavoriteCange>) => {
        switch (action.payload.favoriteStatus) {
          case FavoriteStatus.Addad:
            state.favoriteOffers.push(action.payload.data);
            break;
          case FavoriteStatus.Removed:
            state.favoriteOffers = state.favoriteOffers.filter(({id}) => id !== action.payload.data.id);
        }
      });
  }
});

export const {dropFavoriteOffers} = favoriteData.actions;
