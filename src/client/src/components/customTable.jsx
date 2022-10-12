import React from 'react'
import { MdEdit } from 'react-icons/md'

const CustomTable = ({heads={},data=[],title='',loading=true}) => {
  return (
    <div className='w-full h-full'>
        <h4 className='mb-4 text-2xl font-light'>{title}</h4>
        <table className='w-full h-full flex flex-col'>
            <thead className='w-full flex items-center bg-pri-light'>
                {
                    
                    Object.keys(heads).map((key,val)=><th className={`flex-1 p-2 rounded-sm text-left border-[0.5px] border-white border-collapse ${heads[key]==="_id"?"min-w-[30%]":"min-w-[100px]"}`} key={key}>{key}</th>)
                    // heads?.map((key,val)=><p>{key}</p>)
                }
            </thead>
            <tbody className='flex-1 overflow-y-scroll'>
                {
                    !loading?
                    data?.map((e,i)=><tr key={i} className={`bg-white flex w-full items-center`}>
                        {
                            Object.keys(heads).map((key,val)=><td key={key} className={`flex-1 overflow-x-hidden p-2 border-collapse ${heads[key]==="_id"?"min-w-[30%]":"min-w-[100px]"} text-left border-[0.5px] border-pri-light`}>{heads[key]==="action"?<button className='bg-none border-none'><MdEdit/></button>:heads[key]==="departments"?e[heads[key]]?.length:heads[key]==="branch"?e[heads[key]]?.name:heads[key]==="phone"?e['contact']?.phone:e[heads[key]]}</td>)
                        }
                    </tr>):
                    [1,2,3,4,5,6,7]?.map((e,i)=><tr key={i} className={`bg-white flex w-full items-center`}>
                        {
                            Object.keys(heads).map((key,val)=><td key={key} className={`flex-1 overflow-x-hidden p-2 border-collapse ${heads[key]==="_id"?"min-w-[30%]":"min-w-[100px]"} text-left border-[0.5px] border-pri-light`}><span className='w-full h-6 block bg-lightGray animate-pulse rounded-sm'></span></td>)
                        }
                    </tr>)
                }
            </tbody>
        </table>
    </div>
  )
}

export default CustomTable