import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { MdRefresh } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../components/customTable';
import { getBranches } from '../logic/features/branch/branchAction';
import { getDepartments } from '../logic/features/department/departmentAction';
import { getStaff, getStaffByBranchOrDepartment } from '../logic/features/staff/staffAction';
import SearchFilter from '../utils/models/inputClassFilter';
import FilterSelect from '../utils/models/staffFilelters';

const Staff = () => {
  const [departmentList, setdepartment] = useState({
    department:'',
    branch:''
  })
  const dispatch = useDispatch();
  const stateStaff = useSelector(state => state?.staff);
  const stateBranch = useSelector(state => state?.branch);
  const stateDepartment = useSelector(state => state?.department);
  // console.log(data, 'client data');
  useEffect(() => {
    getBranches(dispatch);
    getDepartments(dispatch);
    getStaff(dispatch);
  }, []);

  const heads = useMemo(
    () => ({
      ID: '_id',
      'First Name': 'firstName',
      'Last Name': 'lastName',
      Departments: 'departments',
      Branch: 'branch',
      Action: 'action',
    }),
    [],
  );


  const filterHeadByBranch = async(e) =>{
    setdepartment(prev=>({...prev,branch:e.target.value}))
    await getStaffByBranchOrDepartment(dispatch,departmentList.department,e.target.value);
  }
  const filterHeadByDept = async(e) =>{
    setdepartment(prev=>({...prev,department:e.target.value}))
    await getStaffByBranchOrDepartment(dispatch,e.target.value,departmentList.branch);
  }

  return (
    <div className="flex w-full py-10 items-start h-full">
      <div className="w-[20%] h-full"></div>
      <div className="flex-1 flex flex-col gap-4 p-10 h-full"><div className="w-full flex items-center justify-between">
        <h4 className=" text-2xl font-light">{'Staff'}</h4>
        {/* <button className="w-20 h-10 bg-pri border-none flex items-center justify-center rounded-md">
          <p className="font-bold text-lg text-white">+</p>
        </button> */}
      </div>
      <div className='w-full flex items-stretch gap-4'>
        <select onChange={filterHeadByBranch} className="border-none outline-none px-4 py-2 rounded-md">
          <option selected disabled>Select Branch</option>
          {
            stateBranch?.branches?.map(
              (e,i)=><option key={i} value={e?._id}>{e?.name}</option>
            )
          }
        </select>
        <select onChange={filterHeadByDept} className="border-none outline-none px-4 py-2 rounded-md">
          <option selected disabled>Select Department</option>
          {
            stateDepartment?.departments?.map(
              (e,i)=><option key={i} value={e?._id}>{e?.name}</option>
            )
          }
        </select>
        {/* <input onChange={onChangeSearch} placeholder='Search client' className="border-none outline-none px-4 py-2 rounded-md"/> */}
        <button onClick={()=>{getStaff(dispatch)}} className="w-20 h-10 bg-pri border-none flex items-center justify-center rounded-md">
        {/* <button onClick={()=>{onChangeSearch('hshsh')}} className="w-20 h-10 bg-pri border-none flex items-center justify-center rounded-md"> */}
          <MdRefresh color='white'/>
        </button>
        {/* <button></button> */}
      </div>
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
            new SearchFilter('Search Staff', value => {
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
