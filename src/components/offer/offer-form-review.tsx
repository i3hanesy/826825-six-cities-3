import {useState, Fragment, FormEvent, ChangeEvent, memo, useEffect} from 'react';
import { Setting, showErrorTime } from '../../const';
import { reviewAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/user-selectors';
import { AuthorizationStatus } from '../../const';
import {getLoadStatus, getErrorStatus} from '../../store/reviews-data/review-selectors';
import './offer-form-error.css';

const ratingTitles:string[] = ['perfect', 'good', 'not bad', 'badly', 'terribly'];

type OfferFormReviewProps = {
  offerId: string;
};


function OfferFormReview({offerId}: OfferFormReviewProps) : JSX.Element | string {
  const [formData, setFormData] = useState({
    review: '',
    rating: '',
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isLoading = useAppSelector(getLoadStatus);
  const hasError = useAppSelector(getErrorStatus);

  useEffect(() => {
    if(hasError) {
      setIsErrorVisible(true);
      setTimeout(() => {
        setIsErrorVisible(false);
      }, showErrorTime);
    }
  },[hasError]);

  useEffect(() => {
    if (formData.review.length >= Setting.minReviewLength && formData.review.length <= Setting.maxReviewLength && formData.rating !== '') {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [formData]);

  useEffect(() => {
    if (!isLoading && !hasError) {
      setFormData({
        review: '',
        rating: '',
      });
    }
  }, [isLoading, hasError]);


  const handleFieldChange = (evt:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target;

    setFormData({...formData, [name]: value});
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(reviewAction({
      id: offerId,
      comment: formData.review,
      rating: Number(formData.rating),
    }));
  };

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    return '';
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      className="reviews__form form" action="#" method="post"
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratingTitles.map((title, index)=>(
          <Fragment key={`${title + index}`}>
            <input
              onChange={handleFieldChange}
              className="form__rating-input visually-hidden"
              name="rating"
              value={Setting.maxRating - index}
              checked={(Setting.maxRating - index) === Number(formData.rating)}
              id={`${Setting.maxRating - index}-stars`}
              type="radio"
              disabled = {isLoading}
            />
            <label htmlFor={`${Setting.maxRating - index}-stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        onChange={handleFieldChange}
        className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"
        value = {formData.review}
        disabled = {isLoading}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isButtonDisabled} >Submit</button>
      </div>
      {isErrorVisible && <p className='reviews__form--error'>Не удалось отправить комментарий</p>}
    </form>
  );

}

const MemorizedOfferFormReview = memo(OfferFormReview);

export default MemorizedOfferFormReview;
