import {internet, datatype} from 'faker';
import { UserData } from '../types/user-data';

export const makeFakeUserData = (): UserData => ({
    id: datatype.number(),
    email: internet.email(),
    token: datatype.uuid(),
    avatarUrl: internet.avatar(),
    isPro: datatype.boolean(),
} as UserData);
