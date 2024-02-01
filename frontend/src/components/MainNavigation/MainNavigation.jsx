import { AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

import classes from './MainNavigation.module.css';
import { useValue } from '../../context/ContextProvider';
import NavBarUserLoginHover from '../User/NavBarUserLoginHover';
import Login from '../user/Login';

function MainNavigation() {
  const {
    state: { currentUser, openLogin },
    dispatch,
  } = useValue();

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
          {!currentUser ? (
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => dispatch({ type: 'OPEN_LOGIN' })}
            >
              Login
            </motion.button>
          ) : (
            <NavBarUserLoginHover />
          )}
        </div>
      </header>
      {openLogin ? (
        <AnimatePresence>
          <Login />
        </AnimatePresence>
      ) : (
        ''
      )}
    </>
  );
}
export default MainNavigation;
