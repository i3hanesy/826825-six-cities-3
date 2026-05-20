import {internet, datatype, name, address, image, lorem} from 'faker';
import { UserData } from '../types/user-data';

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

export const fakeCurrentOffer = {
  id: cardId,
  title: name.title(),
  type: name.jobType(),
  price: datatype.number(),
  city: fakeCity,
  location: fakeLocation,
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.number(),
  description: fakeDescription,
  bedrooms: datatype.number(),
  goods: fakeGoods,
  host: fakeHost,
  images: fakeImages,
  maxAdults: datatype.number(),
};

export const fakeError = lorem.text();

export const fakeOffer = () => ({
  id: cardId,
  title: name.title(),
  type: name.jobType(),
  price: datatype.number(),
  city: fakeCity,
  location: fakeLocation,
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.number(),
  previewImage: image.imageUrl(),
});

export const fakeOffers = Array.from({length: 5}, () => fakeOffer());

export const fakeReview = () => ({
  id: datatype.uuid(),
  date: datatype.datetime().toISOString(),
  user: fakeHost,
  comment: lorem.paragraph(),
  rating: datatype.number(),
});

export const fakeReviews = Array.from({length: 5}, () => fakeReview());

export const fakeUser = {
  name: name.firstName(),
  avatarUrl: image.imageUrl(),
  isPro: datatype.boolean(),
  email: internet.email(),
  token: datatype.uuid(),
};
