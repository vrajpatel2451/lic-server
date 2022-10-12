import React, { useEffect } from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../components/customTable';
import { getStaff } from '../logic/features/staff/staffAction';
import SearchFilter from '../utils/models/inputClassFilter';
import FilterSelect from '../utils/models/staffFilelters';

const Staff = () => {
  const dispatch = useDispatch();
  const stateStaff = useSelector(state => state?.staff);
  // console.log(data, 'client data');
  useEffect(() => {
    getStaff(dispatch);
  }, []);

  const heads = useMemo(
    () => ({
      ID: '_id',
      'First Name': 'firstName',
      'Last Name': 'lastName',
      Departments: 'departments',
      Branch: 'branch',
    }),
    [],
  );

  return (
    <div className="flex w-full py-10 items-start h-full">
      <div className="w-[20%] h-full"></div>
      <div className="flex-1 p-10 h-full">
        <CustomTable
          heads={heads}
          data={stateStaff?.staff}
          title="Staff"
          loading={stateStaff?.status === 'loading' || stateStaff?.status === 'initial'}
          select1={
            new FilterSelect(
              'Department',
              'department',
              'department',
              val => {
                console.log('dept', val);
              },
              [],
            )
          }
          select2={
            new FilterSelect(
              'Branch',
              'branch',
              'branch',
              val => {
                console.log('branch', val);
              },
              [],
            )
          }
          inputClass={
            new SearchFilter('Search Clients', value => {
              console.log('after', value);
            })
          }
        />
        {/* <ClientTable dataType={'client'} /> */}
      </div>
    </div>
  );
};

export default Staff;
