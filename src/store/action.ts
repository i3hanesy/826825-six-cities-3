import { createAction } from '@reduxjs/toolkit';
import { OfferCity } from '../types/offer';

export const changeCity = createAction<OfferCity>('main/changeCity');

export const fillOffersList = createAction<string>('/fillOffersList');
