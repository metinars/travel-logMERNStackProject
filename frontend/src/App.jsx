import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import RootLayout from './pages/Root';
import MapPage from './pages/Map';
import TravelsPage from './pages/Travels';
import ErrorPage from './pages/Error';
import NewTravelsRootPage from './pages/NewTravel/NewTravelsRoot';
import { queryClient } from './util/http';
import { checkAuthLoader } from './util/auth';
import ProtectedPage from './pages/Protected';
import TravelsRootLayout from './pages/TravelRoot';
import TravelDetailPage, {
  loader as travelDetailLoader,
} from './pages/TravelDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MapPage /> },
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
        path: 'no-entry',
        element: <ProtectedPage />,
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
