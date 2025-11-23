import {Outlet} from 'react-router-dom';
import Logo from '../../components/logo/logo';
import Auth from '../header/header-auth';
import NoAuth from '../header/header-no-auth';
import {AuthorizationStatus} from '../../const';

type LayoutProps = {
  authorizationStatus: AuthorizationStatus;
}

function Layout(props: LayoutProps): JSX.Element {
  const {authorizationStatus} = props;
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authorizationStatus === AuthorizationStatus.Auth
                  ? <Auth />
                  : <NoAuth />}
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
