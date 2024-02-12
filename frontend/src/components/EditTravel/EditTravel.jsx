import { Form, json, redirect } from 'react-router-dom';

import classes from './EditTravel.module.css';
import { getAuthToken } from '../../util/auth';

const EditTravel = ({ method, travelContent }) => {
  return (
    <>
      <div className={classes.edit__travel}>
        <Form method={method} className={classes.form}>
          <p>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              name="title"
              required
              defaultValue={travelContent ? travelContent.title : ''}
            />
          </p>
          <p>
            <label htmlFor="desc">Description</label>
            <input
              id="desc"
              type="text"
              name="desc"
              required
              defaultValue={travelContent ? travelContent.desc : ''}
            />
          </p>
          <p>
            <label htmlFor="image-url">Image Url</label>
            <input
              id="image-url"
              type="text"
              name="image-url"
              required
              defaultValue={travelContent ? travelContent.imageUrl : ''}
            />
          </p>
          <div className={classes.submitAction}>
            <button type="submit">Submit</button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default EditTravel;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const travelData = {
    title: data.get('title'),
    desc: data.get('desc'),
    imageUrl: data.get('image-url'),
  };

  let url = import.meta.env.VITE_REACT_APP_SERVER_URL + '/travel';

  if (method === 'PATCH') {
    const travelId = params.travelId;
    url = import.meta.env.VITE_REACT_APP_SERVER_URL + '/travel/' + travelId;
  }

  const token = getAuthToken();
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(travelData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not save event.' }, { status: 500 });
  }

  return redirect('/travels/' + params.travelId);
}
