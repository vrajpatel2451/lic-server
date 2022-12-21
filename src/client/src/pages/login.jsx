import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../logic/features/auth/authAction';
import { toast } from 'react-toastify';
import { useMemo } from 'react';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address format').required('Email is required'),
  password: Yup.string()
    .min(3, 'Password must be 3 characters at minimum')
    .required('Password is required'),
});


const Login = () => {
  const getLocation = navigator.geolocation;
  const dispatch = useDispatch();

  const state = useSelector(state => state.auth);
  // const status = useMemo(()=>state.status,[]);
  const handleSubmit = (values,submitProps) => {
    if(!getLocation){
      console.log('location not available');
    }else{
      console.log('location',getLocation);
      let lat = 27.3333;
      let lon = 73.45555;
      const location = getLocation.getCurrentPosition(
        async(pos)=>{
          console.log('here pos',pos.coords.latitude);
          console.log('here pos',pos.coords.longitude);
          lat =  pos.coords.latitude;
          lon =  pos.coords.longitude;
          await login(dispatch,{...values,lat:lat,long:lon});
          submitProps.setSubmitting(true);
          submitProps.resetForm();
        },
        (err)=>{
          console.log('here err',err);
          submitProps.setSubmitting(true);
          submitProps.resetForm();
          toast.error(err.message || 'Something went wrong', {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        );
        console.log('hhhhaa login here start');
        
      // navigator.permissions
      //   .query({ name: "geolocation" })
      //   .then(function (result) {
      //     if (result.state === "granted") {
      //       console.log(result.state);
      //       //If granted then you can directly call your function here
      //     } else if (result.state === "prompt") {
      //       console.log('which state',result.state);
      //       // login(dispatch, values);
      //     } else if (result.state === "denied") {
      //       alert('please provide')
      //       //If denied then you have to show instructions to enable location
      //     }
      //     result.onchange = function () {
      //       console.log(result.state);
      //     };
      //   });
    }
  };


  // if (status === 'error'){
    
  // }

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
                  className="bg-pri-dark hover:bg-pri transition-all disabled:bg-pri-light w-full mt-2 text-white rounded px-4 py-2"
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

export default Login;
