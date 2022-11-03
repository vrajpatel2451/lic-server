import { Navigate } from "react-router-dom";
import { checkWidgetAuthorization } from "./utils/checkAuthorization";
import React from 'react'

const PublicRoute = ({Component,store}) => {
    console.log('hehehe',checkWidgetAuthorization(store));
    return (
          checkWidgetAuthorization(store)
            ? <Navigate to='/'/>
            : 
            <Component/> 
        
    )
}

export default PublicRoute;