import { Field, Form, Formik } from 'formik';
import React from 'react';

const Searchbar = () => {
  const submitAction = values => {
    console.log(values);
  };
  return (
    <Formik onSubmit={submitAction} initialValues={{ searchInput: '' }}>
      {({ values, handleChange, submitForm }) => (
        <Form className="w-full max-w-2xl flex justify-center items-center">
          <Field
            type="text"
            name="searchInput"
            placeholder="Search"
            value={values.searchInput}
            onChange={e => {
              handleChange(e);
              submitForm();
            }}
            className="bg-lightGray focus:outline-none py-2 px-4 rounded-full w-full max-w-xl"
          />
        </Form>
      )}
    </Formik>
  );
};

export default Searchbar;
