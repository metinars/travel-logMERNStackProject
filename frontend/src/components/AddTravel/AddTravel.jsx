import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import classes from './AddTravels.module.css';
import AddLocation from './AddLocation/AddLocation';
import AddDetails from './AddDetails/AddDetails';
import { useState } from 'react';
import { createNewTravel, queryClient } from '../../util/http';
import ErrorBlock from '../UI/ErrorBlock';

const AddTravel = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [steps] = useState([{ label: 'Location' }, { label: 'Details' }]);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((activeStep) => activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep === 0) return;
    setActiveStep((activeStep) => activeStep - 1);
  };

  const checkDisabled = () => {
    if (activeStep < steps.length - 1) return false;
    return true;
  };

  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewTravel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['new-travel'] });
      navigate('/travels');
    },
  });

  const submitHandler = (event) => {
    event.preventDefault();

    const token = JSON.parse(localStorage.getItem('currentUserToken'));

    const travelData = new FormData(event.target);
    const data = Object.fromEntries(travelData);

    mutate({ travel: data, token: token });
  };

  return (
    <div className={classes.container}>
      <form onSubmit={submitHandler} className={classes.addTravel}>
        {isPending && 'Submitting..'}
        <div className={classes.formItems}>
          <AddLocation style={activeStep == 0 ? '' : 'display'} />
          <AddDetails style={activeStep == 1 ? '' : 'display'} />
        </div>
        {checkDisabled() && (
          <div className={classes.submitAction}>
            <button type="submit">
              {!isPending ? 'Submit' : 'Submitting..'}
            </button>
          </div>
        )}
      </form>
      <div className={classes.stepBtns}>
        <button disabled={!activeStep} onClick={handleBack}>
          Back
        </button>
        <button disabled={checkDisabled()} onClick={handleNext}>
          Next
        </button>
      </div>
      {isError && (
        <ErrorBlock
          title="Failed to create event"
          message={
            error.info?.message ||
            'Failed to create event. Please check your inputs and try again later.'
          }
        />
      )}
    </div>
  );
};

export default AddTravel;
