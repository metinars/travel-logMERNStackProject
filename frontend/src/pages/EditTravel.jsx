import { useRouteLoaderData } from 'react-router-dom';
import EditTravel from '../components/EditTravel/EditTravel';

const EditTravelPage = () => {
  const data = useRouteLoaderData('travel-detail');
  // console.log(data.travel);
  return <EditTravel method={'PATCH'} travelContent={data.travel} />;
};

export default EditTravelPage;
