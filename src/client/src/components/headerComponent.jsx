import React,{useEffect,useState} from 'react';
import Searchbar from './searchbar';
import '../styles/style.css';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdSearch } from 'react-icons/md';
import { useMemo } from 'react';



const HeaderComponent = () => {
 
  const data = useSelector(state => state.auth);
  console.log("data====>",data)

  const [userData ,setUserData] = useState(data)

  useEffect(()=>{
        setUserData(data)
  },[data])


 
  const link = useLocation();

  // const path = useMemo(()=>,[])
  // console.log('rebuilder');

  if (link.pathname !== '/login') {
    return (
      <header className="fixed w-full flex items-stretch top-0 left-0 z-10">
        <div className='w-[20%]'></div>
        <div className='flex-1 flex items-center justify-between py-4 px-10 bg-white shadow'>
            <p>Madhav Insurence</p>
            <div className='flex items-center border-gray border-[0.5px] p-2 rounded-md gap-2'>
                <MdSearch color='rgb(161,161,161)'/>
                <input type="text" className='border-none bg-none outline-none font-light' placeholder='search' />
            </div>
        </div>
      </header>
    );
  }
};

export default HeaderComponent;
