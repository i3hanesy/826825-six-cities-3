import {Link} from 'react-router-dom';
import Logo from '../../components/logo/logo';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>
      <main className="page__main">
        <h1>404. Page not found</h1>

        <p>К сожалению такой страницы не существует.</p>
        <p>Возможно вы что-то попытались найти на этой странице,<br/> и ждали ее загрузки, и уже трепеталась надежда....</p>
        <p>Но нет такой страницы</p>

        <Link to="/">Вернуться на главную</Link>

      </main>
    </div>
  );
}

export default NotFoundScreen;
