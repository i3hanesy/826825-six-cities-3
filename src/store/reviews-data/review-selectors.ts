import {NameSpace} from '../../const';
import {State} from '../../types/state';
import { Comments } from '../../types/comment';

export const getReviews = (state: Pick<State, NameSpace.Review>): Comments => state[NameSpace.Review].reviews;
export const getLoadStatus = (state: Pick<State, NameSpace.Review>): boolean => state[NameSpace.Review].isLoading;
export const getErrorStatus = (state: Pick<State, NameSpace.Review>): boolean => state[NameSpace.Review].hasError;

