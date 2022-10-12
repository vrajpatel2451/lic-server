import moment from 'moment';
import React, { useEffect } from 'react'
import { MdCode, MdDocumentScanner, MdEmail, MdFamilyRestroom, MdLocationPin, MdPhone, MdTextFields } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getClientDetails } from '../logic/features/client/clientAction';

const ClientDetails = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const state = useSelector(state=>state.client);
    useEffect(() => {
        getClientDetails(dispatch,params.id);
    }, []);
    
      console.log(state?.clientDetails);
  return (
    <div className='w-full flex flex-col items-start gap-8'>
        {/* <h1 className='mb-4'>Client Details</h1> */}
            <h1>{state?.clientDetails?.client?.firstName} {state?.clientDetails?.client?.lastName}</h1>
            <h4 className='w-full flex items-center gap-2'><MdPhone/> <span>+91-{state?.clientDetails?.client?.contact?.phone}</span></h4>
            <h4 className='w-full flex items-center gap-2'><MdFamilyRestroom/> <span>#{state?.clientDetails?.client?.familyCode}</span></h4>
            <h4 className='w-full flex items-center gap-2'><MdEmail/> <span>{state?.clientDetails?.client?.contact?.email}</span></h4>
            <h4 className='w-full flex items-center gap-2'><MdLocationPin/> <span className='flex-1'>{state?.clientDetails?.client?.line1}, {state?.clientDetails?.client?.line2}, {state?.clientDetails?.client?.area}, {state?.clientDetails?.client?.city}, {state?.clientDetails?.client?.state}, {state?.clientDetails?.client?.pin}</span></h4>
            <h3 className='w-full flex items-center gap-2'><MdTextFields/> <span className='flex-1'>Fields</span></h3>
        <div className="flex flex-col items-start gap-1 w-full">
            {
                state?.clientDetails?.client?.fields?.length>0?
                state?.clientDetails?.client?.fields?.map((field,i)=><div key={i} className="flex items-center gap-1 w-full lg:w-[60%]">
                   <p className='bg-pri-light text-left p-2 rounded-md'>{i+1}</p> 
                   <p className='bg-pri-light text-left p-2 rounded-md flex-1'>{field?.label}</p> 
                   <p className='bg-pri-light text-left p-2 rounded-md flex-1'>{field?.type==="date-time"? moment(field?.value).format("DD/MM/YYYY") :field?.value}</p> 
                </div>):
                   <p className='bg-pri-light text-left p-2 rounded-md flex-1'>No Extrafields Yet</p> 
            }
        </div>
            <h3 className='w-full flex items-center gap-2'><MdDocumentScanner/> <span className='flex-1'>Family Documents</span></h3>
        <div className="flex items-stretch gap-4 flex-wrap w-full">
            {
                state?.clientDetails?.related?.map(
                    (e,i)=><div key={i} className="flex-1 min-w-[30%] bg-pri-light p-4 rounded-lg flex flex-col items-start gap-4">
                        <h3>{e?.firstName}</h3>

                        <div className='w-full flex flex-col items-start gap-2'>
                        {
                            e?.documents?.length>0?
                            e?.documents?.map(
                                (doc,i)=><p className='bg-pri-dark text-white w-full text-left p-2 rounded-md'>{doc?.name}</p>
                                )
                                :<p className='bg-pri-dark text-white w-full text-left p-2 rounded-md'>No Documents Yet</p>
                            }
                            </div>
                        {/* <h3>{e?.documents?.length}</h3> */}
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default ClientDetails