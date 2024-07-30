import React from 'react';
import { useFormContext } from 'react-hook-form';

const References = () => {
    const { register } = useFormContext();

    return (
        <fieldset>
            <legend>References</legend>
            <label>
                Name:
                <input type="text" {...register('refName')} />
            </label>
            <label>
                Contact:
                <input type="text" {...register('refContact')} />
            </label>
        </fieldset>
    );
};

export default References;
