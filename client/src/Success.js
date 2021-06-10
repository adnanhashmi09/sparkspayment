import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Success() {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push('/');
    }, 9000);
  }, []);
  return (
    <div style={{ color: '#fff' }}>
      <h1 style={{ color: '#47ff75', fontSize: '4rem', marginBottom: '2rem' }}>
        The Payment was Successfull. <br /> Your invoice has been sent to your
        email.
      </h1>
      <h2 style={{ fontSize: '2rem' }}>Redirecting to the Home Page...</h2>
    </div>
  );
}

export default Success;
