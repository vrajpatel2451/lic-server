import React from 'react'
import {Pie} from '@ant-design/plots'
import ClientChart from './clientChart';
import { useSelector } from 'react-redux';


const TaskChart = () => {


    const state = useSelector(state=>state.dashboard);

    const data = [
        {
          type: 'Pending',
          value: state.taskPie?.pending,
        },
        {
          type: 'In Progress',
          value: state.taskPie?.inprogress,
        },
        {
          type: 'In Verify',
          value: state.taskPie?.verify,
        },
        {
          type: 'Completed',
          value: state.taskPie?.completed,
        },
      ];
    const dataClients = [
        {
          type: 'On Boarded',
          value: state.clientPie?.inFollowup,
        },
        {
          type: 'On Followup',
          value: state.clientPie?.onboarded,
        },
      ];
      const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        label: {
          type: 'inner',
          offset: '-50%',
          content: '{value}',
          style: {
            textAlign: 'center',
            fontSize: 14,
          },
        },
        interactions: [
          {
            type: 'element-selected',
          },
          {
            type: 'element-active',
          },
        ],
        statistic: {
          title: false,
          content: {
            style: {
              whiteSpace: 'pre-wrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
            content: 'Tasks',
          },
        },
      };
      const configClient = {
        appendPadding: 10,
        data:dataClients,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        label: {
          type: 'inner',
          content: '{name}\n{value} / {percentage}',
        },
        interactions: [
          {
            type: 'pie-legend-active',
          },
          {
            type: 'element-active',
          },
        ],
      };

      const dataClient = [
        { "week": "Week1", "type": "OnBoarded", "value": 14500 },
        { "week": "Week1", "type": "OnFolloeup", "value": 8500 },
        { "week": "Week2", "type": "OnBoarded", "value": 10000 },
        { "week": "Week2", "type": "OnFolloeup", "value": 7000 },
        { "week": "Week3", "type": "OnBoarded", "value": 9000 },
        { "week": "Week3", "type": "OnFolloeup", "value": 8500 },
        { "week": "Week4", "type": "OnBoarded", "value": 11000 },
        { "week": "Week4", "type": "OnFolloeup", "value": 6000 },
        { "week": "Week5", "type": "OnBoarded", "value": 16000 },
        { "week": "Week5", "type": "OnFolloeup", "value": 5000 },
        ];

  return (
    <div className='flex w-full gap-2 items-stretch flex-wrap py-10 pb-20'>
    <div className='flex-1 bg-white rounded-md'>
        <Pie {...config}/>
    </div>
    <div className='flex-1 bg-white rounded-md'>
        <h4 className='w-full text-center'>Clients</h4>
        <Pie {...configClient}/>
    </div>
    <ClientChart data={state?.clientGraph} />
    </div>
  )
}

export default TaskChart