import React from 'react'
import { useState } from 'react';
import { MdClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { uploadDoc } from '../logic/features/client/clientAction';

const ModelDocUpload = ({open=true,setOpen,client}) => {

  const dispatch = useDispatch();
  const state = useSelector(state => state.client);
  const [docData,setDocData] = useState({
    name:'',
    taskDoc:null,
    type:'',
    client
  });

  const onChange = (tag,value) => {
    setDocData((prev)=>({...prev,[tag]:value}));
  }

  const onSubmit = () => {
    console.log('call here');
    setDocData((prev)=>({
      ...prev,
      name:'',
      taskDoc:null,
      type:'',
    }));
    uploadDoc(dispatch,docData,client,setOpen);
  }

  return (
    <div className={`fixed z-20 bg-pri-light bg-opacity-50 backdrop-blur-md top-0 left-0 ${open?'flex':'hidden'} w-screen h-screen items-center justify-center`}>
        <div className={`p-10 min-w-[50%] min-h-[50%] relative flex flex-col bg-pri-dark items-center gap-4`}>
        <span className='absolute top-2 right-2 cursor-pointer' onClick={setOpen}><MdClose color='white'></MdClose></span>
            <h4 className='text-pri-light'>Upload Document</h4>
            <div className='flex-1 w-full'></div>
            <input placeholder='Document Name' className='w-full p-2 rounded-md' list="browsers" name="browser" onChange={(e)=>{onChange('name',e.target.value)}}></input>
            <datalist className='w-full p-2 rounded-md' name="type" id="browsers">
                <option value="null" disabled selected>Document name</option>
                <option value="pdf">Pdf</option>
                <option value="image">Image</option>
            </datalist>
            <select className='w-full p-2 rounded-md' name="type" id="type" onChange={(e)=>{onChange('type',e.target.value)}}>
                <option value="null" disabled selected>Select type</option>
                <option value="pdf">Pdf</option>
                <option value="image">Image</option>
            </select>
            <input type="file" className='hidden' id='image' name='image' onChange={(e)=>{onChange('taskDoc',e.target.files[0])}}/>
            <label htmlFor="image" className='bg-white p-4 rounded-md text-center w-full h-10 text-white cursor-pointer flex items-center justify-start'><p className=''>{docData.taskDoc? docData.taskDoc?.name:'Select file'}</p></label>
            <button onClick={onSubmit} type='button' className='bg-pri rounded-md w-1/2 h-10 text-white'>Upload</button>
            <div className='flex-1 w-full'></div>
        </div>
    </div>
  )
}

export default ModelDocUpload