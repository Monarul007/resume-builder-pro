import React from 'react';
import { useFormContext } from 'react-hook-form';

const EmploymentHistory = () => {
    const { register } = useFormContext();

    return (
        <fieldset>
            <legend>Employment History</legend>
            <label>
                Job Title:
                <input type="text" {...register('jobTitle')} />
            </label>
            <label>
                Company:
                <input type="text" {...register('company')} />
            </label>
            <label>
                Duration:
                <input type="text" {...register('duration')} />
            </label>
        </fieldset>
    );
};

export default EmploymentHistory;
