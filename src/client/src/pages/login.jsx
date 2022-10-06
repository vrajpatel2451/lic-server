import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../reducers/auth/authSlice';
import { login } from '../logic/features/auth/authAction';
import { toast } from 'react-toastify';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address format').required('Email is required'),
  password: Yup.string()
    .min(3, 'Password must be 3 characters at minimum')
    .required('Password is required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.auth);
  const nav = useNavigate();
  const handleSubmit = values => {
    login(dispatch, values);
  };

  if (state.isLoggedIn) {
    console.log('hehhee hhhh');
    console.log(state.isLoggedIn);
    nav('/');
  }

  if (state.status === 'error')
    toast.error(state.errorMessage || '', {
      position: toast.POSITION.TOP_RIGHT,
    });
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className=" bg-white w-96 p-4 rounded-lg">
        <h2 className="font-bold font-montserrat text-2xl text-orange text-center mb-4">Login</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors, isSubmitting, values }) =>
            !isSubmitting ? (
              <Form>
                <div className="flex my-2 flex-col">
                  <label htmlFor="email" className="text-pri-dark text-lg">
                    Email
                  </label>
                  <Field
                    className={`border p-1 focus:outline-none rounded border-pri-dark  ${
                      touched.email && errors.email ? 'is-invalid' : ''
                    }`}
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    autoComplete="off"
                  />
                  <ErrorMessage component="div" name="email" className="text-red" />
                </div>
                <div className="flex my-2 flex-col">
                  <label htmlFor="password" className="text-pri-dark text-lg">
                    Password
                  </label>
                  <Field
                    className={`border p-1 focus:outline-none rounded border-pri-dark ${
                      touched.password && errors.password ? 'is-invalid' : ''
                    }`}
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    autoComplete="off"
                  />
                  <ErrorMessage component="div" name="password" className="text-red" />
                </div>
                <button
                  className="bg-pri-dark hover:bg-pri transition-all w-full mt-2 text-white rounded px-4 py-2"
                  type="submit"
                >
                  Submit
                </button>
              </Form>
            ) : null
          }
        </Formik>
      </div>
    </div>
  );
};

export default Login;
