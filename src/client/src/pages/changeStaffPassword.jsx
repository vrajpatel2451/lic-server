import React from 'react'
import { MdRefresh } from 'react-icons/md'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { changePassword } from '../logic/features/auth/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const LoginSchema = Yup.object({
    newPassword: Yup.string()
      .min(6, 'Password must be 6 characters at minimum')
      .required('New Password is required'),
    cNewPassword:  Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
});


const ChangeStaffPassword = () => {
    const dispatch = useDispatch();


    const handleSubmit = (values,submitProps) => {
            // const {cNewPassword,...rest} = values;
            const id  = '';
            changePassword(dispatch,{...values,id});
            submitProps.setSubmitting(false);
            submitProps.resetForm();
    };

  const state = useSelector(state => state.auth);

    if (state.status === 'error'){
        toast.error(state.errorMessage || '', {
          position: toast.POSITION.TOP_RIGHT,
        });
    }

  return (
  <div className='flex w-full py-10 items-start h-full'>
  <div className='w-[20%] h-full'></div>
  <div className='flex-1 flex flex-col gap-4 p-10 h-full'>
    <h1>Accounts</h1>
    <div></div>
    <div></div>
    <h4>Change staff password</h4>
    
          <Formik
          initialValues={{ newPassword: '', cNewPassword:''}}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors, isSubmitting, values }) =>
            !isSubmitting ? (
              <Form>
                <div className="flex my-2 flex-col w-[20rem]">
                  <label htmlFor="newPassword" className="text-pri-dark text-lg">
                    New password
                  </label>
                  <Field
                    className={`border p-1 focus:outline-none rounded border-pri-dark ${
                      touched.newPassword && errors.newPassword ? 'is-invalid' : ''
                    }`}
                    type="password"
                    name="newPasswrord"
                    id="newPasswrord"
                    placeholder="Enter new password"
                    autoComplete="off"
                  />
                  <ErrorMessage component="div" name="newPassword" className="text-red" />
                </div>
                <div className="flex my-2 flex-col w-[20rem]">
                  <label htmlFor="newPassword" className="text-pri-dark text-lg">
                    Confirm new password
                  </label>
                  <Field
                    className={`border p-1 focus:outline-none rounded border-pri-dark ${
                      touched.cNewPassword && errors.cNewPassword ? 'is-invalid' : ''
                    }`}
                    type="password"
                    name="cNewPasswrord"
                    id="cNewPasswrord"
                    placeholder="Enter confirm password"
                    autoComplete="off"
                  />
                  <ErrorMessage component="div" name="cNewPassword" className="text-red" />
                </div>
                <button
                  className="bg-pri-dark w-[20rem] hover:bg-pri transition-all mt-2 text-white rounded px-4 py-2"
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
  )
}

export default ChangeStaffPassword