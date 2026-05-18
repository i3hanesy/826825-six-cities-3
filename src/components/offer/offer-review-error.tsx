import {useState, useEffect} from 'react';

function OfferReviwError(): JSX.Element {
  const [isVisible, setIsVisible] = useState(true);

   useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 3000); // 3 секунды в миллисекундах
  },);

//   const handleClick = () => {
//     setIsVisible(true);
    // setTimeout(() => {
    //   setIsVisible(false);
    // }, 3000); // 3 секунды в миллисекундах
//   };

  return (
    <>
      {isVisible && <p>Не удалось отправить комментарий</p>}
    </>
  );
}

export default OfferReviwError;