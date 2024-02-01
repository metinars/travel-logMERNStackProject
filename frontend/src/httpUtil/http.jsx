import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export async function createNewTravel(travelData) {
  let url = import.meta.env.VITE_REACT_APP_SERVER_URL + '/travel';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + travelData.token,
    },
    body: JSON.stringify(travelData.travel),
  });

  if (!response.ok) {
    const error = new Error('An error occurred while creeating the travel');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { travel } = await response.json();

  return travel;
}
