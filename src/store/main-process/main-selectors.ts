import {NameSpace, SortTypes} from '../../const';
import {State} from '../../types/state';
import { OfferCity } from '../../types/offer';

export const getCurrentCity = (state: Pick<State, NameSpace.Main>): OfferCity => state[NameSpace.Main].currentCity;
export const getSortType = (state: Pick<State, NameSpace.Main>): SortTypes => state[NameSpace.Main].sortType;
export const getMapCurrentOffer = (state: Pick<State, NameSpace.Main>): string => state[NameSpace.Main].mapCurrentOffer;
