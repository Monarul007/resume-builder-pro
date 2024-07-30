// components/ProfessionalSummary.js
import React from 'react';
import { useFormContext } from 'react-hook-form';

const ProfessionalSummary = () => {
  const { register } = useFormContext();

  return (
    <fieldset className="border p-4 mb-4">
      <legend className="text-xl font-semibold mb-2">Professional Summary</legend>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700" htmlFor="summary">Summary</label>
        <textarea
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          id="summary"
          {...register('summary')}
        />
      </div>
    </fieldset>
  );
};

export default ProfessionalSummary;
