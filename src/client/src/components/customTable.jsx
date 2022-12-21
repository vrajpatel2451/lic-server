import React from 'react';
import { MdEdit } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';

const CustomTable = ({
  heads = {},
  data = [],
  title = '',
  loading = true,
  select1 = {},
  select2 = {},
  inputClass = {},
}) => {

    const location = useLocation();
//   console.log(inputClass);
  return (
    <div className="w-full h-full flex flex-col gap-4">
      {/* <div className="w-full flex items-center justify-between">
        <h4 className="mb-4 text-2xl font-light">{title}</h4>
        <button className="w-20 h-10 bg-pri border-none flex items-center justify-center rounded-md">
          <p className="font-bold text-lg text-white">+</p>
        </button>
      </div> */}
      {/* <div className="w-full flex items-center gap-4">
        <input
          type="text"
          onChange={inputClass?.onChange}
          placeholder={inputClass?.placeHolder}
          className="border-none outline-none px-4 py-2 rounded-md"
        />
        <div className="">
          <select
            name={select1.label}
            id={select1.id}
            onChange={select2?.changeValue}
            className="border-none outline-none px-4 py-2 rounded-md"
          >
            <option selected value={select1.defaultValue}>
              {select1.defaultValue}
            </option>
            {select1.values?.map((e, i) => (
              <option value={e.id} key={i}>
                {e.label}
              </option>
            ))}
          </select>
        </div>
        <div className="">
          <select
            name={select2?.label}
            id={select2?.id}
            onChange={select2?.changeValue}
            className="border-none outline-none px-4 py-2 rounded-md"
          >
            <option selected value={select2?.defaultValue}>
              {select2?.defaultValue}
            </option>
            {select2?.values?.map((e, i) => (
              <option value={e.id} key={i}>
                {e.label}
              </option>
            ))}
          </select>
        </div>
      </div> */}
      <table className="w-full h-full flex flex-col">
        <thead className="w-full flex items-center bg-pri-light">
          {
            Object.keys(heads).map((key, val) => (
              <th
                className={`flex-1 p-2 rounded-sm text-left border-[0.5px] border-white border-collapse ${
                  heads[key] === '_id' ? 'min-w-[30%]' : 'min-w-[100px]'
                }`}
                key={key}
              >
                {key}
              </th>
            ))
            // heads?.map((key,val)=><p>{key}</p>)
          }
          {/* {
           title == 'Clients'? 
            <th
            className={`flex-1 p-2 rounded-sm text-left border-[0.5px] border-white border-collapse 
            `
          }
          // key={key}
          >
                action
              </th>:''
            } */}
        </thead>
        <tbody className="flex-1 overflow-y-scroll">
          {!loading
            ? data?.map((e, i) => (
                <tr key={i} className={`bg-white flex w-full items-center`}>
                  {Object.keys(heads).map((key, val) => (
                    <td
                      key={key}
                      className={`flex-1 overflow-x-hidden p-2 border-collapse ${
                        heads[key] === '_id' ? 'min-w-[30%]' : 'min-w-[100px]'
                      } text-left border-[0.5px] border-pri-light`}
                    >
                      {heads[key] === 'action' ? (
                        location.pathname !== '/client'?
                        <Link to={`/staff/${e._id}/changePassword`}>
                        <button className="bg-none border-none">
                          <MdEdit />
                        </button>
                        </Link>
                        :
                        <Link to={`${location.pathname}/${e._id}`}>
                        <button className="bg-none border-none">
                          <MdEdit />
                        </button>
                        </Link>
                      ) : heads[key] === 'departments' ? (
                        e[heads[key]]?.length
                      ) : heads[key] === 'branch' ? (
                        e[heads[key]]?.name
                      ) : heads[key] === 'phone' ? (
                        e['contact']?.phone
                      ) :heads[key] === '_id' ? (
                        location.pathname==='/staff'?
                        <Link to={`${location.pathname}/${e._id}/logs`}>{e[heads[key]]}</Link> 
                        :
                        location.pathname==='/client'?
                        <Link to={`${location.pathname}/${e._id}`}>
                          {e[heads[key]]}
                          </Link> : e[heads[key]]
                      ): (
                        e[heads[key]]
                      )}
                    </td>
                  ))}
                </tr>
              ))
            : [1, 2, 3, 4, 5, 6, 7]?.map((e, i) => (
                <tr key={i} className={`bg-white flex w-full items-center`}>
                  {Object.keys(heads).map((key, val) => (
                    <td
                      key={key}
                      className={`flex-1 overflow-x-hidden p-2 border-collapse ${
                        heads[key] === '_id' ? 'min-w-[30%]' : 'min-w-[100px]'
                      } text-left border-[0.5px] border-pri-light`}
                    >
                      <span className="w-full h-6 block bg-lightGray animate-pulse rounded-sm"></span>
                    </td>
                  ))}
                    <td
                      // key={key}
                      className={`flex-1 overflow-x-hidden p-2 border-collapse text-left border-[0.5px] border-pri-light`}
                    >
                      <span className="w-full h-6 block bg-lightGray animate-pulse rounded-sm"></span>
                    </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
