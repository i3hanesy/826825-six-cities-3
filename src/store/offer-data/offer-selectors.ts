import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Offers} from '../../types/offer';
import { CurrentOffer } from '../../types/state';

export const getOffers = (state: Pick<State, NameSpace.Data>): Offers => state[NameSpace.Data].offersList;
export const getNearByOffer = (state: Pick<State, NameSpace.Data>): Offers => state[NameSpace.Data].nearByOffer;
export const getCurrentOffer = (state: Pick<State, NameSpace.Data>): CurrentOffer => state[NameSpace.Data].currentOffer;
export const getOffersDataLoadingStatus = (state: Pick<State, NameSpace.Data>): boolean => state[NameSpace.Data].isOffersDataLoading;
export const getErrorStatus = (state: Pick<State, NameSpace.Data>): boolean => state[NameSpace.Data].hasError;
