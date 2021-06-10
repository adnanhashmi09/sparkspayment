import './App.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';

const PayPalButton = window.paypal.Buttons.driver('react', { React, ReactDOM });

function Paypal() {
  const [value, setvalue] = useState(100);
  const history = useHistory();

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: value,
            },
          },
        ],
        application_context: {
          shipping_preference: 'NO_SHIPPING',
        },
        credit_card: {
          billing_address: {
            city: 'new york',
            postal_code: '10001',
          },
        },
      })
      .catch((err) => {
        alert(err);
        history.push('/failed');
      });
  };

  const onApprove = (data, actions) => {
    return actions.order
      .capture()
      .then((details) => {
        console.log(details);
        const { id, create_time } = details;
        const name = `${details.payer.name.given_name} ${details.payer.name.surname} `;
        const amount = details.purchase_units[0].amount.value;
        const d = new Date(create_time);
        const date = d.toString();
        const email = details.payer.email_address;
        console.log(date, name, create_time);
        document.querySelector('.overlay').classList.add('show');
        fetch('/invoice', {
          method: 'POST',
          body: JSON.stringify({
            id,
            name,
            amount,
            date,
            email,
          }),

          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }).then(() => {
          history.push('/success');
        });
      })
      .catch((err) => {
        console.log(err);
        history.push('/failed');
      });
  };

  return (
    <div className="container">
      <div className="overlay">Finalising ...</div>
      <div className="payment">
        <label htmlFor="amount">Enter the amount.</label>
        <input
          type="number"
          id="amount"
          value={value}
          onChange={(e) => {
            setvalue(e.target.value);
          }}
        />
        <PayPalButton
          createOrder={(data, actions) => createOrder(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)}
        />
      </div>
    </div>
  );
}

export default Paypal;
