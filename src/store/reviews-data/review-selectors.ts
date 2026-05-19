import {NameSpace} from '../../const';
import {State} from '../../types/state';
import { Comments } from '../../types/comment';

export const getReviews = (state: State): Comments => state[NameSpace.Review].reviews;
export const getLoadStatus = (state: State): boolean => state[NameSpace.Review].isLoading;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Review].hasError;

