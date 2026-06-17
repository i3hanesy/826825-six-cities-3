import {internet, datatype, name, address, image, lorem} from 'faker';
import { UserData } from '../types/user-data';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../services/api';
import { Offer } from '../types/offer';
import { State } from '../types/state';
import { AuthorizationStatus, SortTypes, DEFAUL_CITY } from '../const';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;
export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const makeFakeUserData = (): UserData => ({
  id: datatype.number(),
  email: internet.email(),
  token: datatype.uuid(),
  avatarUrl: internet.avatar(),
  isPro: datatype.boolean(),
} as UserData);

export const cardId = datatype.uuid();

export const fakeLocation = {
  latitude: Number(address.latitude()),
  longitude: Number(address.longitude()),
  zoom: datatype.number(),
};

export const fakeCity = {
  name: address.cityName(),
  location: fakeLocation
};

export const fakeHost = {
  name: name.firstName(),
  avatarUrl: image.imageUrl(),
  isPro: datatype.boolean(),
};

export const fakeDescription = datatype.string();

export const fakeImages = Array.from({ length: 10 }, () => image.imageUrl());

export const fakeGoods = Array.from({ length: 5 }, () => lorem.word());

export const fakeOffer = ():Offer => ({
  id: cardId,
  title: name.title(),
  type: 'room',
  price: datatype.number(),
  city: fakeCity,
  location: fakeLocation,
  isFavorite: true,
  isPremium: datatype.boolean(),
  rating: datatype.number(),
  previewImage: image.imageUrl(),
  description: fakeDescription,
  bedrooms: datatype.number(),
  goods: fakeGoods,
  host: fakeHost,
  images: fakeImages,
  maxAdults: datatype.number(),
});


// export const fakeError = lorem.text();

export const fakeOffers = Array.from({length: 6}, () => fakeOffer());

export const fakeReview = () => ({
  id: datatype.uuid(),
  date: datatype.datetime().toISOString(),
  user: fakeHost,
  comment: lorem.paragraph(),
  rating: datatype.number(),
});

export const mockPostReview = {
  id: '1',
  comment: 'Test comment',
  rating: 4
};

export const fakeReviews = Array.from({length: 5}, () => fakeReview());

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  DATA: {
    offersList: fakeOffers,
    nearByOffer: fakeOffers,
    currentOffer: null,
    isOffersDataLoading: false,
    hasError: false,
  },
  REVIEW: {
    reviews: fakeReviews,
    isLoading: false,
    hasError: false,
  },
  USER: { authorizationStatus: AuthorizationStatus.NoAuth },
  MAIN: {
    currentCity: DEFAUL_CITY,
    sortType: SortTypes.POPULAR,
    mapCurrentOffer: '',
  },
  FAVORITES: {
    favoriteOffers: fakeOffers,
    isFavoritesDataLoading: false,
    hasError: false,
  },
  DATA_USER: { userData: null },
  ...initialState ?? {},
});
