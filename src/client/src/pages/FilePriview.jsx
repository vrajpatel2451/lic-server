import React from 'react';
import FilePreviewer from 'react-file-previewer';
import { useSelector } from 'react-redux';

const FilePriviewPage = () => {
    const state = useSelector(state=>state.client);
    console.log(state.docUrl);
  return (
    <div className="flex w-full py-10 items-start h-full">
      <div className="w-[20%] h-full"></div>
      <div className='flex-1 p-10'>
      <FilePreviewer file={
        {
            url: `http://localhost:3000/static/${state.doc?.image}`,
            name:state.doc.name,
        }
        }
        />
      </div>
    </div>
  );
};

export default FilePriviewPage;
