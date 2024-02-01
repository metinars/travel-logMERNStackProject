import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import RootLayout from './pages/Root';
import MapPage from './pages/Map';
import TravelsPage from './pages/Travels';
import ErrorPage from './pages/Error';
import NewTravelsRootPage from './pages/NewTravel/NewTravelsRoot';
import { queryClient } from './httpUtil/http';
// import AddLocationPage from './pages/NewTravel/AddLocation';
// import AddDetailsPage from './pages/NewTravel/AddDetails';
// import AddImagesPage from './pages/NewTravel/AddImages';
// import { action as manipulateEventAction } from './components/AddTravel/AddTravel';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MapPage /> },
      {
        path: 'travels',
        element: <TravelsPage />,
      },
      {
        path: 'add',
        element: <NewTravelsRootPage />,
        // action: manipulateEventAction,
        // children: [
        //   {
        //     index: true,
        //     element: <AddLocationPage />,
        //   },
        // {
        //   path: 'detail',
        //   element: <AddDetailsPage />,
        // },
        // {
        //   path: 'image',
        //   element: <AddImagesPage />,
        // },
        // ],
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
