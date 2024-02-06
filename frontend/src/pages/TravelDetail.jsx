import { Suspense } from 'react';
import { Await, defer, json, useRouteLoaderData } from 'react-router-dom';
import TravelDetails from '../components/Travels/TravelDetail';

function TravelDetailPage() {
  console.log(travel, '7');
  const { travel } = useRouteLoaderData('travel-detail');
  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={travel}>
        {(loadedTravel) => <TravelDetails travel={loadedTravel} />}
        console.log(travel);
      </Await>
    </Suspense>
  );
}

export default TravelDetailPage;

async function loadTravel(id) {
  const response = await fetch(
    import.meta.env.VITE_REACT_APP_SERVER_URL + `/travel/${id}`
  );
  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected travel.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    console.log(resData);
    return resData;
  }
}

// eslint-disable-next-line no-unused-vars
export async function loader({ request, params }) {
  const id = params.travelId;

  console.log('girdi');
  console.log(id);

  return defer(console.log('defer girdi'), {
    travel: await loadTravel(id),
  });
}
