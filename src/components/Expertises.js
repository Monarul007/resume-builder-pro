import React from 'react';
import { useFormContext } from 'react-hook-form';

const Expertises = () => {
    const { register } = useFormContext();

    return (
        <fieldset>
            <legend>Expertises</legend>
            <label>
                Skill:
                <input type="text" {...register('skill')} />
            </label>
            <label>
                Level:
                <input type="text" {...register('level')} />
            </label>
        </fieldset>
    );
};

export default Expertises;
