import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import RootLayout from './pages/Root';
import MapPage from './pages/Map';
import TravelsPage from './pages/Travels';
import ErrorPage from './pages/Error';
import NewTravelsRootPage from './pages/NewTravel/NewTravelsRoot';
import { queryClient } from './util/http';
import { checkAuthLoader } from './util/auth';
import TravelsRootLayout from './pages/TravelRoot';
import TravelDetailPage, {
  loader as travelDetailLoader,
  action as deleteTravelAction,
} from './pages/TravelDetail';
import AuthenticationPage, {
  action as authAction,
} from './pages/Authentication';
import { action as actionLogout } from './pages/Logout';
import { tokenLoader } from './util/auth';
import EditTravelPage from './pages/EditTravel';
import { action as manipulateTravelAction } from './components/EditTravel/EditTravel';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    children: [
      { index: true, element: <MapPage /> },
      { path: 'auth', element: <AuthenticationPage />, action: authAction },
      {
        path: 'travels',
        element: <TravelsRootLayout />,
        children: [
          {
            index: true,
            element: <TravelsPage />,
          },
          {
            path: ':travelId',
            id: 'travel-detail',
            loader: travelDetailLoader,
            children: [
              {
                index: true,
                element: <TravelDetailPage />,
                action: deleteTravelAction,
              },
              {
                path: 'edit',
                element: <EditTravelPage />,
                action: manipulateTravelAction,
                loader: checkAuthLoader,
              },
            ],
          },
        ],
      },
      {
        path: 'add',
        element: <NewTravelsRootPage />,
        loader: checkAuthLoader,
      },
      {
        path: 'logout',
        action: actionLogout,
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
};

export default App;
