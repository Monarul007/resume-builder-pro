// AddressInformation.jsx
import React from 'react';
import { useFormContext } from 'react-hook-form';

const AddressInformation = () => {
  const { register } = useFormContext();

  return (
    <fieldset>
      <legend>Address Information</legend>
      <label>
        Address Line 1:
        <input type="text" {...register("addressLine1")} />
      </label>
      <label>
        Address Line 2:
        <input type="text" {...register("addressLine2")} />
      </label>
      <label>
        City:
        <input type="text" {...register("city")} />
      </label>
      <label>
        Postal Code:
        <input type="text" {...register("postalCode")} />
      </label>
      <label>
        Country:
        <input type="text" {...register("country")} />
      </label>
    </fieldset>
  );
};

export default AddressInformation;
