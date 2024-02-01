import { useValue } from '../../context/ContextProvider';
import useCheckToken from '../../hooks/use-check-token';

const NavBarUserLoginHover = () => {
  useCheckToken();
  const { dispatch } = useValue();

  return (
    <>
      <button onClick={() => dispatch({ type: 'UPDATE_USER', payload: null })}>
        Logout
      </button>
    </>
  );
};

export default NavBarUserLoginHover;
