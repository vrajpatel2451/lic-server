import React from 'react';
import FilePreviewer from 'react-file-previewer';
import { useSelector } from 'react-redux';

const FilePriviewPage = () => {
    const state = useSelector(state=>state.client);
    console.log(state.pdf);
  return (
    <div className="flex w-full py-10 items-start h-full">
      <div className="w-[20%] h-full"></div>
      <div className='flex-1 p-10'>
      <FilePreviewer file={
        {
            url: "https://cors-anywhere.herokuapp.com/http://africau.edu/images/default/sample.pdf",
        }
        }
        />
      </div>
    </div>
  );
};

export default FilePriviewPage;
