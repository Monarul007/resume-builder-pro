import React from 'react';
import { useFormContext } from 'react-hook-form';

const Languages = () => {
    const { register } = useFormContext();

    return (
        <fieldset>
            <legend>Languages</legend>
            <label>
                Language:
                <input type="text" {...register('language')} />
            </label>
            <label>
                Proficiency:
                <input type="text" {...register('proficiency')} />
            </label>
        </fieldset>
    );
};

export default Languages;
