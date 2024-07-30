// components/PersonalDetails.js
import React from 'react';
import { useFormContext } from 'react-hook-form';

const PersonalDetails = () => {
  const { register } = useFormContext();

  return (
    <fieldset className="border p-4 mb-4">
      <legend className="text-xl font-semibold mb-2">Personal Details</legend>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="firstName">First Name</label>
        <input
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          type="text"
          id="firstName"
          {...register('user.firstName')}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="lastName">Last Name</label>
        <input
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          type="text"
          id="lastName"
          {...register('user.lastName')}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
        <input
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          type="email"
          id="email"
          {...register('user.email')}
        />
      </div>
    </fieldset>
  );
};

export default PersonalDetails;
