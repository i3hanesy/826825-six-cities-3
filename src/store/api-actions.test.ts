import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppThunkDispatch,
  extractActionsTypes,
  fakeOffers,
  fakeOffer,
  fakeReviews,
  makeFakeUserData,
  fakeReview } from '../utils/mocks';
import { State } from '../types/state';
import {
  checkAuthAction,
  fetchOffersAction,
  fetchNearByOfferAction,
  fetchFavoriteOffersAction,
  loginAction,
  logoutAction,
  fetchOfferAction,
  fetchReviewsAction,
  reviewAction,
  fetchUserDataAction,
  favoriteChangeAction } from './api-actions';
import { APIRoute } from '../const';
import { redirectToRoute } from './action';
import { AuthData } from '../types/auth-data';
import * as tokenStorage from '../services/token';
import { dropUserData } from './user-data/user-data';
import { dropFavoriteOffers } from './favorite-data/favorite-data';
import { removeFavorite } from './offer-data/offer-data';
import { FavoriteStatus } from '../const';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      DATA: {
        offersList: [],
        nearByOffer: [],
        currentOffer: null,
      },
      FAVORITES: {favoriteOffers: []},
      REVIEW: {reviews: []},
      DATA_USER: {userData: null},
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async() => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('fetchUserDataAction', () => {
    const mockUserData = makeFakeUserData();
    it('should dispatch "fetchUserDataAction.pending", "fetchUserDataAction.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200, mockUserData);

      await store.dispatch(fetchUserDataAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchUserDataActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchUserDataAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchUserDataAction.pending.type,
        fetchUserDataAction.fulfilled.type,
      ]);

      expect(fetchUserDataActionFulfilled.payload).toEqual(mockUserData);
    });

    it('should dispatch "fetchUserDataAction.pending", "fetchUserDataAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400, null);

      await store.dispatch(fetchUserDataAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchUserDataAction.pending.type,
        fetchUserDataAction.rejected.type,
      ]);
    });
  });

  describe('fetchOffersAction', () => {
    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, fakeOffers);

      await store.dispatch(fetchOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);

      expect(fetchOffersActionFulfilled.payload).toEqual(fakeOffers);
    });

    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400, []);

      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
    });
  });

  //currentOffer
  describe('fetchOfferAction', () => {
    const mockOffer = fakeOffer();
    it('should dispatch "fetchOfferAction.pending", "fetchOfferAction.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockOffer.id}`).reply(200, mockOffer);

      await store.dispatch(fetchOfferAction(mockOffer.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOfferAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.fulfilled.type,
      ]);

      expect(fetchOfferActionFulfilled.payload).toEqual(mockOffer);
    });

    it('should dispatch "fetchOfferAction.pending", "fetchOfferAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockOffer.id}`).reply(400, null);

      await store.dispatch(fetchOfferAction(mockOffer.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.rejected.type,
      ]);
    });
  });


  //near
  describe('fetchNearByOfferAction', () => {
    const mockOffer = fakeOffer();
    it('should dispatch "fetchNearByOfferAction.pending", "fetchNearByOfferAction.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockOffer.id}/nearby`).reply(200, fakeOffers);

      await store.dispatch(fetchNearByOfferAction(mockOffer.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchNearByOfferActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchNearByOfferAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchNearByOfferAction.pending.type,
        fetchNearByOfferAction.fulfilled.type,
      ]);

      expect(fetchNearByOfferActionFulfilled.payload).toEqual(fakeOffers);
    });

    it('should dispatch "fetchNearByOfferAction.pending", "fetchNearByOfferAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockOffer.id}/nearby`).reply(400, []);

      await store.dispatch(fetchNearByOfferAction(mockOffer.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchNearByOfferAction.pending.type,
        fetchNearByOfferAction.rejected.type,
      ]);
    });
  });

  //favorites
  describe('fetchFavoriteOffersAction', () => {
    it('should dispatch "fetchFavoriteOffersAction.pending", "fetchFavoriteOffersAction.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, fakeOffers);

      await store.dispatch(fetchFavoriteOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFavoriteOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFavoriteOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFavoriteOffersAction.pending.type,
        fetchFavoriteOffersAction.fulfilled.type,
      ]);

      expect(fetchFavoriteOffersActionFulfilled.payload)
        .toEqual(fakeOffers);
    });

    it('should dispatch "fetchFavoriteOffersAction.pending", "fetchFavoriteOffersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(400, []);

      await store.dispatch(fetchFavoriteOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoriteOffersAction.pending.type,
        fetchFavoriteOffersAction.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "redirectToRoute", "loginAction.fulfilled" when server response 200', async() => {
      const fakeUser: AuthData = { login: 'test@test.ru', password: 'mtn123456' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        redirectToRoute.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with the received token', async () => {
      const fakeUser: AuthData = { login: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toHaveBeenCalledTimes(1);
      expect(mockSaveToken).toHaveBeenCalledWith(fakeServerReplay.token);
    });

  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async() => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        dropUserData.type,
        dropFavoriteOffers.type,
        removeFavorite.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toHaveBeenCalledTimes(1);
    });
  });

  describe('fetchReviewsAction', () => {
    const mockOffer = fakeOffer();
    it('should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${mockOffer.id}`).reply(200, fakeReviews);

      await store.dispatch(fetchReviewsAction(mockOffer.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchReviewsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type,
      ]);

      expect(fetchReviewsActionFulfilled.payload).toEqual(fakeReviews);
    });

    it('should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${mockOffer.id}`).reply(400, []);

      await store.dispatch(fetchReviewsAction(mockOffer.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.rejected.type,
      ]);
    });
  });
  describe('reviewAction', () => {
    const mockReview = fakeReview();
    const userReview = {
      id: mockReview.id,
      comment: mockReview.comment,
      rating: mockReview.rating
    };
    it('should dispatch "reviewAction.pending", "reviewAction.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${userReview.id}`, {comment: userReview.comment, rating: userReview.rating}).reply(200, [mockReview]);

      await store.dispatch(reviewAction(userReview));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const reviewActionFulfilled = emittedActions.at(1) as ReturnType<typeof reviewAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        reviewAction.pending.type,
        reviewAction.fulfilled.type,
      ]);

      expect(reviewActionFulfilled.payload).toEqual([mockReview]);
    });

    it('should dispatch "reviewAction.pending", "reviewAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${userReview.id}`, {comment: userReview.comment, rating: userReview.rating}).reply(400, []);

      await store.dispatch(reviewAction(userReview));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        reviewAction.pending.type,
        reviewAction.rejected.type,
      ]);
    });
  });

  describe('favoriteChangeAction', () => {
    const mockOffer = fakeOffer();
    it('should dispatch "favoriteChangeAction.pending", "favoriteChangeAction.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${mockOffer.id}/${FavoriteStatus.Addad}`).reply(200, mockOffer);

      await store.dispatch(favoriteChangeAction({id: mockOffer.id, favoriteStatus:FavoriteStatus.Addad}));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const favoriteChangeActionFulfilled = emittedActions.at(1) as ReturnType<typeof favoriteChangeAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        favoriteChangeAction.pending.type,
        favoriteChangeAction.fulfilled.type,
      ]);

      expect(favoriteChangeActionFulfilled.payload).toEqual({data:mockOffer, favoriteStatus: FavoriteStatus.Addad});
    });

    it('should dispatch "favoriteChangeAction.pending", "favoriteChangeAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${mockOffer.id}/${FavoriteStatus.Addad}`).reply(400, null);

      await store.dispatch(favoriteChangeAction({id: mockOffer.id, favoriteStatus:FavoriteStatus.Addad}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        favoriteChangeAction.pending.type,
        favoriteChangeAction.rejected.type,
      ]);
    });
  });

});
