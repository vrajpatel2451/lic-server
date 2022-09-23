import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = values => {
    console.log(values);
   
      navigate('/');
    
    
  };

  console.log(window.location.href.split('/')[3], 'url');

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className=" bg-white w-96 p-4 rounded-lg">
        <h2 className="font-bold font-montserrat text-2xl text-orange text-center mb-4">Login</h2>
        <Formik initialValues={{ email: '', password: '' }} onSubmit={handleSubmit}>
          <Form>
            <div className="flex my-2 flex-col">
              <label htmlFor="email" className="text-pri-dark text-lg">
                Email
              </label>
              <Field
                className="border p-1 focus:outline-none rounded border-pri-dark"
                type="email"
                name="email"
              />
            </div>
            <div className="flex my-2 flex-col">
              <label htmlFor="password" className="text-pri-dark text-lg">
                Password
              </label>
              <Field
                className="border p-1 focus:outline-none rounded border-pri-dark"
                type="password"
                name="password"
              />
            </div>
            <button
              className="bg-pri-dark hover:bg-pri transition-all w-full mt-2 text-white rounded px-4 py-2"
              type="submit"
            >
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
