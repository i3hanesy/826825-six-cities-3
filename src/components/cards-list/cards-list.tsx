import {Offers} from '../../types/offer';
import {memo} from 'react';
import Card from '../card/card';

type OffersListProps = {
  offers: Offers;
  bemBlock?: string;
}

function CardsList({offers, bemBlock} : OffersListProps): JSX.Element {

  return (
    <>
      {offers.map((offer) => (
        <Card key={offer.id}
          offer={offer}
          bemBlock = {bemBlock}
        />
      ))}
    </>
  );
}

const MemorizedCardsList = memo(CardsList);

export default MemorizedCardsList;
