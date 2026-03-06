import {useLocation} from 'react-router-dom';
import {AppRoute, Page} from '../../const';
import {Offers} from '../../types/offer';

type OffersListProps = {
  listClassName: string;
  offers: Offers;
  cardsPlace?: string; 
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
        <Fragment key={offer.id}>
          {getComponentByLocation({location, offer, setCurrentOffer})}
        </Fragment>
      ))}
    </div>
  );
}

export default CardsList;
