import { Navigate } from "react-router-dom";
import { checkWidgetAuthorization } from "./utils/checkAuthorization";
import React from 'react'

const PrivateRoute = ({Component,store}) => {
    console.log(checkWidgetAuthorization(store));
    return (
          checkWidgetAuthorization(store)
            ? 
            <Component/> 
            : 
            <Navigate to='/login'/>
        
    )
}

export default PrivateRoute;