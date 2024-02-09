import { Form, NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';

function MainNavigation() {
  const token = localStorage.getItem('currentUserToken');

  return (
    <>
      <header className={classes.header}>
        <NavLink to="/" className={classes.logo}>
          Travel Log
        </NavLink>
        {/* <nav>
        <ul className={classes.nav__links}>
          <li>
            <NavLink to="/">Services</NavLink>
          </li>
          <li>
            <NavLink to="/">Services</NavLink>
          </li>
          <li>
            <NavLink to="/">Services</NavLink>
          </li>
        </ul>
      </nav> */}
        <div className={classes.cta}>
          {!token && (
            <NavLink
              to="/auth?mode=login"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Login
            </NavLink>
          )}
          {token && (
            <Form action="/logout" method="post">
              <button>Logout</button>
            </Form>
          )}
        </div>
      </header>
    </>
  );
}
export default MainNavigation;
