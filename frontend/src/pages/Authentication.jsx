import UserAuth from '../components/User/UserAuth';
import { json, redirect } from 'react-router-dom';

const AuthenticationPage = () => {
  return <UserAuth />;
};

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  if (mode !== 'login' && mode !== 'signup') {
    throw json({ message: 'Unsupported mode.' }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    name: data.get('name'),
    email: data.get('email'),
    password: data.get('password'),
  };

  let url = import.meta.env.VITE_REACT_APP_SERVER_URL + '/' + mode;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not authentication user.' }, { status: 500 });
  }

  const resData = await response.json();
  console.log(resData);
  const token = resData.result.token;

  localStorage.setItem('currentUserToken', token);

  return redirect('/');
}
