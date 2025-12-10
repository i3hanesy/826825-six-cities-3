import {useState} from 'react';
import Card from '../card/card';
import {Offers} from '../../types/offer';

type OffersListProps = {
  listClassName: string;
  offers: Offers;
}

function CardsList({listClassName, offers} : OffersListProps): JSX.Element {

  const [, setCurrentOffer] = useState({});

  return (
    <div className={listClassName}>
      {offers.map((offer) => (
        <Card
          key={offer.id}
          offer={offer}
          setCurrentOffer={setCurrentOffer}
        />)
      )}
    </div>
  );
}

export default CardsList;
