import {store} from '../store/index';
import {AuthorizationStatus, SortTypes} from '../const';
import { Offers, Offer, OfferCity} from './offer';
import { Comments } from './comment';
import { UserData } from './user-data';

export type UserDataType = {
  userData: UserData;
}

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
};

export type CurrentOffer = Offer | null;

export type OfferData = {
  offersList: Offers;
  nearByOffer: Offers;
  currentOffer: CurrentOffer;
  isOffersDataLoading: boolean;
  hasError: boolean;
}

export type FavoriteData = {
  favoriteOffers: Offers;
  isFavoritesDataLoading: boolean;
  hasError: boolean;
}

export type ReviewsData = {
  reviews: Comments;
  isLoading: boolean;
  hasError: boolean;
}

export type MainProcess = {
  currentCity: OfferCity;
  sortType: SortTypes;
  mapCurrentOffer: string;
};

export type FavoritePost = {
  id: string;
  favoriteStatus: string;
}

export type FavoriteCange = {
  data: Offer;
  favoriteStatus: string;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
