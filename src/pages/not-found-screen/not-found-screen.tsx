import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';

function NotFoundScreen(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>6 cities Страница не найдена</title>
      </Helmet>
      <div className="page">
        <main className="page__main">
          <h1>404. Page not found</h1>

          <p>К сожалению такой страницы не существует.</p>

          <Link to="/">Вернуться на главную</Link>

        </main>
      </div>
    </>
  );
}

export default NotFoundScreen;
