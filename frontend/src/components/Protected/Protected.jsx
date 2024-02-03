import { useValue } from '../../context/ContextProvider';
import classes from './Protected.module.css';

import { FaLock } from 'react-icons/fa';

const Protected = () => {
  const { dispatch } = useValue();
  return (
    <div className={classes.auth__block}>
      <div className={classes.auth__block__icon}>!</div>
      <div className={classes.auth__block__text}>
        <h2>Forbidden Access</h2>
        <div className={classes.auth__block__content}>
          <p> Please login or register to access this page</p>
          <button onClick={() => dispatch({ type: 'OPEN_LOGIN' })}>
            <FaLock />
            <span>Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Protected;
