import { Link, useLocation } from 'react-router-dom';
import { FaMapMarkerAlt, FaMapMarkedAlt } from 'react-icons/fa';
import { IoIosAddCircle } from 'react-icons/io';

import classes from './BottomNav.module.css';

const BottomNav = () => {
  let location = useLocation();

  return (
    <>
      <div className={classes.bottomNav}>
        <div className={classes.navItems}>
          <Link
            to="/"
            className={[
              classes.button,
              `${location.pathname === '/' ? classes['active'] : ''}`,
            ].join(' ')}
          >
            <FaMapMarkerAlt />
            <span>Map</span>
          </Link>
          <Link
            to="/travels"
            className={[
              classes.button,
              `${location.pathname === '/travels' ? classes['active'] : ''}`,
            ].join(' ')}
          >
            <FaMapMarkedAlt />
            <span>Travels</span>
          </Link>
          <Link
            to="/add"
            className={[
              classes.button,
              `${location.pathname === '/add' ? classes['active'] : ''}`,
            ].join(' ')}
          >
            <IoIosAddCircle />
            <span>Add</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BottomNav;
