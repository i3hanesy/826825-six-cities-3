import {useState, useEffect} from 'react';
import './offer-form-error.css';

function OfferReviwError(): JSX.Element {
  const [isVisible, setIsVisible] = useState(true);

   useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 2000); // 2 секунды в миллисекундах
  },);

  return (
    <>
      {isVisible && <div className='reviews__form--error'>
        <p>Не удалось отправить комментарий</p>
      </div>}
    </>
  );
}

export default OfferReviwError;