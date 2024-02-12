import { Suspense } from 'react';
import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData,
} from 'react-router-dom';
import TravelDetails from '../components/Travels/TravelDetail';
import { getAuthToken } from '../util/auth';

function TravelDetailPage() {
  const { travel } = useRouteLoaderData('travel-detail');

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={travel}>
        {(loadedTravel) => <TravelDetails travel={loadedTravel} />}
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

    return resData;
  }
}

// eslint-disable-next-line no-unused-vars
export async function loader({ request, params }) {
  const id = params.travelId;

  const data = await loadTravel(id);

  return defer({
    travel: data.result,
  });
}

export async function action({ params, request }) {
  const travelId = params.travelId;

  const token = getAuthToken();
  const response = await fetch(
    import.meta.env.VITE_REACT_APP_SERVER_URL + `/travel/${travelId}`,
    {
      method: request.method,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );

  if (!response.ok) {
    throw json(
      { message: 'Could not delete event.' },
      {
        status: 500,
      }
    );
  }
  return redirect('/travels');
}
