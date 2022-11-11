import React from 'react'
import { useState } from 'react';
import { MdClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { updateField, uploadDoc, uploadField } from '../logic/features/client/clientAction';

const ModelFields = ({open=true,setOpen,client}) => {

  const dispatch = useDispatch();
//   const state = useSelector(state => state.client);
  const [fieldData,setFieldData] = useState({
    label:'',
    type:'',
    value:'',
    update: new Date(),
  });

  const onChange = (tag,value) => {
    setFieldData((prev)=>({...prev,[tag]:value}));
  }

  const onSubmit = () => {
    console.log('call here');
    setFieldData({
        label:'',
    type:'',
    value:'',
    update: new Date(),
    });
    uploadField(dispatch,fieldData,client,setOpen);
  }

  return (
    <div className={`fixed z-20 bg-pri-light bg-opacity-50 backdrop-blur-md top-0 left-0 ${open?'flex':'hidden'} w-screen h-screen items-center justify-center`}>
        <div className={`p-10 min-w-[50%] min-h-[50%] relative flex flex-col bg-pri-dark items-center gap-4`}>
        <span className='absolute top-2 right-2 cursor-pointer' onClick={setOpen}><MdClose color='white'></MdClose></span>
            <h4 className='text-pri-light'>Upload Entry</h4>
            <div className='flex-1 w-full'></div>
            <label htmlFor="name" className='text-white w-full text-left'>Enter entry name</label>
            <input placeholder='Name Of Enrty' value={fieldData.label} className='w-full p-2 rounded-md' list="browsers" name="browser" onChange={(e)=>{onChange('label',e.target.value)}}></input>
            <datalist className='w-full p-2 rounded-md' name="type" id="browsers">
                <option value="null" disabled selected>Document name</option>
                <option value="pdf">Pdf</option>
                <option value="image">Image</option>
            </datalist>
            <label htmlFor="type" className='text-white w-full text-left'>Enter entry type</label>
            <select className='w-full p-2 rounded-md' name="type" id="type" onChange={(e)=>{onChange('type',e.target.value)}}>
                <option value="" disabled selected>Select type</option>
                <option value="string">Text</option>
                <option value="number">Number</option>
                <option value="date-time">Date</option>
            </select>
            <label htmlFor="value" className='text-white w-full text-left'>Enter entry value</label>
            <input placeholder='Enter your value here' type={fieldData.type==='date-time'?'date':fieldData.type==='number'?'number':'text'} value={fieldData.value} className='w-full p-2 rounded-md' id='value' name='value' onChange={(e)=>{onChange('value',e.target.value)}}/>
            {/* <input placeholder='Enter your value here' type={fieldData.type==='date-time'?'date':fieldData.type==='number'?'number':'text'} value={fieldData.value} className='w-full p-2 rounded-md' id='value' name='value' onChange={(e)=>{onChange('value',e.target.value)}}/> */}
            <label htmlFor="update" className='text-white w-full text-left'>Enter next update date</label>
            <input type={'date'} value={fieldData.update} className='w-full p-2 rounded-md' id='update' name='update' onChange={(e)=>{onChange('update',e.target.value)}}/>
            {/* <label htmlFor="image" className='bg-white p-4 rounded-md text-center w-full h-10 text-white cursor-pointer flex items-center justify-start'><p className=''>{docData.taskDoc? docData.taskDoc?.name:'Select file'}</p></label> */}
            <button onClick={onSubmit} type='button' value={fieldData.value} className='bg-pri rounded-md w-1/2 h-10 text-white'>Upload Entry</button>
            <div className='flex-1 w-full'></div>
        </div>
    </div>
  )
}

export const ModelUpdateFields = ({open=true,setOpen,field,value,update,label,setFieldData,fieldData}) => {

  const dispatch = useDispatch();
  const state = useSelector(state => state.client);
//   const [fieldData,setFieldData] = useState({
//     value:value,
//     update: update,
//   });

  const onChange = (tag,value) => {
    setFieldData((prev)=>({...prev,[tag]:value}));
  }

  const onSubmit = () => {
    console.log('call here');
    setFieldData({
        label:'',
        type:'',
    value:'',
    update: new Date(),
    });
    updateField(dispatch,fieldData,field,setOpen,state.clientDetails?.client?._id);
  }

  return (
    <div className={`fixed z-20 bg-pri-light bg-opacity-50 backdrop-blur-md top-0 left-0 ${open?'flex':'hidden'} w-screen h-screen items-center justify-center`}>
        <div className={`p-10 min-w-[50%] min-h-[50%] relative flex flex-col bg-pri-dark items-center gap-4`}>
        <span className='absolute top-2 right-2 cursor-pointer' onClick={setOpen}><MdClose color='white'></MdClose></span>
            <h4 className='text-pri-light'>Update Entry of {fieldData.label}</h4>
            <div className='flex-1 w-full'></div>
            <label htmlFor="value" className='text-white w-full text-left'>Enter Enrty here</label>
            <input placeholder='Enter your value here' type={fieldData.type==='date-time'?'date':fieldData.type==='number'?'number':'text'} value={fieldData.value} className='w-full p-2 rounded-md' id='value' name='value' onChange={(e)=>{onChange('value',e.target.value)}}/>
            <label htmlFor="update" className='text-white w-full text-left'>Enter next update date</label>
            <input placeholder='Enter update date' type={'date'} value={fieldData.update} className='w-full p-2 rounded-md' id='update' name='update' onChange={(e)=>{onChange('update',e.target.value)}}/>
            <button onClick={onSubmit} type='button' className='bg-pri rounded-md w-1/2 h-10 text-white'>Update Entry</button>
            <div className='flex-1 w-full'></div>
        </div>
    </div>
  )
}

export default ModelFields