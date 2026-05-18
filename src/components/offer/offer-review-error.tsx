import {useState, useEffect} from 'react';

function OfferReviwError(): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 300000); // 3 секунды в миллисекундах
  },); // массив зависимостей пуст, эффект сработает однократно

  return (
     <div>
      {isVisible ? <div>Компонент исчезнет через 3 секунды</div> : null}
    </div>
  );
}

export default OfferReviwError;