// CustomerInformation.jsx
import React from 'react';
import { useFormContext } from 'react-hook-form';

const CustomerInformation = () => {
  const { register } = useFormContext();

  return (
    <fieldset>
      <legend>Customer Information</legend>
      <label>
        Customer Code:
        <input type="text" {...register("customerCode")} />
      </label>
      <label>
        Name:
        <input type="text" {...register("customerName")} />
      </label>
      <label>
        Email:
        <input type="email" {...register("customerEmail")} />
      </label>
      <label>
        Mobile:
        <input type="tel" {...register("customerMobile")} />
      </label>
    </fieldset>
  );
};

export default CustomerInformation;
