// PersonalInformation.jsx
import React from 'react';
import { useFormContext } from 'react-hook-form';

const PersonalInformation = () => {
  const { register } = useFormContext();

  return (
    <fieldset>
      <legend>Personal Information</legend>
      <label>
        First Name:
        <input type="text" {...register("firstName")} />
      </label>
      <label>
        Last Name:
        <input type="text" {...register("lastName")} />
      </label>
      <label>
        Gender:
        <select {...register("gender")}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </label>
      <label>
        Age:
        <input type="number" {...register("age")} />
      </label>
    </fieldset>
  );
};

export default PersonalInformation;