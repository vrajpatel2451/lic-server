import React, { useEffect } from 'react'
import { Column } from '@ant-design/plots';

const ClientChart = ({data=[]}) => {
//     const [data, setData] = useState([]);

//   useEffect(() => {
//     asyncFetch();
//   }, []);

//   const asyncFetch = () => {
    
//   };
  const config = {
    data,
    xField: 'week',
    yField: 'value',
    seriesField: 'type',
    isGroup: true,
    columnStyle: {
      radius: [20, 20, 0, 0],
    },
  };
  return (
    <div className='flex-1 min-w-full bg-white rounded-md p-4'>
        <h4>Clients (Month wise)</h4>
        <Column {...config}/>
    </div>
  )
}

export default ClientChart