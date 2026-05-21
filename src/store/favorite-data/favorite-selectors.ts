import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Offers} from '../../types/offer';

export const getFavoriteOffers = (state: Pick<State, NameSpace.Favorites>): Offers => state[NameSpace.Favorites].favoriteOffers;
export const getOffersDataLoadingStatus = (state: Pick<State, NameSpace.Favorites>): boolean => state[NameSpace.Favorites].isFavoritesDataLoading;
