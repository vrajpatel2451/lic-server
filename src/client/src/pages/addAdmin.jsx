import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { createAdmin } from '../logic/features/staff/staffAction';

const phoneRegExp = /^[0-9]+$/;

const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Email is not valid').required('Email is required'),
  password: Yup.string().required('Password is required'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Phone Number is not valid')
    .required('Phone Number is required'),
  userPhoto: Yup.mixed().required('User Photo is required'),
  line1: Yup.string().required('Line 1 is required'),
  line2: Yup.string().required('Line 2 is required'),
  area: Yup.string().required('Area is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  pin: Yup.number().required('Pin is required'),
});

const AddAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values, submitProps) => {
    const formData = new FormData();

    // const a = {};

    //   values.forEach((key, val) => {
    //     console.log(key);
    //     console.log(val);
    //   });

    for (const key in values) {
      // if (Object.hasOwnProperty.call(object, key)) {
      const element = values[key];
      formData.append(key, element);
      // console.log(element);
      // }
    }

    //   for (const iterator of formData.entries()) {
    //     console.log(iterator);
    //   }

    createAdmin(dispatch, formData, navigate);
    submitProps.setSubmitting(true);
          submitProps.resetForm();
    console.log(formData.entries, 'values again');
  };

  return (
    <div className="flex w-full py-10 items-start h-full">
      <div className="w-[20%] h-full"></div>
      <div className="flex-1 flex flex-col gap-4 p-10 h-full">
        <h1>Admins</h1>
        <div></div>
        <div></div>
        <h4>Add New Admin</h4>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phone: '',
            userPhoto: '',
            line1: '',
            line2: '',
            area: '',
            city: '',
            state: '',
            pin: '',
          }}
          //   validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors, isSubmitting, setFieldValue }) =>
            
              <Form>
                <div className="flex my-2 flex-col w-[20rem]">
                  <label htmlFor="firstName" className="text-pri-dark text-lg">
                    First Name
                  </label>
                  <Field
                    className={`border p-1 focus:outline-none rounded border-pri-dark ${
                      touched.firstName && errors.firstName ? 'is-invalid' : ''
                    }`}
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Enter First Name"
                  />
                  <ErrorMessage component="div" name="firstName" className="text-red" />
                </div>

                <div className="flex my-2 flex-col w-[20rem]">
                  <label htmlFor="lastName" className="text-pri-dark text-lg">
                    Last Name
                  </label>
                  <Field
                    className={`border p-1 focus:outline-none rounded border-pri-dark ${
                      touched.lastName && errors.lastName ? 'is-invalid' : ''
                    }`}
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Enter Last Name"
                  />
                  <ErrorMessage component="div" name="lastName" className="text-red" />
                </div>

                <div className="flex my-2 flex-col w-[20rem]">
                  <label htmlFor="email" className="text-pri-dark text-lg">
                    Email
                  </label>
                  <Field
                    className={`border p-1 focus:outline-none rounded border-pri-dark ${
                      touched.email && errors.email ? 'is-invalid' : ''
                    }`}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Email"
                  />
                  <ErrorMessage component="div" name="email" className="text-red" />
                </div>

                <div className="flex my-2 flex-col w-[20rem]">
                  <label htmlFor="password" className="text-pri-dark text-lg">
                    Password
                  </label>
                  <Field
                    className={`border p-1 focus:outline-none rounded border-pri-dark ${
                      touched.password && errors.password ? 'is-invalid' : ''
                    }`}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                  />
                  <ErrorMessage component="div" name="password" className="text-red" />
                </div>

                <div className="flex my-2 flex-col w-[20rem]">
                  <label htmlFor="phone" className="text-pri-dark text-lg">
                    Phone Number
                  </label>
                  <Field
                    className={`border p-1 focus:outline-none rounded border-pri-dark ${
                      touched.phone && errors.phone ? 'is-invalid' : ''
                    }`}
                    type="number"
                    name="phone"
                    id="phone"
                    placeholder="Enter Phone Number"
                  />
                  <ErrorMessage component="div" name="phone" className="text-red" />
                </div>

                <div className="flex my-2 flex-col w-[20rem]">
                  <label htmlFor="userPhoto" className="text-pri-dark text-lg">
                    Profile Photo
                  </label>
                  <input
                    className={`border p-1 focus:outline-none rounded border-pri-dark ${
                      touched.userPhoto && errors.userPhoto ? 'is-invalid' : ''
                    }`}
                    type="file"
                    name="userPhoto"
                    id="userPhoto"
                    placeholder="Enter Profile Photo"
                    onChange={e => setFieldValue('userPhoto', e.target.files[0])}
                  />
                  <ErrorMessage component="div" name="userPhoto" className="text-red" />
                </div>

                <div className="flex my-2 flex-col w-[20rem]">
                  <label htmlFor="line1" className="text-pri-dark text-lg">
                    Line 1
                  </label>
                  <Field
                    className={`border p-1 focus:outline-none rounded border-pri-dark ${
                      touched.line1 && errors.line1 ? 'is-invalid' : ''
                    }`}
                    type="text"
                    name="line1"
                    id="line1"
                    placeholder="Enter Line 1"
                  />
                  <ErrorMessage component="div" name="line1" className="text-red" />
                </div>

                <div className="flex my-2 flex-col w-[20rem]">
                  <label htmlFor="line2" className="text-pri-dark text-lg">
                    Line 2
                  </label>
                  <Field
                    className={`border p-1 focus:outline-none rounded border-pri-dark ${
                      touched.line2 && errors.line2 ? 'is-invalid' : ''
                    }`}
                    type="text"
                    name="line2"
                    id="line2"
                    placeholder="Enter Line 2"
                  />
                  <ErrorMessage component="div" name="line2" className="text-red" />
                </div>

                <div className="flex my-2 flex-col w-[20rem]">
                  <label htmlFor="area" className="text-pri-dark text-lg">
                    Area
                  </label>
                  <Field
                    className={`border p-1 focus:outline-none rounded border-pri-dark ${
                      touched.area && errors.area ? 'is-invalid' : ''
                    }`}
                    type="text"
                    name="area"
                    id="area"
                    placeholder="Enter Area"
                  />
                  <ErrorMessage component="div" name="area" className="text-red" />
                </div>

                <div className="flex my-2 flex-col w-[20rem]">
                  <label htmlFor="city" className="text-pri-dark text-lg">
                    City
                  </label>
                  <Field
                    className={`border p-1 focus:outline-none rounded border-pri-dark ${
                      touched.city && errors.city ? 'is-invalid' : ''
                    }`}
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Enter City"
                  />
                  <ErrorMessage component="div" name="city" className="text-red" />
                </div>

                <div className="flex my-2 flex-col w-[20rem]">
                  <label htmlFor="state" className="text-pri-dark text-lg">
                    State
                  </label>
                  <Field
                    className={`border p-1 focus:outline-none rounded border-pri-dark ${
                      touched.state && errors.state ? 'is-invalid' : ''
                    }`}
                    type="text"
                    name="state"
                    id="state"
                    placeholder="Enter State"
                  />
                  <ErrorMessage component="div" name="state" className="text-red" />
                </div>

                <div className="flex my-2 flex-col w-[20rem]">
                  <label htmlFor="pin" className="text-pri-dark text-lg">
                    Pin
                  </label>
                  <Field
                    className={`border p-1 focus:outline-none rounded border-pri-dark ${
                      touched.pin && errors.pin ? 'is-invalid' : ''
                    }`}
                    type="number"
                    name="pin"
                    id="pin"
                    placeholder="Enter Pin"
                  />
                  <ErrorMessage component="div" name="pin" className="text-red" />
                </div>

                <button
                  className="bg-pri-dark w-[20rem] hover:bg-pri transition-all mt-2 text-white rounded px-4 py-2"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </Form>
           
          }
        </Formik>
      </div>
    </div>
  );
};

export default AddAdmin;
