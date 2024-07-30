import React from 'react';
import { useFormContext } from 'react-hook-form';

const Education = () => {
    const { register } = useFormContext();

    return (
        <fieldset>
            <legend>Education</legend>
            <label>
                School:
                <input type="text" {...register('school')} />
            </label>
            <label>
                Degree:
                <input type="text" {...register('degree')} />
            </label>
            <label>
                Year of Graduation:
                <input type="text" {...register('graduationYear')} />
            </label>
        </fieldset>
    );
};

export default Education;
