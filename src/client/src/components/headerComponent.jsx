import React,{useEffect,useState} from 'react';
import Searchbar from './searchbar';
import '../styles/style.css';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';



const HeaderComponent = () => {
 
  const data = useSelector(state => state.auth);
  console.log("data====>",data)

  const [userData ,setUserData] = useState(data)

  useEffect(()=>{
        setUserData(data)
  },[data])


 
  const link = useLocation();

  if (link.pathname !== '/login') {
    return (
      <header className="w-full px-8 py-6 bg-white">
        <div className="flex justify-between items-center w-full">
          
          <Searchbar />
          <div className="flex justify-center items-center gap-4">
            <div className="h-12 w-12 rounded-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                alt=""
                className="h-full w-full"
              />
            </div>
            <div>
              <h6 className="font-semibold">Profile</h6>
              <p>Super&nbsp;Admin</p>
            </div>
          </div>
        </div>
      </header>
    );
  }
};

export default HeaderComponent;
