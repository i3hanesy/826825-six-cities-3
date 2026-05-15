import {Offers} from '../../types/offer';
import {useCallback} from 'react';
import Card from '../card/card';
import { useAppDispatch} from '../../hooks/index';
import { setMapCurrentOffer } from '../../store/main-process/main-process';

type OffersListProps = {
  offers: Offers;
  bemBlock?: string;
}

function CardsList({offers, bemBlock} : OffersListProps): JSX.Element {
const dispatch = useAppDispatch();
const handleCardHover = useCallback((offerId: string) => () => dispatch(setMapCurrentOffer(offerId)),[dispatch]);

  return (
    <>
      {offers.map((offer) => (
        <Card key={offer.id}
          offer={offer}
          bemBlock = {bemBlock}
          onCardHover = {handleCardHover}
        />
      ))}
    </>
  );
}

export default CardsList;
