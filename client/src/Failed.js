import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Failed() {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push('/checkout');
    }, 9000);
  }, []);
  return (
    <div style={{ color: '#fff' }}>
      <h1 style={{ color: '#c54525', fontSize: '4rem', marginBottom: '2rem' }}>
        Transaction Failed. <br /> Please Try Again.
      </h1>
      <h2 style={{ fontSize: '2rem' }}> Redirecting...</h2>
    </div>
  );
}

export default Failed;
