import React from 'react'
import { Navigate, Route } from 'react-router-dom'
import { checkWidgetAuthorization } from './utils/checkAuthorization'

// const PublicRoute = ({Component,store,...rest}) => {
//   console.log(checkWidgetAuthorization(store));
//   return (
//     <Route {...rest} element={
//         checkWidgetAuthorization(store)
//           ? <Navigate to='/'/>
//           : <Component/> 
//       }/>
//   )
// }
const PublicRoute = ({Component,store}) => {
  console.log('hehehe',checkWidgetAuthorization(store));
  return (
        checkWidgetAuthorization(store)
          ? <Navigate to='/'/>
          : 
          <Component/> 
      
  )
}
const PrivateRoute = ({Component,store}) => {
  console.log(checkWidgetAuthorization(store));
  return (
        checkWidgetAuthorization(store)
          ? 
          <Component/> 
          : 
          <Navigate to='/'/>
      
  )
}
// const PrivateRoute = ({component:Component,store,...rest}) => {
//   return (
//     <Route {...rest} element={props => (
//         checkWidgetAuthorization(store)
//         ? <Component {...props} />
//           : <Navigate to={{ pathname: "/login", state: { from: props.location } }}/>
//       )}/>
//   )
// }

export {PublicRoute,PrivateRoute};