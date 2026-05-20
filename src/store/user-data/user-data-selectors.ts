import {NameSpace} from '../../const';
import {State} from '../../types/state';
import { UserData } from '../../types/user-data';

export const getUserData = (state: Pick<State, NameSpace.DataUser>): UserData => state[NameSpace.DataUser].userData;
