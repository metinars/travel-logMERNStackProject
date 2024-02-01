import BottomNav from '../components/BottomNav';
import MainNavigation from '../components/MainNavigation';
import { Outlet, useNavigation } from 'react-router-dom';

const RootLayout = () => {
  const navigation = useNavigation();

  return (
    <>
      <MainNavigation />
      {navigation.state === 'loading' && <p>Loading..</p>}
      <Outlet />
      <BottomNav />
    </>
  );
};

export default RootLayout;
