import { useState } from 'react';
import { LiaEyeSlash, LiaEyeSolid } from 'react-icons/lia';

import classes from './PasswordField.module.css';

const PasswordField = () => {
  const [showPassword, setShowPassword] = useState(false);

  const passwordVisibleHandler = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <label htmlFor="password">Password</label>
      <div className={classes['input-icons']}>
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          id="password"
          className={classes['input-field']}
        />
        <div className={classes['password-icon']}>
          <button type="button" onClick={passwordVisibleHandler}>
            {showPassword ? (
              <LiaEyeSolid className={classes['icon']} />
            ) : (
              <LiaEyeSlash className={classes['icon']} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordField;
