import {Card} from '../card/card';
// import CardMain from '../card/card-main';
// import CardFavorites from '../card/card-favorites';
// import CardNear from '../card/card-near';
import {Offers} from '../../types/offer';

// type CardComponentProps = {
//   location: string;
//   offer: Offer;
//   setCurrentOffer?: (value: string) => void;

// }

// const getComponentByLocation = ({location, offer, setCurrentOffer}: CardComponentProps) => {
//   switch (location) {
//     case AppRoute.Main:
//       return (
//         <CardMain
//           offer={offer}
//           setCurrentOffer={setCurrentOffer}
//         />);
//     case AppRoute.Favorites:
//       return (
//         <CardFavorites
//           offer={offer}
//         />);
//   }
//   return (
//     <CardNear
//       offer={offer}
//       setCurrentOffer={setCurrentOffer}
//     />);
// };

// import {useLocation} from 'react-router-dom';

type OffersListProps = {
  listClassName: string;
  offers: Offers;
  cardsPlace?: string; 
  setCurrentOffer?: (value: string) => void;
}

function CardsList({listClassName, offers, cardsPlace, setCurrentOffer} : OffersListProps): JSX.Element {
  // const location = useLocation().pathname;

  return (
    <div className={listClassName}>
      {offers.map((offer) => (
        <Card key={offer.id}
          offer={offer}
          setCurrentOffer={setCurrentOffer}
          cardsPlace={cardsPlace}
        />
      ))}
    </div>
  );
}

export default CardsList;
