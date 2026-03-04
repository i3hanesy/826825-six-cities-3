import {useLocation} from 'react-router-dom';
import {AppRoute, Page} from '../../const';
import {Offers} from '../../types/offer';
import Card from '../card/card';

type OffersListProps = {
  listClassName: string;
  offers: Offers;
  setCurrentOffer?: (value: string) => void;
}

const getLocation = (locationName: string) => {
  switch (locationName) {
    case AppRoute.Main:
      return Page.Main;
    case AppRoute.Favorites:
      return Page.Favorites;
  }
  return Page.Offer;
};

function CardsList({listClassName, offers, setCurrentOffer} : OffersListProps): JSX.Element {
  const location = useLocation();

  return (
    <div className={listClassName}>
      {offers.map((offer) => (
        <Card key={offer.id}
          offer={offer}
          setCurrentOffer={setCurrentOffer}
          page = {getLocation(location.pathname)}
        />
      ))}
    </div>
  );
}

export default CardsList;
