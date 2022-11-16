import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
    MdClose,
  MdCode,
  MdDocumentScanner,
  MdEdit,
  MdEmail,
  MdFamilyRestroom,
  MdLocationPin,
  MdPhone,
  MdTextFields,
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ModelDocUpload from '../components/modelDocUpload';
import ModelFields, { ModelUpdateFields } from '../components/modelFields';
import { getClientDetails, updateDoc } from '../logic/features/client/clientAction';

const ClientDetails = () => {
    const [selected, setSelected] = useState('');
    const [openModel, setOpenModel] = useState(false);
    const [openFiModel, setOpenFiModel] = useState(null);
    const [openFieldModel, setOpenFieldModel] = useState(false);
    const togglemodel = ()=>{
        setOpenModel(null);
    }
    const togglemodelFi = ()=>{
        setOpenFiModel(null);
    }
    const togglemodelfield = ()=>{
        setOpenFieldModel(prev=>!prev);
    }
  const params = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [fieldData,setFieldData] = useState({
    value:'',
    update: '',
  });
  const state = useSelector(state => state.client);
  useEffect(() => {
    console.log('jjajajjaja');
    getClientDetails(dispatch, params.id);
  }, []);


  const onUpload = async(e,id) => {
    await updateDoc(dispatch,{taskDoc:e.target.files[0],document:id},()=>{
      setSelected('');
    },state?.clientDetails?.client?._id);
  }


    console.log('hu chu',selected);
  return (
    <div className="flex w-full py-10 items-start h-full">
      <div className="w-[20%] h-full"></div>
      <ModelDocUpload open={openModel} setOpen={togglemodel} client={openModel} />
      <ModelFields open={openFieldModel} setOpen={togglemodelfield} client={state?.clientDetails?.client?._id} />
      <ModelUpdateFields open={openFiModel} setOpen={togglemodelFi} field={openFiModel} fieldData={fieldData} setFieldData={setFieldData}/>
      <div className="flex-1 p-10 pb-20 h-full flex flex-col items-start gap-8">
        {/* <h1 className='mb-4'>Client Details</h1> */}
        <h1>
          {state?.clientDetails?.client?.firstName} {state?.clientDetails?.client?.lastName}
        </h1>
        <h4 className="w-full flex items-center gap-2">
          <MdFamilyRestroom /> <span>#{state?.clientDetails?.client?.familyCode}</span>
        </h4>
        <h4 className="w-full flex items-center gap-2">
          <span>Reference :</span> <span>{state?.clientDetails?.client?.reference?state?.clientDetails?.client?.reference:'No reference'}</span>
        </h4>
        <h4 className="w-full flex items-center gap-2">
          <span>Status :</span> <span>{state?.clientDetails?.client?.status}</span>
        </h4>

        <div className='w-full flex gap-4 items-center flex-wrap'>
        <div className='flex-1 flex items-start flex-col'>
        <label htmlFor="">Email</label>
        <input className='w-full px-4 py-2 rounded-md' type="text" value={state?.clientDetails?.client?.email} />
        </div>
        <div className='flex-1 flex items-start flex-col'>
        <label htmlFor="">Phone</label>
        <input className='w-full px-4 py-2 rounded-md' type="text" value={state?.clientDetails?.client?.phone} />
        </div>
        </div>

        <div className='w-full flex gap-4 items-center flex-wrap'>
        <div className='flex-1 flex items-start flex-col'>
        <label htmlFor="">Gender</label>
        <input className='w-full px-4 py-2 rounded-md' type="text" value={state?.clientDetails?.client?.gender} />
        </div>
        <div className='flex-1 flex items-start flex-col'>
        <label htmlFor="">Marrital Status</label>
        <input className='w-full px-4 py-2 rounded-md' type="text" value={state?.clientDetails?.client?.marritalStatus} />
        </div>
        </div>

        <div className='w-full flex gap-4 items-center flex-wrap'>
        <div className='flex-1 flex items-start flex-col'>
        <label htmlFor="">Mother Name</label>
        <input className='w-full px-4 py-2 rounded-md' type="text" value={state?.clientDetails?.client?.motherName} />
        </div>
        <div className='flex-1 flex items-start flex-col'>
        <label htmlFor="">Father Name</label>
        <input className='w-full px-4 py-2 rounded-md' type="text" value={state?.clientDetails?.client?.fatherName} />
        </div>
        <div className='flex-1 flex items-start flex-col'>
        <label htmlFor="">Spouse</label>
        <input className='w-full px-4 py-2 rounded-md' type="text" value={state?.clientDetails?.client?.spouse} />
        </div>
        </div>

        <div className='w-full flex gap-4 items-center flex-wrap'>
        <div className='flex-1 flex items-start flex-col'>
        <label htmlFor="">Children</label>
        <input className='w-full px-4 py-2 rounded-md' type="text" value={state?.clientDetails?.client?.children} />
        </div>
        <div className='flex-1 flex items-start flex-col'>
        <label htmlFor="">Meeting Date</label>
        <input className='w-full px-4 py-2 rounded-md' type="text" value={state?.clientDetails?.client?.meetingDate} />
        </div>
        </div>

        <div className='w-full flex gap-4 items-center flex-wrap'>
        <div className='flex-1 flex items-start flex-col'>
        <label htmlFor="">Birth Date</label>
        <input className='w-full px-4 py-2 rounded-md' type="text" value={state?.clientDetails?.client?.birthDate} />
        </div>
        <div className='flex-1 flex items-start flex-col'>
        <label htmlFor="">Place Of Birth</label>
        <input className='w-full px-4 py-2 rounded-md' type="text" value={state?.clientDetails?.client?.birthPlace} />
        </div>
        </div>
        
        <div className='w-full flex gap-4 items-center flex-wrap'>
        <div className='flex-1 flex items-start flex-col'>
        <label htmlFor="">Occupation</label>
        <input className='w-full px-4 py-2 rounded-md' type="text" value={state?.clientDetails?.client?.occupation} />
        </div>
        <div className='flex-1 flex items-start flex-col'>
        <label htmlFor="">Income Slab</label>
        <input className='w-full px-4 py-2 rounded-md' type="text" value={state?.clientDetails?.client?.income} />
        </div>
        </div>

        <div className='w-full flex gap-4 items-center flex-wrap'>
        <div className='flex-1 flex items-start flex-col'>
        <label htmlFor="">Nominee Name</label>
        <input className='w-full px-4 py-2 rounded-md' type="text" value={state?.clientDetails?.client?.nomineeName} />
        </div>
        <div className='flex-1 flex items-start flex-col'>
        <label htmlFor="">Nominee Relation</label>
        <input className='w-full px-4 py-2 rounded-md' type="text" value={state?.clientDetails?.client?.nomineeRelation} />
        </div>
        </div>


        <h3 className="w-full flex items-center gap-2">
          <MdTextFields /> <span className="flex-1">Entries</span><span className='w-20 h-10 bg-pri-light text-pri-dark cursor-pointer flex items-center justify-center rounded-sm' onClick={togglemodelfield}><p>+</p></span>
        </h3>
        <div className="flex flex-col items-start gap-1 w-full">
          {state?.clientDetails?.client?.fields?.length > 0 ? (
            state?.clientDetails?.client?.fields?.map((field, i) => (
              <div key={i} className="flex items-stretch gap-1 w-full lg:w-[60%]">
                <p className="bg-pri-light text-left p-2 rounded-md">{i + 1}</p>
                <p className="bg-pri-light text-left p-2 rounded-md flex-1">{field?.label}</p>
                <p className="bg-pri-light text-left p-2 rounded-md flex-1">
                  {field?.type === 'date-time'
                    ? moment(field?.value).format('DD/MM/YYYY')
                    : field?.value}
                </p>
                <p className="bg-pri-light text-left p-2 rounded-md flex-1">
                   next update at&nbsp; 
                   {
                     moment(field?.update).format('DD/MM/YYYY')
                   }
                </p>
                <button onClick={()=>{setOpenFiModel(field._id); setFieldData({value:field.value,update:field.update,type:field.type,label:field.label})}} className='w-20 rounded-sm flex items-center justify-center bg-pri-light'><MdEdit/></button>
                {/* <input type="text" value={field.value} onChange={} /> */}
              </div>
            ))
          ) : (
            <p className="bg-pri-light text-left p-2 rounded-md flex-1">No Extrafields Yet</p>
          )}
        </div>
        <h3 className="w-full flex items-center gap-2">
          <MdDocumentScanner /> <span className="flex-1">Family Documents</span>
          {/* <button onClick={togglemodel} className='w-20 h-10 bg-pri-light rounded-sm'><p>+</p></button> */}
        </h3>
        <div className="flex items-stretch gap-4 flex-wrap w-full">
          {state?.clientDetails?.related?.map((e, i) => (
            <div
              key={i}
              className="flex-1 min-w-[30%] bg-pri-light p-4 rounded-lg flex flex-col items-start gap-4"
            >
              <div className='flex items-center w-full justify-between'>
              <h3>{e?.firstName}</h3>
              <span onClick={()=>{setOpenModel(e?._id)}} className='text-pri block font-bold text-lg cursor-pointer'>+</span>
              </div>

              <div className="w-full flex items-start flex-wrap gap-2">
                {e?.documents?.length > 0 ? (
                  e?.documents?.map((doc, i) =>
                    doc?.image ? (
                        <p className="bg-pri-dark text-white text-left p-2 rounded-md cursor-pointer relative">
                          {selected===doc._id?
                          <div className="absolute top-4 left-0 bg-pri-light flex flex-col items-stretch gap-4 p-6 w-auto border ">
                            <span className='absolute top-2 right-2 cursor-pointer' onClick={()=>{setSelected(''); console.log('called');}}><MdClose color='black'></MdClose></span>
                            <label className='bg-orange text-white p-2 rounded-md cursor-pointer w-40' htmlFor='document-client'>Upload new</label>
                            <input type={'file'} id={'document-client'} name={'document-client'} onChange={(e)=>onUpload(e,doc?._id)} className='hidden'></input>
                            <a href={`http://localhost:3000/static/${doc?.image}`} target="__blank">
                            <button className='bg-pri-dark text-white p-2 rounded-md cursor-pointer w-40'>See Image</button>
                      </a>
                            </div>:null}
                         <span onClick={()=>setSelected(doc?._id)}> {doc?.name}</span>
                        </p>
                    ) : (
                      <>
                      <label htmlFor='file-upload' className="bg-pri-dark text-white text-left p-2 rounded-md cursor-not-allowed">
                        {doc?.name}
                      </label>
                      <input type={'file'} id={'file-upload'} name={'file-upload'} onChange={(e)=>onUpload(e,doc?._id)} className={'hidden'}/>
                      </>
                    ),
                  )
                ) : (
                  <p className="bg-pri-dark text-white w-full text-left p-2 rounded-md">
                    No Documents Yet
                  </p>
                )}
              </div>
              {/* <h3>{e?.documents?.length}</h3> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
