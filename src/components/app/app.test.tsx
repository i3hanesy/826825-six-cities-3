import { render, screen} from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus, DataTestMarkups } from '../../const';
import App from './app';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore, fakeOffers, fakeOffer } from '../../utils/mocks';
describe('Application Routing', () => {
  let mockHistory: MemoryHistory;
  const fakeStore = makeFakeStore();
  const offer = fakeOffers[0];
  const offerId = offer.id;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "MainScreen" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByTestId(DataTestMarkups.MainScreenContainer)).toBeInTheDocument();
  });

  it('should render "AuthScreen" when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getByTestId(DataTestMarkups.LoginContainer)).toBeInTheDocument();
  });

  it('should renders FavoritesScreen when user navigate to "/favorites"  and the user is authorized', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, {...fakeStore,
      USER: { authorizationStatus: AuthorizationStatus.Auth }
    });
    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getByTestId(DataTestMarkups.FavoritesContainer)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('К сожалению такой страницы не существует.')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });

  it('should renders OfferScreen when user navigate to "/offer/id" ', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);

    mockHistory.push(`${AppRoute.Offer}/${offerId}`);
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);

    render(withStoreComponent);

    expect(screen.getByTestId(DataTestMarkups.OfferScreenContainer)).toBeInTheDocument();
    // expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();
  });
});
