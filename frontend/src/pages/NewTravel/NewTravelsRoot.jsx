import AddTravel from '../../components/AddTravel';
import { Outlet } from 'react-router';

const NewTravelsRootPage = () => {
  return (
    <>
      <AddTravel />
      <Outlet />
    </>
  );
};

export default NewTravelsRootPage;
