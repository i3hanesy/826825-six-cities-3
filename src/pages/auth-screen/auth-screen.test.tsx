import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../utils/mock-component';
import AuthScreen from './auth-screen';
import { makeFakeStore } from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';

describe('Component: AuthScreen', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<AuthScreen />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    const loginContainer = screen.getByTestId('login-container');

    expect(loginContainer).toBeInTheDocument();
  });

  it('should render correctly when user enter login and password', async () => {
    const loginElementTestId = 'loginElement';
    const passwordElementTestId = 'passwordElement';
    const expectedLoginValue = 'keks@mail.ru';
    const expectedPasswordValue = 'tnm123456';
    const { withStoreComponent } = withStore(<AuthScreen />, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.type(
      screen.getByTestId(loginElementTestId),
      expectedLoginValue,
    );
    await userEvent.type(
      screen.getByTestId(passwordElementTestId),
      expectedPasswordValue,
    );

    expect(screen.getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });

  it('should not render AuthScreen when the user is authorized', () => {

    const { withStoreComponent } = withStore(<AuthScreen />, makeFakeStore({
      USER: { authorizationStatus: AuthorizationStatus.Auth }
    }));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    const loginContainer = screen.queryByTestId('login-container');

    expect(loginContainer).not.toBeInTheDocument();
  });
});
