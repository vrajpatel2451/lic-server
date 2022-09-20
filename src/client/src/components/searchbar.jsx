import { Field, Form, Formik } from 'formik';
import React from 'react';

const Searchbar = () => {
  const submitAction = values => {
    console.log(values);
  };
  return (
    <Formik onSubmit={submitAction} initialValues={{ searchInput: '' }}>
      {({ values, handleChange, submitForm }) => (
        <Form>
          <Field
            type="text"
            name="searchInput"
            placeholder="Search"
            value={values.searchInput}
            onChange={e => {
              handleChange(e);
              submitForm();
            }}
            className="bg-[transparent] focus:outline-none py-1 px-4 border rounded-full"
          />
        </Form>
      )}
    </Formik>
  );
};

export default Searchbar;
