import { render, screen } from '@testing-library/react';
import NotFoundScreen from './not-found-screen';
import { withHistory } from '../../utils/mock-component';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const expectedHeaderText = '404. Page not found';
    const expectedText = 'К сожалению такой страницы не существует.';
    const expectedLinkText = 'Вернуться на главную';

    render(withHistory(<NotFoundScreen />));

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
