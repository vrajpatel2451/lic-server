import moment from 'moment'
import React from 'react'
import { MdLocationPin } from 'react-icons/md'

const LogsComponent = ({user,lat,long,place,time,index}) => {
  return (
    <div className='flex-1 min-w-[40%] rounded-md bg-pri-light gap-4 flex flex-col items-start p-10'>
        <h4>{index} - {user?.firstName} {user?.lastName} (#{user?._id})</h4>
        <div className='flex gap-4 items-start'>
        <p className='flex-1'>{place}</p>
        <a href={`https://www.google.com/maps/search/?api=1&query=${lat},${long}`} target={'_blank'}>
        <MdLocationPin/>
        </a>
        </div>
        <p>{moment(time).format('DD-MM-YYYY HH:MMa')}</p>
    </div>
  )
}

export default LogsComponent