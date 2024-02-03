import { redirect } from 'react-router-dom';

export function getAuthToken() {
  const token = localStorage.getItem('currentUserToken');
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (token === 'undefined') {
    return redirect('/no-entry');
  }

  return null;
}
