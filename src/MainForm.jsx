// MainForm.jsx
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import PersonalInformation from './PersonalInformation';
import CustomerInformation from './CustomerInformation';
import AddressInformation from './AddressInformation';

const MainForm = () => {
  const methods = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <PersonalInformation />
        <CustomerInformation />
        <AddressInformation />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

export default MainForm;