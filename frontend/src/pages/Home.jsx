import { AnimatePresence } from 'framer-motion';

// import PageContent from '../components/PageContent';
import Login from '../components/user/Login';
import { useValue } from '../context/ContextProvider';

function HomePage() {
  const {
    state: { openLogin },
    dispatch,
  } = useValue();
  return (
    <>
      {/* <PageContent /> */}
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

export default HomePage;
