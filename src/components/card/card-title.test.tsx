import CardTitle from './card-title';
import { fakeOffer } from '../../utils/mocks';
import { withHistory } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import { DataTestMarkups } from '../../const';

describe('Component: Logo', () => {
  const offer = fakeOffer();
  it('should render correctly', () => {
    const expectedTitle = offer.title;
    const preparedComponent = withHistory(<CardTitle offer = {offer}/>);

    render(preparedComponent);

    expect(screen.getByTestId(DataTestMarkups.CardTitleContainer)).toBeInTheDocument();
    expect(screen.getByText(expectedTitle)).toBeInTheDocument();
  });
});
